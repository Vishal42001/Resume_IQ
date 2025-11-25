import React from 'react';

const ReviewerView = ({ data }) => {
    if (!data) return null;

    const { match_score, summary_feedback, missing_keywords, section_suggestions } = data;

    return (
        <div className="animate-fade-in space-y-6">
            <div className="flex items-center justify-between p-4 bg-bg-card border border-border rounded-lg">
                <div>
                    <h3 className="text-lg font-semibold text-text-main">Match Score</h3>
                    <p className="text-sm text-text-muted">Based on JD requirements</p>
                </div>
                <div className={`text-4xl font-bold ${match_score >= 80 ? 'text-success' : match_score >= 60 ? 'text-warning' : 'text-danger'}`}>
                    {match_score}%
                </div>
            </div>

            <div className="card">
                <h4 className="mb-2 text-sm font-medium text-text-muted uppercase tracking-wider">Summary Feedback</h4>
                <p className="text-text-main leading-relaxed">{summary_feedback}</p>
            </div>

            {/* Missing Keywords */}
            {data.missing_keywords && data.missing_keywords.length > 0 && (
                <div className="card">
                    <h3 className="text-lg font-semibold text-text-main mb-3">Missing Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                        {data.missing_keywords.map((kw, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1 bg-danger/10 text-danger text-sm rounded-full border border-danger/20"
                            >
                                {kw}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Suggestions */}
            {data.suggestions && data.suggestions.length > 0 && (
                <div className="card">
                    <h3 className="text-lg font-semibold text-text-main mb-4">💡 Improvement Suggestions</h3>
                    <div className="space-y-4">
                        {data.suggestions.map((suggestion, idx) => (
                            <div key={idx} className="border-l-4 border-accent pl-4 py-2">
                                <div className="flex items-start gap-2 mb-1">
                                    <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded font-medium">
                                        {suggestion.category}
                                    </span>
                                    <h4 className="font-semibold text-text-main">{suggestion.title}</h4>
                                </div>
                                <p className="text-sm text-text-muted mb-2">{suggestion.description}</p>
                                {suggestion.example && (
                                    <div className="bg-bg-card p-3 rounded-md border border-border mt-2">
                                        <p className="text-xs text-text-muted mb-1 font-medium">Example:</p>
                                        <p className="text-sm text-text-main italic">"{suggestion.example}"</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {section_suggestions && (
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-text-main">Suggestions</h4>

                    {section_suggestions.summary && (
                        <div className="card">
                            <h5 className="mb-2 font-medium text-accent">Rewritten Summary</h5>
                            <p className="italic text-text-dim text-sm pl-4 border-l-2 border-border">"{section_suggestions.summary}"</p>
                        </div>
                    )}

                    {section_suggestions.experience && section_suggestions.experience.map((exp, i) => (
                        <div key={i} className="card">
                            <h5 className="mb-3 font-medium text-text-main border-b border-border pb-2">{exp.role} at {exp.company}</h5>
                            <ul className="space-y-3">
                                {exp.improved_bullets.map((bullet, j) => (
                                    <li key={j} className="text-sm text-text-dim flex items-start">
                                        <span className="mr-2 text-accent">•</span>
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReviewerView;
