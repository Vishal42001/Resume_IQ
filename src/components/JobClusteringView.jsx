import React from 'react';

const JobClusteringView = ({ data }) => {
    if (!data) return null;

    const { clusters, fit_analysis, recommended_focus, next_steps } = data;

    return (
        <div className="animate-fade-in space-y-6">
            {/* Clusters */}
            {clusters && clusters.length > 0 && (
                <div className="card">
                    <h3 className="text-lg font-semibold text-text-main mb-4">📊 Identified Job Clusters</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {clusters.map((cluster, idx) => (
                            <div key={idx} className="p-4 bg-bg-card rounded-md border border-border">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-text-main">{cluster.name}</h4>
                                    <span className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-full">
                                        {cluster.job_count} jobs
                                    </span>
                                </div>
                                <p className="text-sm text-text-muted mb-3">{cluster.description}</p>

                                {cluster.common_skills && cluster.common_skills.length > 0 && (
                                    <div className="mb-2">
                                        <p className="text-xs font-medium text-text-muted mb-1">Common Skills:</p>
                                        <div className="flex flex-wrap gap-1">
                                            {cluster.common_skills.map((skill, skillIdx) => (
                                                <span key={skillIdx} className="px-2 py-0.5 text-xs bg-bg-main rounded border border-border">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {cluster.sample_titles && cluster.sample_titles.length > 0 && (
                                    <div>
                                        <p className="text-xs font-medium text-text-muted mb-1">Sample Titles:</p>
                                        <p className="text-xs text-text-dim">{cluster.sample_titles.join(', ')}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Fit Analysis */}
            {fit_analysis && fit_analysis.length > 0 && (
                <div className="card">
                    <h3 className="text-lg font-semibold text-text-main mb-4">🎯 Fit Analysis per Cluster</h3>
                    <div className="space-y-3">
                        {fit_analysis.map((fit, idx) => (
                            <div key={idx} className={`p-4 rounded-md border ${fit.fit_level === 'high' ? 'border-success/30 bg-success/5' :
                                    fit.fit_level === 'medium' ? 'border-warning/30 bg-warning/5' :
                                        'border-danger/30 bg-danger/5'
                                }`}>
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-text-main">{fit.cluster_name}</h4>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold text-accent">{fit.match_score}%</span>
                                        <span className={`px-2 py-1 text-xs rounded-full ${fit.fit_level === 'high' ? 'bg-success/20 text-success' :
                                                fit.fit_level === 'medium' ? 'bg-warning/20 text-warning' :
                                                    'bg-danger/20 text-danger'
                                            }`}>
                                            {fit.fit_level}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-3 mt-3">
                                    {fit.strengths && fit.strengths.length > 0 && (
                                        <div>
                                            <p className="text-xs font-medium text-success mb-1">✓ Strengths:</p>
                                            <ul className="space-y-1">
                                                {fit.strengths.map((strength, sIdx) => (
                                                    <li key={sIdx} className="text-sm text-text-muted">• {strength}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {fit.gaps && fit.gaps.length > 0 && (
                                        <div>
                                            <p className="text-xs font-medium text-danger mb-1">✗ Gaps:</p>
                                            <ul className="space-y-1">
                                                {fit.gaps.map((gap, gIdx) => (
                                                    <li key={gIdx} className="text-sm text-text-muted">• {gap}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Recommended Focus */}
            {recommended_focus && recommended_focus.length > 0 && (
                <div className="card">
                    <h3 className="text-lg font-semibold text-text-main mb-4">🎯 Recommended Focus Areas</h3>
                    <div className="space-y-3">
                        {recommended_focus.map((focus, idx) => (
                            <div key={idx} className={`p-4 rounded-md border ${focus.priority === 'primary' ? 'border-accent/30 bg-accent/5' : 'border-border bg-bg-card'
                                }`}>
                                <div className="flex items-center gap-2 mb-2">
                                    {focus.priority === 'primary' && <span className="text-lg">⭐</span>}
                                    <h4 className="font-semibold text-text-main">{focus.direction}</h4>
                                    <span className="px-2 py-1 text-xs bg-bg-main rounded border border-border">
                                        {focus.priority}
                                    </span>
                                </div>
                                <p className="text-sm text-text-muted">{focus.rationale}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Next Steps */}
            {next_steps && next_steps.length > 0 && (
                <div className="card">
                    <h3 className="text-lg font-semibold text-text-main mb-4">🚀 Next Steps</h3>
                    <ul className="space-y-2">
                        {next_steps.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-3 p-3 bg-bg-card rounded-md border border-border">
                                <span className="text-accent font-bold">{idx + 1}.</span>
                                <span className="text-sm text-text-main">{step}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default JobClusteringView;
