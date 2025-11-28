import React from 'react';

const ATSScoreView = ({ data }) => {
    if (!data) {
        return (
            <div className="glass border-2 border-dashed border-border/50 rounded-2xl p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient flex items-center justify-center animate-float">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h4 className="text-xl font-bold text-text-main mb-2">ATS Score Analysis</h4>
                <p className="text-text-muted max-w-md mx-auto">
                    Click "Run Analysis" to check how well your resume is optimized for Applicant Tracking Systems
                </p>
            </div>
        );
    }

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-success';
        if (score >= 60) return 'text-warning';
        if (score >= 40) return 'text-secondary';
        return 'text-danger';
    };

    const getScoreBgColor = (score) => {
        if (score >= 80) return 'bg-success';
        if (score >= 60) return 'bg-warning';
        if (score >= 40) return 'bg-secondary';
        return 'bg-danger';
    };

    const getScoreGradient = (score) => {
        if (score >= 80) return 'from-success/20 to-success/5';
        if (score >= 60) return 'from-warning/20 to-warning/5';
        if (score >= 40) return 'from-secondary/20 to-secondary/5';
        return 'from-danger/20 to-danger/5';
    };

    const getLevelIcon = (level) => {
        switch (level) {
            case 'excellent':
                return '🌟';
            case 'good':
                return '✅';
            case 'fair':
                return '⚠️';
            case 'poor':
                return '❌';
            default:
                return '📊';
        }
    };

    const getSeverityBadge = (severity) => {
        switch (severity) {
            case 'high':
                return 'badge-danger';
            case 'medium':
                return 'badge-warning';
            case 'low':
                return 'badge-info';
            default:
                return 'badge-info';
        }
    };

    const getPriorityBadge = (priority) => {
        switch (priority) {
            case 'high':
                return 'badge-danger';
            case 'medium':
                return 'badge-warning';
            case 'low':
                return 'badge-info';
            default:
                return 'badge-info';
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Overall Score Card */}
            <div className={`glass border border-border rounded-2xl p-8 bg-gradient-to-br ${getScoreGradient(data.overall_score)}`}>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-bold text-text-main mb-2">ATS Compatibility Score</h3>
                        <p className="text-text-muted mb-4">{data.summary}</p>
                        <div className="flex items-center gap-2 justify-center md:justify-start">
                            <span className={`badge ${data.score_level === 'excellent' ? 'badge-success' : data.score_level === 'good' ? 'badge-info' : data.score_level === 'fair' ? 'badge-warning' : 'badge-danger'}`}>
                                {getLevelIcon(data.score_level)} {data.score_level.toUpperCase()}
                            </span>
                        </div>
                    </div>
                    <div className="flex-shrink-0">
                        <div className="relative w-40 h-40">
                            <svg className="transform -rotate-90 w-40 h-40">
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="70"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="transparent"
                                    className="text-border"
                                />
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="70"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="transparent"
                                    strokeDasharray={`${2 * Math.PI * 70}`}
                                    strokeDashoffset={`${2 * Math.PI * 70 * (1 - data.overall_score / 100)}`}
                                    className={getScoreColor(data.overall_score)}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className={`text-4xl font-black ${getScoreColor(data.overall_score)}`}>
                                        {Math.round(data.overall_score)}
                                    </div>
                                    <div className="text-xs text-text-muted font-semibold">/ 100</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Score Breakdown */}
            <div className="card">
                <h4 className="text-xl font-bold text-text-main mb-6 flex items-center gap-2">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Score Breakdown
                </h4>

                <div className="space-y-6">
                    {/* Formatting */}
                    <div className="glass border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{getLevelIcon(data.score_breakdown.formatting.level)}</span>
                                <div>
                                    <h5 className="font-semibold text-text-main">Formatting & Structure</h5>
                                    <p className="text-xs text-text-muted">ATS parsing compatibility</p>
                                </div>
                            </div>
                            <div className={`text-2xl font-bold ${getScoreColor(data.score_breakdown.formatting.score)}`}>
                                {Math.round(data.score_breakdown.formatting.score)}
                            </div>
                        </div>
                        <div className="w-full bg-border rounded-full h-3 mb-4">
                            <div
                                className={`h-3 rounded-full ${getScoreBgColor(data.score_breakdown.formatting.score)} transition-all duration-500`}
                                style={{ width: `${data.score_breakdown.formatting.score}%` }}
                            />
                        </div>
                        {data.score_breakdown.formatting.strengths?.length > 0 && (
                            <div className="mb-3">
                                <p className="text-xs font-semibold text-success mb-2">✓ Strengths:</p>
                                <ul className="text-sm text-text-muted space-y-1">
                                    {data.score_breakdown.formatting.strengths.map((strength, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <span className="text-success mt-0.5">•</span>
                                            <span>{strength}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {data.score_breakdown.formatting.issues?.length > 0 && (
                            <div>
                                <p className="text-xs font-semibold text-danger mb-2">⚠ Issues:</p>
                                <ul className="text-sm text-text-muted space-y-1">
                                    {data.score_breakdown.formatting.issues.map((issue, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <span className="text-danger mt-0.5">•</span>
                                            <span>{issue}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Keywords */}
                    <div className="glass border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{getLevelIcon(data.score_breakdown.keywords.level)}</span>
                                <div>
                                    <h5 className="font-semibold text-text-main">Keyword Optimization</h5>
                                    <p className="text-xs text-text-muted">Job description alignment</p>
                                </div>
                            </div>
                            <div className={`text-2xl font-bold ${getScoreColor(data.score_breakdown.keywords.score)}`}>
                                {Math.round(data.score_breakdown.keywords.score)}
                            </div>
                        </div>
                        <div className="w-full bg-border rounded-full h-3 mb-4">
                            <div
                                className={`h-3 rounded-full ${getScoreBgColor(data.score_breakdown.keywords.score)} transition-all duration-500`}
                                style={{ width: `${data.score_breakdown.keywords.score}%` }}
                            />
                        </div>
                        {data.score_breakdown.keywords.matched_keywords?.length > 0 && (
                            <div className="mb-3">
                                <p className="text-xs font-semibold text-success mb-2">✓ Matched Keywords ({data.score_breakdown.keywords.matched_keywords.length}):</p>
                                <div className="flex flex-wrap gap-2">
                                    {data.score_breakdown.keywords.matched_keywords.slice(0, 10).map((keyword, idx) => (
                                        <span key={idx} className="badge badge-success text-xs">{keyword}</span>
                                    ))}
                                    {data.score_breakdown.keywords.matched_keywords.length > 10 && (
                                        <span className="badge badge-info text-xs">+{data.score_breakdown.keywords.matched_keywords.length - 10} more</span>
                                    )}
                                </div>
                            </div>
                        )}
                        {data.score_breakdown.keywords.missing_keywords?.length > 0 && (
                            <div>
                                <p className="text-xs font-semibold text-danger mb-2">⚠ Missing Keywords ({data.score_breakdown.keywords.missing_keywords.length}):</p>
                                <div className="flex flex-wrap gap-2">
                                    {data.score_breakdown.keywords.missing_keywords.slice(0, 10).map((keyword, idx) => (
                                        <span key={idx} className="badge badge-danger text-xs">{keyword}</span>
                                    ))}
                                    {data.score_breakdown.keywords.missing_keywords.length > 10 && (
                                        <span className="badge badge-warning text-xs">+{data.score_breakdown.keywords.missing_keywords.length - 10} more</span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Content Quality */}
                    <div className="glass border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{getLevelIcon(data.score_breakdown.content.level)}</span>
                                <div>
                                    <h5 className="font-semibold text-text-main">Content Quality</h5>
                                    <p className="text-xs text-text-muted">Impact and professionalism</p>
                                </div>
                            </div>
                            <div className={`text-2xl font-bold ${getScoreColor(data.score_breakdown.content.score)}`}>
                                {Math.round(data.score_breakdown.content.score)}
                            </div>
                        </div>
                        <div className="w-full bg-border rounded-full h-3 mb-4">
                            <div
                                className={`h-3 rounded-full ${getScoreBgColor(data.score_breakdown.content.score)} transition-all duration-500`}
                                style={{ width: `${data.score_breakdown.content.score}%` }}
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-3">
                            <div className={`glass border rounded-lg p-3 text-center ${data.score_breakdown.content.has_metrics ? 'border-success' : 'border-danger'}`}>
                                <div className="text-2xl mb-1">{data.score_breakdown.content.has_metrics ? '✓' : '✗'}</div>
                                <div className="text-xs text-text-muted">Metrics</div>
                            </div>
                            <div className={`glass border rounded-lg p-3 text-center ${data.score_breakdown.content.has_action_verbs ? 'border-success' : 'border-danger'}`}>
                                <div className="text-2xl mb-1">{data.score_breakdown.content.has_action_verbs ? '✓' : '✗'}</div>
                                <div className="text-xs text-text-muted">Action Verbs</div>
                            </div>
                            <div className={`glass border rounded-lg p-3 text-center ${data.score_breakdown.content.appropriate_length ? 'border-success' : 'border-danger'}`}>
                                <div className="text-2xl mb-1">{data.score_breakdown.content.appropriate_length ? '✓' : '✗'}</div>
                                <div className="text-xs text-text-muted">Length</div>
                            </div>
                        </div>
                    </div>

                    {/* Organization */}
                    <div className="glass border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{getLevelIcon(data.score_breakdown.organization.level)}</span>
                                <div>
                                    <h5 className="font-semibold text-text-main">Section Organization</h5>
                                    <p className="text-xs text-text-muted">Structure and flow</p>
                                </div>
                            </div>
                            <div className={`text-2xl font-bold ${getScoreColor(data.score_breakdown.organization.score)}`}>
                                {Math.round(data.score_breakdown.organization.score)}
                            </div>
                        </div>
                        <div className="w-full bg-border rounded-full h-3 mb-4">
                            <div
                                className={`h-3 rounded-full ${getScoreBgColor(data.score_breakdown.organization.score)} transition-all duration-500`}
                                style={{ width: `${data.score_breakdown.organization.score}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Wins */}
            {data.quick_wins && data.quick_wins.length > 0 && (
                <div className="card bg-gradient-to-br from-success/10 to-success/5 border-success/30">
                    <h4 className="text-xl font-bold text-text-main mb-4 flex items-center gap-2">
                        <span className="text-2xl">⚡</span>
                        Quick Wins
                    </h4>
                    <p className="text-sm text-text-muted mb-4">Easy improvements that will boost your ATS score immediately:</p>
                    <div className="space-y-3">
                        {data.quick_wins.map((win, idx) => (
                            <div key={idx} className="flex items-start gap-3 glass border border-success/20 rounded-lg p-4">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-success text-white flex items-center justify-center text-xs font-bold">
                                    {idx + 1}
                                </div>
                                <p className="text-sm text-text-main flex-1">{win}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Critical Issues */}
            {data.critical_issues && data.critical_issues.length > 0 && (
                <div className="card">
                    <h4 className="text-xl font-bold text-text-main mb-4 flex items-center gap-2">
                        <svg className="w-6 h-6 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Critical Issues
                    </h4>
                    <div className="space-y-4">
                        {data.critical_issues.map((issue, idx) => (
                            <div key={idx} className="glass border border-border rounded-xl p-5">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-start gap-3 flex-1">
                                        <span className={`badge ${getSeverityBadge(issue.severity)} text-xs`}>
                                            {issue.severity.toUpperCase()}
                                        </span>
                                        <div className="flex-1">
                                            <h5 className="font-semibold text-text-main mb-1">{issue.issue}</h5>
                                            <p className="text-sm text-text-muted mb-2">
                                                <span className="font-medium">Impact:</span> {issue.impact}
                                            </p>
                                            <div className="bg-success/10 border border-success/30 rounded-lg p-3">
                                                <p className="text-xs font-semibold text-success mb-1">💡 How to fix:</p>
                                                <p className="text-sm text-text-main">{issue.fix}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Recommendations */}
            {data.recommendations && data.recommendations.length > 0 && (
                <div className="card">
                    <h4 className="text-xl font-bold text-text-main mb-4 flex items-center gap-2">
                        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Detailed Recommendations
                    </h4>
                    <div className="space-y-4">
                        {data.recommendations.map((rec, idx) => (
                            <div key={idx} className="glass border border-border rounded-xl p-5">
                                <div className="flex items-start gap-3 mb-3">
                                    <span className={`badge ${getPriorityBadge(rec.priority)} text-xs flex-shrink-0`}>
                                        {rec.priority.toUpperCase()}
                                    </span>
                                    <div className="flex-1">
                                        <h5 className="font-semibold text-text-main mb-2">{rec.title}</h5>
                                        <p className="text-sm text-text-muted mb-3">{rec.description}</p>
                                        {rec.example && (
                                            <div className="glass border border-accent/30 rounded-lg p-3 bg-accent/5">
                                                <p className="text-xs font-semibold text-accent mb-1">📝 Example:</p>
                                                <p className="text-sm text-text-main font-mono">{rec.example}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ATSScoreView;
