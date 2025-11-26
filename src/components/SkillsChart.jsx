import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const SkillsChart = ({ requiredSkillsPercent, preferredSkillsPercent, candidateName }) => {
    const data = [
        {
            name: 'Required Skills',
            percentage: requiredSkillsPercent,
            color: '#06b6d4'
        },
        {
            name: 'Preferred Skills',
            percentage: preferredSkillsPercent,
            color: '#0ea5e9'
        }
    ];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="glass border border-border rounded-xl p-3 shadow-lg">
                    <p className="text-text-main font-semibold text-sm mb-1">
                        {payload[0].payload.name}
                    </p>
                    <p className="text-accent font-bold text-lg">
                        {payload[0].value}%
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                    <XAxis
                        dataKey="name"
                        stroke="var(--text-muted)"
                        tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                    />
                    <YAxis
                        stroke="var(--text-muted)"
                        tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                        domain={[0, 100]}
                        label={{ value: 'Match %', angle: -90, position: 'insideLeft', fill: 'var(--text-muted)' }}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(6, 182, 212, 0.1)' }} />
                    <Bar dataKey="percentage" radius={[8, 8, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SkillsChart;
