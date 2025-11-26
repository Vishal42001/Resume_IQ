import React from 'react';
import CandidateCard from './CandidateCard';

const ComparisonView = ({ data }) => {
    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center glass rounded-2xl border-2 border-dashed border-border/50">
                <div className="w-16 h-16 mb-4 rounded-full bg-gradient flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <h4 className="text-lg font-bold text-text-main mb-2">No Comparison Data</h4>
                <p className="text-text-muted text-sm max-w-md">
                    Upload multiple resumes and run the comparison analysis to see side-by-side candidate rankings
                </p>
            </div>
        );
    }

    // Parse the data if it's a string
    let comparisonData;
    try {
        comparisonData = typeof data === 'string' ? JSON.parse(data) : data;
    } catch (error) {
        return (
            <div className="p-4 border border-danger/30 bg-danger/10 text-danger text-sm rounded-xl">
                <p className="font-semibold mb-1">Error parsing comparison data</p>
                <p className="text-xs">{error.message}</p>
            </div>
        );
    }

    const { candidates = [], jobTitle, totalCandidates } = comparisonData;

    if (!candidates || candidates.length === 0) {
        return (
            <div className="p-4 border border-warning/30 bg-warning/10 text-warning text-sm rounded-xl">
                <p className="font-semibold">No candidates found in the analysis</p>
            </div>
        );
    }

    // Sort candidates by overall score (descending)
    const sortedCandidates = [...candidates].sort((a, b) => b.overallScore - a.overallScore);

    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-2xl font-bold text-text-main mb-2">
                            📊 Candidate Comparison
                        </h3>
                        {jobTitle && (
                            <p className="text-text-muted text-sm">
                                Position: <span className="font-semibold text-text-main">{jobTitle}</span>
                            </p>
                        )}
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-black gradient-text">{totalCandidates || candidates.length}</div>
                        <div className="text-xs text-text-muted mt-1">Candidates Analyzed</div>
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="glass border border-border rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                                <span className="text-2xl">🥇</span>
                            </div>
                            <div>
                                <div className="text-xs text-text-muted mb-1">Top Candidate</div>
                                <div className="font-bold text-text-main">{sortedCandidates[0]?.name || 'N/A'}</div>
                                <div className="text-sm text-success font-semibold">{sortedCandidates[0]?.overallScore}% Match</div>
                            </div>
                        </div>
                    </div>

                    <div className="glass border border-border rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-xs text-text-muted mb-1">Average Match</div>
                                <div className="text-2xl font-bold text-accent">
                                    {Math.round(sortedCandidates.reduce((sum, c) => sum + c.overallScore, 0) / sortedCandidates.length)}%
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass border border-border rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-xs text-text-muted mb-1">Strong Matches</div>
                                <div className="text-2xl font-bold text-secondary">
                                    {sortedCandidates.filter(c => c.overallScore >= 70).length}
                                </div>
                                <div className="text-xs text-text-muted">≥70% match</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Candidate Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedCandidates.map((candidate, index) => (
                    <CandidateCard
                        key={candidate.id || index}
                        candidate={candidate}
                        rank={index + 1}
                    />
                ))}
            </div>

            {/* Footer Note */}
            <div className="mt-8 p-4 glass border border-border rounded-xl">
                <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-sm text-text-muted">
                        <p className="font-semibold text-text-main mb-1">How scores are calculated:</p>
                        <p>
                            Overall match score is based on required skills coverage, preferred skills match,
                            experience relevance, and keyword alignment with the job description.
                            Required skills are weighted more heavily than preferred skills.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComparisonView;
