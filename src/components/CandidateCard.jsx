import React, { useState } from 'react';
import SkillsChart from './SkillsChart';

const CandidateCard = ({ candidate, rank }) => {
    const [expanded, setExpanded] = useState(false);

    const getRankBadge = (rank) => {
        if (rank === 1) return { emoji: '🥇', class: 'badge-success', label: 'Top Match' };
        if (rank === 2) return { emoji: '🥈', class: 'badge-info', label: '2nd Best' };
        if (rank === 3) return { emoji: '🥉', class: 'badge-warning', label: '3rd Best' };
        return { emoji: '📋', class: 'badge-info', label: `Rank #${rank}` };
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-success';
        if (score >= 60) return 'text-accent';
        if (score >= 40) return 'text-warning';
        return 'text-danger';
    };

    const rankBadge = getRankBadge(rank);

    return (
        <div className="card hover:scale-[1.02] transition-all duration-300">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{rankBadge.emoji}</span>
                        <h3 className="text-xl font-bold text-text-main">{candidate.name}</h3>
                    </div>
                    <span className={`badge ${rankBadge.class} text-xs`}>
                        {rankBadge.label}
                    </span>
                </div>
                <div className="text-right">
                    <div className={`text-4xl font-black ${getScoreColor(candidate.overallScore)}`}>
                        {candidate.overallScore}%
                    </div>
                    <div className="text-xs text-text-muted mt-1">Overall Match</div>
                </div>
            </div>

            {/* Contact Info */}
            {candidate.email && (
                <div className="mb-4 text-sm text-text-muted">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>{candidate.email}</span>
                    </div>
                </div>
            )}

            {/* Skills Chart */}
            <div className="mb-4">
                <h4 className="text-sm font-semibold text-text-main mb-3">Skills Match Breakdown</h4>
                <SkillsChart
                    requiredSkillsPercent={candidate.requiredSkillsPercent}
                    preferredSkillsPercent={candidate.preferredSkillsPercent}
                    candidateName={candidate.name}
                />
            </div>

            {/* Skills Summary */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="glass border border-border rounded-xl p-3">
                    <div className="text-xs text-text-muted mb-1">Required Skills</div>
                    <div className="text-lg font-bold text-accent">
                        {candidate.requiredSkillsMatched}/{candidate.requiredSkillsTotal}
                    </div>
                </div>
                <div className="glass border border-border rounded-xl p-3">
                    <div className="text-xs text-text-muted mb-1">Preferred Skills</div>
                    <div className="text-lg font-bold text-secondary">
                        {candidate.preferredSkillsMatched}/{candidate.preferredSkillsTotal}
                    </div>
                </div>
            </div>

            {/* Key Strengths */}
            {candidate.keyStrengths && candidate.keyStrengths.length > 0 && (
                <div className="mb-4">
                    <h4 className="text-sm font-semibold text-text-main mb-2">Key Strengths</h4>
                    <div className="flex flex-wrap gap-2">
                        {candidate.keyStrengths.slice(0, 3).map((strength, idx) => (
                            <span key={idx} className="badge badge-success text-xs">
                                ✓ {strength}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Missing Skills */}
            {candidate.missingSkills && candidate.missingSkills.length > 0 && (
                <div className="mb-4">
                    <h4 className="text-sm font-semibold text-text-main mb-2">Missing Skills</h4>
                    <div className="flex flex-wrap gap-2">
                        {candidate.missingSkills.slice(0, 3).map((skill, idx) => (
                            <span key={idx} className="badge badge-danger text-xs">
                                ✗ {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Expandable Details */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full btn btn-secondary text-sm py-2 mt-2"
            >
                {expanded ? (
                    <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                        Show Less
                    </>
                ) : (
                    <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        Show Details
                    </>
                )}
            </button>

            {/* Expanded Details */}
            {expanded && (
                <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                    {candidate.summary && (
                        <div className="mb-4">
                            <h4 className="text-sm font-semibold text-text-main mb-2">Summary</h4>
                            <p className="text-sm text-text-muted leading-relaxed">{candidate.summary}</p>
                        </div>
                    )}

                    {candidate.experience && candidate.experience.length > 0 && (
                        <div className="mb-4">
                            <h4 className="text-sm font-semibold text-text-main mb-2">Recent Experience</h4>
                            {candidate.experience.slice(0, 2).map((exp, idx) => (
                                <div key={idx} className="mb-3 text-sm">
                                    <div className="font-semibold text-text-main">{exp.title}</div>
                                    <div className="text-text-muted text-xs">{exp.company} • {exp.duration}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {candidate.allSkills && candidate.allSkills.length > 0 && (
                        <div>
                            <h4 className="text-sm font-semibold text-text-main mb-2">All Skills</h4>
                            <div className="flex flex-wrap gap-2">
                                {candidate.allSkills.map((skill, idx) => (
                                    <span key={idx} className="badge badge-info text-xs">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CandidateCard;
