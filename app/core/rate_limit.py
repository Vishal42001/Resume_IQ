# app/core/rate_limit.py
import time
from fastapi import Depends, HTTPException, status
from redis.asyncio import Redis
from app.core.redis_client import get_redis
# Replace this with your actual auth dependency
# It should return a user object or something with an `id` attribute.
# For now I'll show a dummy one.

class DummyUser:
    def __init__(self, id: str):
        self.id = id

async def get_current_user() -> DummyUser:
    # In real life: decode JWT / session etc.
    return DummyUser(id="test-user")

USER_RPM_LIMIT = 10      # requests per user per minute
GLOBAL_RPM_LIMIT = 100   # requests globally per minute
SAFETY_MARGIN = 5

async def _increment_with_expiry(redis: Redis, key: str, window_ttl: int) -> int:
    count = await redis.incr(key)
    if count == 1:
        await redis.expire(key, window_ttl)
    return count

async def check_rate_limits(user_id: str, redis: Redis) -> None:
    now = int(time.time())
    window = now // 60
    ttl = 60 - (now % 60)

    # Per-user
    user_key = f"rl:user:{user_id}:{window}"
    user_count = await _increment_with_expiry(redis, user_key, ttl)
    if user_count > USER_RPM_LIMIT:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many requests. Please wait and try again.",
        )

    # Global
    global_key = f"rl:global:{window}"
    global_count = await _increment_with_expiry(redis, global_key, ttl)
    if global_count > (GLOBAL_RPM_LIMIT - SAFETY_MARGIN):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Service busy. Please try again shortly.",
        )

async def rate_limiter(
    redis: Redis = Depends(get_redis),
    user: DummyUser = Depends(get_current_user),
):
    user_id = getattr(user, "id", None) or "anonymous"
    await check_rate_limits(user_id=user_id, redis=redis)
