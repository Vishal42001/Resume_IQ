import React, { useState } from 'react';
import { parseFile } from '../utils/fileParser';

const TopPerformerManager = ({ topPerformers, setTopPerformers }) => {
    const [parsing, setParsing] = useState(false);
    const [parseError, setParseError] = useState(null);
    const [showManager, setShowManager] = useState(false);

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        if (topPerformers.length + files.length > 20) {
            setParseError('Maximum 20 top performer profiles allowed');
            return;
        }

        setParsing(true);
        setParseError(null);

        try {
            const parsedProfiles = [];
            for (const file of files) {
                const text = await parseFile(file);
                parsedProfiles.push({
                    id: `${file.name}-${Date.now()}-${Math.random()}`,
                    name: file.name.replace(/\.(pdf|docx)$/i, ''),
                    content: text,
                    uploadedAt: new Date().toISOString()
                });
            }
            setTopPerformers([...topPerformers, ...parsedProfiles]);
        } catch (err) {
            setParseError(err.message);
        } finally {
            setParsing(false);
        }
    };

    const removePerformer = (id) => {
        setTopPerformers(topPerformers.filter(p => p.id !== id));
    };

    const clearAll = () => {
        if (window.confirm('Are you sure you want to remove all top performer profiles?')) {
            setTopPerformers([]);
        }
    };

    return (
        <div className="mb-6">
            {/* Toggle Button */}
            <button
                onClick={() => setShowManager(!showManager)}
                className="btn btn-secondary text-sm mb-4"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                {showManager ? 'Hide' : 'Manage'} Top Performers ({topPerformers.length})
            </button>

            {showManager && (
                <div className="glass border border-border rounded-xl p-6 animate-fade-in">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h4 className="text-lg font-bold text-text-main mb-1">Top Performer Index</h4>
                            <p className="text-xs text-text-muted">
                                Upload profiles of high-performing employees for cultural fit analysis
                            </p>
                        </div>
                        {topPerformers.length > 0 && (
                            <button
                                onClick={clearAll}
                                className="text-danger hover:text-danger/80 text-xs font-semibold transition-colors"
                            >
                                Clear All
                            </button>
                        )}
                    </div>

                    {parseError && (
                        <div className="p-3 bg-danger/10 border border-danger/30 rounded-lg text-danger text-xs mb-4">
                            {parseError}
                        </div>
                    )}

                    {/* Upload Section */}
                    <div className="mb-4">
                        <input
                            type="file"
                            id="top-performer-upload"
                            accept=".pdf,.docx"
                            multiple
                            className="hidden"
                            onChange={handleFileUpload}
                        />
                        <label
                            htmlFor="top-performer-upload"
                            className={`btn btn-primary text-sm w-full ${parsing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            {parsing ? 'Uploading...' : 'Upload Top Performer Profiles'}
                        </label>
                        <p className="text-xs text-text-muted mt-2 text-center">
                            PDF or DOCX files • Max 20 profiles • {20 - topPerformers.length} slots remaining
                        </p>
                    </div>

                    {/* Performers List */}
                    {topPerformers.length > 0 ? (
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {topPerformers.map((performer, idx) => (
                                <div
                                    key={performer.id}
                                    className="flex items-center justify-between p-3 glass border border-border rounded-lg hover:border-accent/50 transition-all"
                                >
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                                            <span className="text-success font-bold text-sm">#{idx + 1}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-semibold text-text-main truncate">
                                                {performer.name}
                                            </div>
                                            <div className="text-xs text-text-muted">
                                                Added {new Date(performer.uploadedAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removePerformer(performer.id)}
                                        className="text-danger hover:text-danger/80 transition-colors flex-shrink-0 p-2 hover:bg-danger/10 rounded"
                                        title="Remove"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="glass border-2 border-dashed border-border/50 rounded-xl p-8 text-center">
                            <svg className="w-16 h-16 text-text-dim mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <p className="text-text-muted text-sm mb-2">No top performers indexed yet</p>
                            <p className="text-text-dim text-xs">Upload profiles to enable predictive analysis</p>
                        </div>
                    )}

                    {/* Info Box */}
                    <div className="mt-4 p-3 glass border border-border rounded-lg">
                        <div className="flex items-start gap-2">
                            <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="text-xs text-text-muted">
                                <p className="font-semibold text-text-main mb-1">Best Practices:</p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Upload 5-10 profiles for best results</li>
                                    <li>Include diverse high performers</li>
                                    <li>Profiles are stored locally in your browser</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TopPerformerManager;
