import React from 'react';
import SimilarityChart from './SimilarityChart';

const PredictorView = ({ data }) => {
    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center glass rounded-2xl border-2 border-dashed border-border/50">
                <div className="w-16 h-16 mb-4 rounded-full bg-gradient flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <h4 className="text-lg font-bold text-text-main mb-2">No Prediction Data</h4>
                <p className="text-text-muted text-sm max-w-md">
                    Upload a candidate resume, add top performer profiles, and run the success prediction analysis
                </p>
            </div>
        );
    }

    // Parse the data if it's a string
    let predictionData;
    try {
        predictionData = typeof data === 'string' ? JSON.parse(data) : data;
    } catch (error) {
        return (
            <div className="p-4 border border-danger/30 bg-danger/10 text-danger text-sm rounded-xl">
                <p className="font-semibold mb-1">Error parsing prediction data</p>
                <p className="text-xs">{error.message}</p>
            </div>
        );
    }

    const {
        candidate_name,
        jd_fit,
        cultural_fit,
        final_prediction,
        insights
    } = predictionData;

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-success';
        if (score >= 65) return 'text-accent';
        if (score >= 50) return 'text-warning';
        return 'text-danger';
    };

    const getRecommendationBadge = (recommendation) => {
        const badges = {
            strong_hire: { class: 'badge-success', icon: '🎯', label: 'Strong Hire' },
            hire: { class: 'badge-info', icon: '✓', label: 'Hire' },
            maybe: { class: 'badge-warning', icon: '⚠️', label: 'Maybe' },
            pass: { class: 'badge-danger', icon: '✗', label: 'Pass' }
        };
        return badges[recommendation] || badges.maybe;
    };

    const recommendationBadge = getRecommendationBadge(final_prediction?.recommendation);

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header with Success Score */}
            <div className="card">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-text-main mb-2">
                            🔮 Success Prediction
                        </h3>
                        <p className="text-text-muted text-sm">
                            Candidate: <span className="font-semibold text-text-main">{candidate_name}</span>
                        </p>
                    </div>
                    <span className={`badge ${recommendationBadge.class} text-sm py-2 px-4`}>
                        {recommendationBadge.icon} {recommendationBadge.label}
                    </span>
                </div>

                {/* Success Score Gauge */}
                <div className="text-center mb-6">
                    <div className={`text-7xl font-black mb-2 ${getScoreColor(final_prediction?.success_score)}`}>
                        {final_prediction?.success_score}%
                    </div>
                    <div className="text-sm text-text-muted mb-1">Success Probability</div>
                    <div className="flex items-center justify-center gap-2 text-xs text-text-dim">
                        <span>Confidence: {final_prediction?.confidence}</span>
                    </div>
                </div>

                {/* Reasoning */}
                {final_prediction?.reasoning && (
                    <div className="glass border border-border rounded-xl p-4">
                        <p className="text-sm text-text-main leading-relaxed">
                            {final_prediction.reasoning}
                        </p>
                    </div>
                )}
            </div>

            {/* Dual Score Breakdown */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* JD Fit */}
                <div className="card">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-text-main">JD Fit</h4>
                            <p className="text-xs text-text-muted">Technical Requirements</p>
                        </div>
                    </div>

                    <div className={`text-5xl font-black mb-4 ${getScoreColor(jd_fit?.score)}`}>
                        {jd_fit?.score}%
                    </div>

                    <div className="space-y-3">
                        <div>
                            <div className="text-xs font-semibold text-text-main mb-2">Matched Skills</div>
                            <div className="flex flex-wrap gap-2">
                                {jd_fit?.matched_skills?.slice(0, 5).map((skill, idx) => (
                                    <span key={idx} className="badge badge-success text-xs">
                                        ✓ {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {jd_fit?.missing_skills && jd_fit.missing_skills.length > 0 && (
                            <div>
                                <div className="text-xs font-semibold text-text-main mb-2">Missing Skills</div>
                                <div className="flex flex-wrap gap-2">
                                    {jd_fit.missing_skills.slice(0, 3).map((skill, idx) => (
                                        <span key={idx} className="badge badge-danger text-xs">
                                            ✗ {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {jd_fit?.summary && (
                            <div className="glass border border-border rounded-lg p-3">
                                <p className="text-xs text-text-muted">{jd_fit.summary}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Cultural Fit */}
                <div className="card">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                            <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-text-main">Cultural Fit</h4>
                            <p className="text-xs text-text-muted">Top Performer Similarity</p>
                        </div>
                    </div>

                    <div className={`text-5xl font-black mb-4 ${getScoreColor(cultural_fit?.score)}`}>
                        {cultural_fit?.score}%
                    </div>

                    {cultural_fit?.summary && (
                        <div className="glass border border-border rounded-lg p-3 mb-4">
                            <p className="text-xs text-text-muted">{cultural_fit.summary}</p>
                        </div>
                    )}

                    {/* Most Similar Performers */}
                    {cultural_fit?.most_similar_performers && cultural_fit.most_similar_performers.length > 0 && (
                        <div>
                            <div className="text-xs font-semibold text-text-main mb-2">Most Similar To:</div>
                            <div className="space-y-2">
                                {cultural_fit.most_similar_performers.slice(0, 3).map((performer, idx) => (
                                    <div key={idx} className="glass border border-border rounded-lg p-2">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-semibold text-text-main">{performer.name}</span>
                                            <span className="text-xs font-bold text-accent">{performer.similarity_score}%</span>
                                        </div>
                                        {performer.role && (
                                            <div className="text-xs text-text-muted">{performer.role}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Trait Alignment Chart */}
            {cultural_fit?.candidate_traits && cultural_fit?.ideal_profile && (
                <div className="card">
                    <h4 className="text-lg font-bold text-text-main mb-4">Trait Alignment Analysis</h4>
                    <SimilarityChart
                        candidateTraits={cultural_fit.candidate_traits}
                        idealProfile={cultural_fit.ideal_profile}
                    />

                    {/* Trait Alignment Details */}
                    {cultural_fit?.trait_alignment && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
                            {Object.entries(cultural_fit.trait_alignment).map(([trait, value]) => {
                                const isPositive = value >= 0;
                                const displayTrait = trait.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                                return (
                                    <div key={trait} className="glass border border-border rounded-lg p-3">
                                        <div className="text-xs text-text-muted mb-1">{displayTrait}</div>
                                        <div className={`text-lg font-bold ${isPositive ? 'text-success' : 'text-warning'}`}>
                                            {isPositive ? '+' : ''}{value}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* Key Strengths & Concerns */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Strengths */}
                {final_prediction?.key_strengths && final_prediction.key_strengths.length > 0 && (
                    <div className="card">
                        <h4 className="text-lg font-bold text-text-main mb-4 flex items-center gap-2">
                            <span className="text-success">💪</span>
                            Key Strengths
                        </h4>
                        <ul className="space-y-2">
                            {final_prediction.key_strengths.map((strength, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-text-main">
                                    <span className="text-success flex-shrink-0">✓</span>
                                    <span>{strength}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Concerns */}
                {final_prediction?.potential_concerns && final_prediction.potential_concerns.length > 0 && (
                    <div className="card">
                        <h4 className="text-lg font-bold text-text-main mb-4 flex items-center gap-2">
                            <span className="text-warning">⚠️</span>
                            Potential Concerns
                        </h4>
                        <ul className="space-y-2">
                            {final_prediction.potential_concerns.map((concern, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-text-main">
                                    <span className="text-warning flex-shrink-0">!</span>
                                    <span>{concern}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Insights */}
            {insights && insights.length > 0 && (
                <div className="card">
                    <h4 className="text-lg font-bold text-text-main mb-4">💡 Insights</h4>
                    <div className="space-y-3">
                        {insights.map((insight, idx) => (
                            <div key={idx} className="glass border border-border rounded-lg p-3">
                                <p className="text-sm text-text-main">{insight}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PredictorView;
