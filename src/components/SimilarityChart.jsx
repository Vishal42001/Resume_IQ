import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const SimilarityChart = ({ candidateTraits, idealProfile }) => {
    // Transform data for radar chart
    const data = [
        {
            trait: 'Leadership',
            candidate: candidateTraits.leadership || 0,
            ideal: idealProfile.leadership || 0,
            fullMark: 10
        },
        {
            trait: 'Technical',
            candidate: candidateTraits.technical_depth || 0,
            ideal: idealProfile.technical_depth || 0,
            fullMark: 10
        },
        {
            trait: 'Communication',
            candidate: candidateTraits.communication || 0,
            ideal: idealProfile.communication || 0,
            fullMark: 10
        },
        {
            trait: 'Adaptability',
            candidate: candidateTraits.adaptability || 0,
            ideal: idealProfile.adaptability || 0,
            fullMark: 10
        },
        {
            trait: 'Impact',
            candidate: candidateTraits.impact || 0,
            ideal: idealProfile.impact || 0,
            fullMark: 10
        },
        {
            trait: 'Collaboration',
            candidate: candidateTraits.team_collaboration || 0,
            ideal: idealProfile.team_collaboration || 0,
            fullMark: 10
        }
    ];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="glass border border-border rounded-xl p-3 shadow-lg">
                    <p className="text-text-main font-semibold text-sm mb-2">
                        {payload[0].payload.trait}
                    </p>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-accent"></div>
                            <span className="text-xs text-text-muted">Candidate:</span>
                            <span className="text-sm font-bold text-accent">{payload[0].value}/10</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-secondary"></div>
                            <span className="text-xs text-text-muted">Ideal:</span>
                            <span className="text-sm font-bold text-secondary">{payload[1].value}/10</span>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data}>
                    <PolarGrid stroke="rgba(255, 255, 255, 0.1)" />
                    <PolarAngleAxis
                        dataKey="trait"
                        tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                    />
                    <PolarRadiusAxis
                        angle={90}
                        domain={[0, 10]}
                        tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Radar
                        name="Candidate"
                        dataKey="candidate"
                        stroke="#06b6d4"
                        fill="#06b6d4"
                        fillOpacity={0.3}
                        strokeWidth={2}
                    />
                    <Radar
                        name="Ideal Profile"
                        dataKey="ideal"
                        stroke="#0ea5e9"
                        fill="#0ea5e9"
                        fillOpacity={0.2}
                        strokeWidth={2}
                        strokeDasharray="5 5"
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SimilarityChart;
