import React from 'react';

const BehavioralFitView = ({ data }) => {
    if (!data) return null;

    const { behavioral_signals, evidence_of_fit, gaps, recommendations } = data;

    return (
        <div className="animate-fade-in space-y-6">
            {/* Behavioral Signals */}
            {behavioral_signals && behavioral_signals.length > 0 && (
                <div className="card">
                    <h3 className="text-lg font-semibold text-text-main mb-4">🎯 Behavioral & Cultural Signals in JD</h3>
                    <div className="space-y-3">
                        {behavioral_signals.map((signal, idx) => (
                            <div key={idx} className="border-l-4 border-accent pl-4 py-2">
                                <h4 className="font-semibold text-text-main">{signal.trait}</h4>
                                <p className="text-sm text-text-muted mt-1">{signal.evidence_in_jd}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Evidence of Fit */}
            {evidence_of_fit && evidence_of_fit.length > 0 && (
                <div className="card">
                    <h3 className="text-lg font-semibold text-text-main mb-4">✅ Evidence of Fit in Resume</h3>
                    <div className="space-y-3">
                        {evidence_of_fit.map((evidence, idx) => (
                            <div key={idx} className="bg-bg-card p-4 rounded-md border border-border">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-text-main">{evidence.trait}</h4>
                                    <span className={`px-2 py-1 text-xs rounded-full ${evidence.strength === 'strong' ? 'bg-success/10 text-success' :
                                            evidence.strength === 'moderate' ? 'bg-warning/10 text-warning' :
                                                'bg-danger/10 text-danger'
                                        }`}>
                                        {evidence.strength}
                                    </span>
                                </div>
                                <p className="text-sm text-text-muted">{evidence.resume_evidence}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Gaps */}
            {gaps && gaps.length > 0 && (
                <div className="card border-warning/20 bg-warning/5">
                    <h3 className="text-lg font-semibold text-text-main mb-4">⚠️ Gaps or Weak Signals</h3>
                    <div className="space-y-2">
                        {gaps.map((gap, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                                <span className="text-warning mt-1">•</span>
                                <div>
                                    <span className="font-medium text-text-main">{gap.trait}:</span>
                                    <span className="text-sm text-text-muted ml-2">{gap.reason}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Recommendations */}
            {recommendations && recommendations.length > 0 && (
                <div className="card">
                    <h3 className="text-lg font-semibold text-text-main mb-4">💡 Recommendations to Improve Positioning</h3>
                    <ul className="space-y-2">
                        {recommendations.map((rec, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                                <span className="text-accent mt-1">→</span>
                                <span className="text-sm text-text-main">{rec}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default BehavioralFitView;
