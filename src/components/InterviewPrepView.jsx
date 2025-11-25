import React from 'react';

const InterviewPrepView = ({ data }) => {
    if (!data) return null;

    const { short_version, standard_version, story_version, key_points_to_emphasize, talking_points } = data;

    return (
        <div className="animate-fade-in space-y-6">
            {/* Short Version */}
            {short_version && (
                <div className="card">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-text-main">⚡ Short Version (20-30s)</h3>
                        <span className="text-xs text-text-muted">Elevator pitch</span>
                    </div>
                    <div className="p-4 bg-bg-card rounded-md border border-border">
                        <p className="text-text-main leading-relaxed">{short_version}</p>
                    </div>
                </div>
            )}

            {/* Standard Version */}
            {standard_version && (
                <div className="card">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-text-main">💼 Standard Version (60-90s)</h3>
                        <span className="text-xs text-text-muted">Most common format</span>
                    </div>
                    <div className="p-4 bg-bg-card rounded-md border border-border">
                        <p className="text-text-main leading-relaxed whitespace-pre-line">{standard_version}</p>
                    </div>
                </div>
            )}

            {/* Story Version */}
            {story_version && (
                <div className="card">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-text-main">📖 Story Version</h3>
                        <span className="text-xs text-text-muted">Narrative approach</span>
                    </div>
                    <div className="p-4 bg-bg-card rounded-md border border-border">
                        <p className="text-text-main leading-relaxed whitespace-pre-line">{story_version}</p>
                    </div>
                </div>
            )}

            {/* Key Points */}
            {key_points_to_emphasize && key_points_to_emphasize.length > 0 && (
                <div className="card">
                    <h3 className="text-lg font-semibold text-text-main mb-4">🎯 Key Points to Emphasize</h3>
                    <ul className="space-y-2">
                        {key_points_to_emphasize.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                                <span className="text-accent mt-1">→</span>
                                <span className="text-sm text-text-main">{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Talking Points */}
            {talking_points && (
                <div className="card">
                    <h3 className="text-lg font-semibold text-text-main mb-4">💬 Talking Points Structure</h3>
                    <div className="space-y-4">
                        {talking_points.past && (
                            <div className="border-l-4 border-accent pl-4 py-2">
                                <h4 className="font-semibold text-accent mb-1">Past</h4>
                                <p className="text-sm text-text-muted">{talking_points.past}</p>
                            </div>
                        )}
                        {talking_points.present && (
                            <div className="border-l-4 border-success pl-4 py-2">
                                <h4 className="font-semibold text-success mb-1">Present</h4>
                                <p className="text-sm text-text-muted">{talking_points.present}</p>
                            </div>
                        )}
                        {talking_points.future && (
                            <div className="border-l-4 border-warning pl-4 py-2">
                                <h4 className="font-semibold text-warning mb-1">Future</h4>
                                <p className="text-sm text-text-muted">{talking_points.future}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default InterviewPrepView;
