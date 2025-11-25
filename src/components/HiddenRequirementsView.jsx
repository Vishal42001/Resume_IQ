import React from 'react';

const HiddenRequirementsView = ({ data }) => {
    if (!data) return null;

    const { hidden_requirements, risk_analysis, mitigation_strategies } = data;

    return (
        <div className="animate-fade-in space-y-6">
            {/* Hidden Requirements */}
            {hidden_requirements && hidden_requirements.length > 0 && (
                <div className="card">
                    <h3 className="text-lg font-semibold text-text-main mb-4">🔍 Likely Hidden Requirements</h3>
                    <div className="space-y-3">
                        {hidden_requirements.map((req, idx) => (
                            <div key={idx} className="border-l-4 border-accent pl-4 py-2">
                                <h4 className="font-semibold text-text-main mb-1">{req.requirement}</h4>
                                <p className="text-sm text-text-muted">{req.why_important}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Risk Analysis */}
            {risk_analysis && risk_analysis.length > 0 && (
                <div className="card">
                    <h3 className="text-lg font-semibold text-text-main mb-4">⚠️ Risk / Mismatch Analysis</h3>
                    <div className="space-y-3">
                        {risk_analysis.map((risk, idx) => (
                            <div key={idx} className={`p-4 rounded-md border ${risk.severity === 'high' ? 'border-danger/30 bg-danger/5' :
                                    risk.severity === 'medium' ? 'border-warning/30 bg-warning/5' :
                                        'border-border bg-bg-card'
                                }`}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold text-text-main">{risk.risk_type.replace(/-/g, ' ').toUpperCase()}</span>
                                    <span className={`px-2 py-1 text-xs rounded-full ${risk.severity === 'high' ? 'bg-danger/20 text-danger' :
                                            risk.severity === 'medium' ? 'bg-warning/20 text-warning' :
                                                'bg-success/20 text-success'
                                        }`}>
                                        {risk.severity}
                                    </span>
                                </div>
                                <p className="text-sm text-text-muted">{risk.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Mitigation Strategies */}
            {mitigation_strategies && mitigation_strategies.length > 0 && (
                <div className="card">
                    <h3 className="text-lg font-semibold text-text-main mb-4">🛡️ How to De-risk Your Profile</h3>
                    <ul className="space-y-3">
                        {mitigation_strategies.map((strategy, idx) => (
                            <li key={idx} className="flex items-start gap-3 p-3 bg-bg-card rounded-md border border-border">
                                <span className="text-accent font-bold">{idx + 1}.</span>
                                <span className="text-sm text-text-main">{strategy}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default HiddenRequirementsView;
