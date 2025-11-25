import React from 'react';

const ChecklistView = ({ data }) => {
    if (!data) return null;

    const { checklist, summary } = data;

    return (
        <div className="animate-fade-in space-y-6">
            {/* Summary Card */}
            {summary && (
                <div className="card">
                    <h3 className="text-lg font-semibold text-text-main mb-4">📊 Match Summary</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center p-3 bg-bg-card rounded-md border border-border">
                            <div className="text-2xl font-bold text-accent">{summary.match_percentage}%</div>
                            <div className="text-xs text-text-muted mt-1">Match</div>
                        </div>
                        <div className="text-center p-3 bg-success/10 rounded-md border border-success/20">
                            <div className="text-2xl font-bold text-success">{summary.present}</div>
                            <div className="text-xs text-text-muted mt-1">Present</div>
                        </div>
                        <div className="text-center p-3 bg-warning/10 rounded-md border border-warning/20">
                            <div className="text-2xl font-bold text-warning">{summary.partial}</div>
                            <div className="text-xs text-text-muted mt-1">Partial</div>
                        </div>
                        <div className="text-center p-3 bg-danger/10 rounded-md border border-danger/20">
                            <div className="text-2xl font-bold text-danger">{summary.missing}</div>
                            <div className="text-xs text-text-muted mt-1">Missing</div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        {summary.key_strengths && summary.key_strengths.length > 0 && (
                            <div>
                                <h4 className="font-semibold text-success mb-2">✅ Key Strengths</h4>
                                <ul className="space-y-1">
                                    {summary.key_strengths.map((strength, idx) => (
                                        <li key={idx} className="text-sm text-text-muted">• {strength}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {summary.main_gaps && summary.main_gaps.length > 0 && (
                            <div>
                                <h4 className="font-semibold text-danger mb-2">❌ Main Gaps</h4>
                                <ul className="space-y-1">
                                    {summary.main_gaps.map((gap, idx) => (
                                        <li key={idx} className="text-sm text-text-muted">• {gap}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Checklist */}
            {checklist && checklist.length > 0 && (
                <div className="card">
                    <h3 className="text-lg font-semibold text-text-main mb-4">✓ Requirement Checklist</h3>
                    <div className="space-y-2">
                        {checklist.map((item, idx) => (
                            <div key={idx} className={`p-3 rounded-md border ${item.status === 'PRESENT' ? 'border-success/30 bg-success/5' :
                                    item.status === 'PARTIAL' ? 'border-warning/30 bg-warning/5' :
                                        'border-danger/30 bg-danger/5'
                                }`}>
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-lg ${item.status === 'PRESENT' ? 'text-success' :
                                                    item.status === 'PARTIAL' ? 'text-warning' :
                                                        'text-danger'
                                                }`}>
                                                {item.status === 'PRESENT' ? '✓' : item.status === 'PARTIAL' ? '◐' : '✗'}
                                            </span>
                                            <span className="font-semibold text-text-main">{item.requirement}</span>
                                        </div>
                                        <p className="text-sm text-text-muted ml-7">{item.evidence}</p>
                                    </div>
                                    <span className="px-2 py-1 text-xs rounded bg-bg-card border border-border text-text-muted">
                                        {item.category.replace(/_/g, ' ')}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChecklistView;
