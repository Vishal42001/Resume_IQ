import React from 'react';

const AnalystView = ({ data }) => {
    if (!data) return null;

    // Icons as SVG components
    const BriefcaseIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    );

    const BuildingIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
    );

    const TrendingIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
    );

    const LightbulbIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
    );

    const renderJobSnapshot = () => {
        if (!data.job_snapshot || !Array.isArray(data.job_snapshot)) return null;

        return (
            <div className="card">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <BriefcaseIcon />
                    </div>
                    <h3 className="text-lg font-semibold text-text-main">Job Snapshot</h3>
                </div>
                <ul className="space-y-3">
                    {data.job_snapshot.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-text-main">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"></span>
                            <span className="leading-relaxed">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const renderCompanyOverview = () => {
        if (!data.company_overview) return null;
        const { what_they_do, scale, recent_changes } = data.company_overview;

        return (
            <div className="card">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                        <BuildingIcon />
                    </div>
                    <h3 className="text-lg font-semibold text-text-main">Company Overview</h3>
                </div>
                <div className="space-y-4">
                    {what_they_do && (
                        <div>
                            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">What They Do</h4>
                            <p className="text-sm text-text-main leading-relaxed">{what_they_do}</p>
                        </div>
                    )}
                    {scale && (
                        <div>
                            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Scale & Presence</h4>
                            <p className="text-sm text-text-main leading-relaxed">{scale}</p>
                        </div>
                    )}
                    {recent_changes && (
                        <div>
                            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Recent Changes</h4>
                            <p className="text-sm text-text-main leading-relaxed">{recent_changes}</p>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const renderBusinessTrends = () => {
        if (!data.business_trends) return null;
        const { growth_indicators, funding_status, market_position, challenges, note } = data.business_trends;

        return (
            <div className="card">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-50 rounded-lg text-green-600">
                        <TrendingIcon />
                    </div>
                    <h3 className="text-lg font-semibold text-text-main">Business Trends & Context</h3>
                </div>
                <div className="space-y-4">
                    {growth_indicators && (
                        <div>
                            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Growth Indicators</h4>
                            <p className="text-sm text-text-main leading-relaxed">{growth_indicators}</p>
                        </div>
                    )}
                    {funding_status && (
                        <div>
                            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Funding Status</h4>
                            <p className="text-sm text-text-main leading-relaxed">{funding_status}</p>
                        </div>
                    )}
                    {market_position && (
                        <div>
                            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Market Position</h4>
                            <p className="text-sm text-text-main leading-relaxed">{market_position}</p>
                        </div>
                    )}
                    {challenges && (
                        <div>
                            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Challenges</h4>
                            <p className="text-sm text-text-main leading-relaxed">{challenges}</p>
                        </div>
                    )}
                    {note && (
                        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                            <p className="text-xs text-amber-800">{note}</p>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const renderPositioningAdvice = () => {
        if (!data.positioning_advice) return null;
        const { resume_focus, portfolio_suggestions, interview_prep } = data.positioning_advice;

        return (
            <div className="card bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white rounded-lg text-indigo-600 shadow-sm">
                        <LightbulbIcon />
                    </div>
                    <h3 className="text-lg font-semibold text-text-main">How to Position Yourself</h3>
                </div>
                <div className="space-y-5">
                    {resume_focus && Array.isArray(resume_focus) && resume_focus.length > 0 && (
                        <div>
                            <h4 className="text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-3">Resume Focus</h4>
                            <ul className="space-y-2">
                                {resume_focus.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-text-main">
                                        <span className="text-indigo-500 font-bold">→</span>
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {portfolio_suggestions && Array.isArray(portfolio_suggestions) && portfolio_suggestions.length > 0 && (
                        <div>
                            <h4 className="text-xs font-semibold text-purple-700 uppercase tracking-wider mb-3">Portfolio Suggestions</h4>
                            <ul className="space-y-2">
                                {portfolio_suggestions.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-text-main">
                                        <span className="text-purple-500 font-bold">→</span>
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {interview_prep && Array.isArray(interview_prep) && interview_prep.length > 0 && (
                        <div>
                            <h4 className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-3">Interview Preparation</h4>
                            <ul className="space-y-2">
                                {interview_prep.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-text-main">
                                        <span className="text-blue-500 font-bold">→</span>
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="animate-fade-in space-y-6">
            <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-text-main">Comprehensive Job Analysis</h2>
            </div>
            <p className="text-sm text-text-muted mb-6">
                Detailed insights to help you understand the opportunity and position yourself effectively
            </p>

            <div className="grid gap-6 md:grid-cols-2">
                {renderJobSnapshot()}
                {renderCompanyOverview()}
            </div>

            {renderBusinessTrends()}
            {renderPositioningAdvice()}
        </div>
    );
};

export default AnalystView;
