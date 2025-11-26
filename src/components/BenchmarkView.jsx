import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const BenchmarkView = ({ data, benchmarkData }) => {
    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center glass rounded-2xl border-2 border-dashed border-border/50">
                <div className="w-16 h-16 mb-4 rounded-full bg-gradient flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <h4 className="text-lg font-bold text-text-main mb-2">No Benchmark Data</h4>
                <p className="text-text-muted text-sm max-w-md">
                    Upload a resume and run the benchmark analysis to see market insights
                </p>
            </div>
        );
    }

    let benchmarkResult;
    try {
        benchmarkResult = typeof data === 'string' ? JSON.parse(data) : data;
    } catch (error) {
        return (
            <div className="p-4 border border-danger/30 bg-danger/10 text-danger text-sm rounded-xl">
                <p className="font-semibold mb-1">Error parsing benchmark data</p>
                <p className="text-xs">{error.message}</p>
            </div>
        );
    }

    const {
        experience_level,
        years_of_experience,
        experience_justification,
        salary_estimate,
        skills_analysis,
        market_competitiveness,
        career_insights,
        comparison_to_benchmark
    } = benchmarkResult;

    // Prepare salary chart data
    const salaryData = [
        {
            name: 'Min',
            value: salary_estimate?.min || 0,
            fill: '#0ea5e9'
        },
        {
            name: 'Your Est.',
            value: salary_estimate?.avg || 0,
            fill: '#06b6d4'
        },
        {
            name: 'Max',
            value: salary_estimate?.max || 0,
            fill: '#22d3ee'
        }
    ];

    // Get level badge color
    const getLevelBadge = (level) => {
        const badges = {
            junior: { class: 'badge-info', label: 'Junior' },
            mid: { class: 'badge-warning', label: 'Mid-Level' },
            senior: { class: 'badge-success', label: 'Senior' }
        };
        return badges[level] || badges.mid;
    };

    const getCompetitivenessColor = (level) => {
        const colors = {
            highly_competitive: 'text-success',
            competitive: 'text-accent',
            average: 'text-warning',
            below_average: 'text-danger'
        };
        return colors[level] || 'text-text-muted';
    };

    const levelBadge = getLevelBadge(experience_level);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="glass border border-border rounded-xl p-3 shadow-lg">
                    <p className="text-text-main font-semibold text-sm mb-1">
                        {payload[0].payload.name}
                    </p>
                    <p className="text-accent font-bold">
                        ${payload[0].value.toLocaleString()}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="card">
                <h3 className="text-2xl font-bold text-text-main mb-2">📊 Industry Benchmarking</h3>
                <p className="text-text-muted text-sm">
                    Compare your profile against industry standards and market trends
                </p>
            </div>

            {/* Experience Level & Salary */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Experience Level */}
                <div className="card">
                    <h4 className="text-lg font-bold text-text-main mb-4">Experience Level</h4>
                    <div className="flex items-center gap-4 mb-4">
                        <span className={`badge ${levelBadge.class} text-lg py-3 px-6`}>
                            {levelBadge.label}
                        </span>
                        <div>
                            <div className="text-3xl font-black text-text-main">{years_of_experience}</div>
                            <div className="text-xs text-text-muted">Years of Experience</div>
                        </div>
                    </div>
                    <div className="glass border border-border rounded-lg p-3">
                        <p className="text-sm text-text-muted">{experience_justification}</p>
                    </div>
                </div>

                {/* Market Competitiveness */}
                <div className="card">
                    <h4 className="text-lg font-bold text-text-main mb-4">Market Competitiveness</h4>
                    <div className="text-center mb-4">
                        <div className={`text-6xl font-black mb-2 ${getCompetitivenessColor(market_competitiveness?.level)}`}>
                            {market_competitiveness?.score}%
                        </div>
                        <div className="text-sm text-text-muted capitalize">
                            {market_competitiveness?.level?.replace(/_/g, ' ')}
                        </div>
                    </div>
                    <div className="w-full bg-bg-secondary rounded-full h-3">
                        <div
                            className="bg-gradient h-3 rounded-full transition-all"
                            style={{ width: `${market_competitiveness?.score}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Salary Estimate */}
            <div className="card">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-text-main">Salary Estimate</h4>
                    <span className={`badge ${salary_estimate?.confidence === 'high' ? 'badge-success' :
                            salary_estimate?.confidence === 'medium' ? 'badge-warning' : 'badge-danger'
                        } text-xs`}>
                        {salary_estimate?.confidence} confidence
                    </span>
                </div>

                <div className="h-64 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={salaryData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis
                                dataKey="name"
                                tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                            />
                            <YAxis
                                tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                                {salaryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="glass border border-border rounded-lg p-3 text-center">
                        <div className="text-xs text-text-muted mb-1">Minimum</div>
                        <div className="text-lg font-bold text-text-main">
                            ${salary_estimate?.min?.toLocaleString()}
                        </div>
                    </div>
                    <div className="glass border border-accent rounded-lg p-3 text-center bg-accent/5">
                        <div className="text-xs text-text-muted mb-1">Your Estimate</div>
                        <div className="text-lg font-bold text-accent">
                            ${salary_estimate?.avg?.toLocaleString()}
                        </div>
                    </div>
                    <div className="glass border border-border rounded-lg p-3 text-center">
                        <div className="text-xs text-text-muted mb-1">Maximum</div>
                        <div className="text-lg font-bold text-text-main">
                            ${salary_estimate?.max?.toLocaleString()}
                        </div>
                    </div>
                </div>

                {salary_estimate?.factors && salary_estimate.factors.length > 0 && (
                    <div className="glass border border-border rounded-lg p-4">
                        <h5 className="text-sm font-semibold text-text-main mb-2">Factors Affecting Estimate:</h5>
                        <ul className="space-y-1">
                            {salary_estimate.factors.map((factor, idx) => (
                                <li key={idx} className="text-sm text-text-muted flex items-start gap-2">
                                    <span className="text-accent flex-shrink-0">•</span>
                                    <span>{factor}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Skills Analysis */}
            <div className="card">
                <h4 className="text-lg font-bold text-text-main mb-4">Skills Analysis</h4>

                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-text-main">Industry Skill Match</span>
                        <span className="text-sm font-bold text-accent">{skills_analysis?.skill_match_percentage}%</span>
                    </div>
                    <div className="w-full bg-bg-secondary rounded-full h-3">
                        <div
                            className="bg-gradient h-3 rounded-full transition-all"
                            style={{ width: `${skills_analysis?.skill_match_percentage}%` }}
                        ></div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    {/* Matching Skills */}
                    {skills_analysis?.matching_top_skills && skills_analysis.matching_top_skills.length > 0 && (
                        <div>
                            <h5 className="text-sm font-semibold text-text-main mb-3 flex items-center gap-2">
                                <span className="text-success">✓</span>
                                Matching Skills
                            </h5>
                            <div className="flex flex-wrap gap-2">
                                {skills_analysis.matching_top_skills.map((skill, idx) => (
                                    <span key={idx} className="badge badge-success text-xs">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Missing Skills */}
                    {skills_analysis?.missing_top_skills && skills_analysis.missing_top_skills.length > 0 && (
                        <div>
                            <h5 className="text-sm font-semibold text-text-main mb-3 flex items-center gap-2">
                                <span className="text-warning">!</span>
                                Skills to Learn
                            </h5>
                            <div className="flex flex-wrap gap-2">
                                {skills_analysis.missing_top_skills.map((skill, idx) => (
                                    <span key={idx} className="badge badge-warning text-xs">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Unique Skills */}
                    {skills_analysis?.unique_skills && skills_analysis.unique_skills.length > 0 && (
                        <div>
                            <h5 className="text-sm font-semibold text-text-main mb-3 flex items-center gap-2">
                                <span className="text-accent">★</span>
                                Unique Skills
                            </h5>
                            <div className="flex flex-wrap gap-2">
                                {skills_analysis.unique_skills.map((skill, idx) => (
                                    <span key={idx} className="badge badge-info text-xs">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Strengths & Improvements */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Strengths */}
                {market_competitiveness?.strengths && market_competitiveness.strengths.length > 0 && (
                    <div className="card">
                        <h4 className="text-lg font-bold text-text-main mb-4 flex items-center gap-2">
                            <span className="text-success">💪</span>
                            Competitive Strengths
                        </h4>
                        <ul className="space-y-2">
                            {market_competitiveness.strengths.map((strength, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-text-main">
                                    <span className="text-success flex-shrink-0">✓</span>
                                    <span>{strength}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Areas for Improvement */}
                {market_competitiveness?.areas_for_improvement && market_competitiveness.areas_for_improvement.length > 0 && (
                    <div className="card">
                        <h4 className="text-lg font-bold text-text-main mb-4 flex items-center gap-2">
                            <span className="text-warning">📈</span>
                            Growth Opportunities
                        </h4>
                        <ul className="space-y-2">
                            {market_competitiveness.areas_for_improvement.map((area, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-text-main">
                                    <span className="text-warning flex-shrink-0">→</span>
                                    <span>{area}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Career Insights */}
            {career_insights && (
                <div className="card">
                    <h4 className="text-lg font-bold text-text-main mb-4">Career Insights</h4>

                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                        <div className="glass border border-border rounded-lg p-4">
                            <div className="text-sm text-text-muted mb-1">Market Demand</div>
                            <div className={`text-2xl font-bold capitalize ${career_insights.current_market_demand === 'very_high' || career_insights.current_market_demand === 'high'
                                    ? 'text-success'
                                    : career_insights.current_market_demand === 'medium'
                                        ? 'text-warning'
                                        : 'text-danger'
                                }`}>
                                {career_insights.current_market_demand?.replace(/_/g, ' ')}
                            </div>
                        </div>

                        <div className="glass border border-border rounded-lg p-4">
                            <div className="text-sm text-text-muted mb-1">Growth Potential</div>
                            <div className="text-2xl font-bold text-accent">
                                +{career_insights.growth_potential}%
                            </div>
                        </div>
                    </div>

                    {career_insights.recommended_next_steps && career_insights.recommended_next_steps.length > 0 && (
                        <div className="glass border border-border rounded-lg p-4">
                            <h5 className="text-sm font-semibold text-text-main mb-3">Recommended Next Steps:</h5>
                            <ul className="space-y-2">
                                {career_insights.recommended_next_steps.map((step, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-text-main">
                                        <span className="text-accent flex-shrink-0">{idx + 1}.</span>
                                        <span>{step}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {/* Comparison Summary */}
            {comparison_to_benchmark && (
                <div className="card">
                    <h4 className="text-lg font-bold text-text-main mb-4">Market Position Summary</h4>
                    <div className="glass border border-border rounded-lg p-4 mb-4">
                        <p className="text-sm text-text-main leading-relaxed">
                            {comparison_to_benchmark.overall_assessment}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="glass border border-border rounded-lg p-3">
                            <div className="text-xs text-text-muted mb-1">Salary Position</div>
                            <div className={`text-lg font-bold capitalize ${comparison_to_benchmark.salary_position === 'above' ? 'text-success' :
                                    comparison_to_benchmark.salary_position === 'at' ? 'text-accent' : 'text-warning'
                                }`}>
                                {comparison_to_benchmark.salary_position} market
                            </div>
                        </div>

                        <div className="glass border border-border rounded-lg p-3">
                            <div className="text-xs text-text-muted mb-1">Salary Percentile</div>
                            <div className="text-lg font-bold text-accent">
                                {comparison_to_benchmark.salary_percentile}th
                            </div>
                        </div>

                        <div className="glass border border-border rounded-lg p-3">
                            <div className="text-xs text-text-muted mb-1">Skills Position</div>
                            <div className={`text-lg font-bold capitalize ${comparison_to_benchmark.skills_position === 'above' ? 'text-success' :
                                    comparison_to_benchmark.skills_position === 'at' ? 'text-accent' : 'text-warning'
                                }`}>
                                {comparison_to_benchmark.skills_position} average
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BenchmarkView;
