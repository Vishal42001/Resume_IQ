import React from 'react';

const HomePage = ({ onStart }) => {
    return (
        <div className="min-h-screen flex items-center justify-center py-20">
            <div className="container">
                <div className="max-w-6xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-16 animate-fade-in">
                        <div className="inline-block mb-4">
                            <span className="px-4 py-2 rounded-full text-sm font-semibold" style={{
                                background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
                                color: 'white'
                            }}>
                                ⚡ Powered by AI
                            </span>
                        </div>

                        <h1 className="text-6xl md:text-7xl font-black mb-6 text-text-main leading-tight">
                            Smart Resume<br />Optimization
                        </h1>

                        <p className="text-xl md:text-2xl text-text-muted max-w-3xl mx-auto mb-12 leading-relaxed">
                            Leverage AI to analyze, optimize, and tailor your resume for any job. Get intelligent insights, ATS optimization, and interview preparation—all in one powerful platform.
                        </p>

                        {/* Brain Graphic */}
                        <div className="mb-12 flex justify-center">
                            <div className="relative w-full max-w-2xl">
                                <img
                                    src="/brain-hero.png"
                                    alt="AI Brain"
                                    className="w-full h-auto animate-float"
                                    style={{ filter: 'drop-shadow(0 20px 40px rgba(124, 58, 237, 0.3))' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        <div className="card hover:border-accent transition-all cursor-pointer">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{
                                    background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)'
                                }}>
                                    🎯
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-text-main mb-2">ATS Optimized</h3>
                                    <p className="text-text-muted text-sm">
                                        Check how well your resume is optimized for Applicant Tracking Systems
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="card hover:border-success transition-all cursor-pointer">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{
                                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                                }}>
                                    💼
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-text-main mb-2">Interview Prep</h3>
                                    <p className="text-text-muted text-sm">
                                        Get personalized interview questions and preparation guidance
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="card hover:border-secondary transition-all cursor-pointer">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{
                                    background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)'
                                }}>
                                    ☁️
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-text-main mb-2">Cloud Ranking</h3>
                                    <p className="text-text-muted text-sm">
                                        Compare your resume against industry benchmarks and standards
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="card hover:border-warning transition-all cursor-pointer">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{
                                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                                }}>
                                    ⚡
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-text-main mb-2">Easy Input</h3>
                                    <p className="text-text-muted text-sm">
                                        Upload or paste your resume and job description in seconds
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="text-center animate-fade-in">
                        <button
                            onClick={onStart}
                            className="btn btn-primary text-lg px-12 py-4 shadow-2xl hover:scale-105 transition-transform"
                        >
                            <span>Start Your Task</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
