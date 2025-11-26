import React, { useState } from 'react';
import { generateContent } from '../services/llm';
import { PROMPTS } from '../prompts';
import ReviewerView from './ReviewerView';
import AnalystView from './AnalystView';
import BehavioralFitView from './BehavioralFitView';
import HiddenRequirementsView from './HiddenRequirementsView';
import ChecklistView from './ChecklistView';
import ComparisonView from './ComparisonView';
import PredictorView from './PredictorView';
import TopPerformerManager from './TopPerformerManager';
import CoverLetterGenerator from './CoverLetterGenerator';
import BenchmarkView from './BenchmarkView';
import { INDUSTRY_BENCHMARKS, findClosestRole } from '../data/industryData';

const TABS = [
    { id: 'reviewer', label: 'Review', offline: true, icon: '✓' },
    { id: 'analyst', label: 'Analysis', offline: true, icon: '📊' },
    { id: 'benchmark', label: 'Benchmarking', offline: false, icon: '📈' },
    { id: 'comparison', label: 'Compare Candidates', offline: false, icon: '📊' },
    { id: 'predictor', label: 'Success Predictor', offline: false, icon: '🔮' },
    { id: 'cover_letter', label: 'Cover Letter', offline: false, icon: '📝' },
    { id: 'behavioral_fit', label: 'Behavioral Fit', offline: false, icon: '🎯' },
    { id: 'hidden_requirements', label: 'Hidden Requirements', offline: false, icon: '🔍' },
    { id: 'checklist', label: 'Checklist', offline: true, icon: '☑️' },
];

const Dashboard = ({ resume, jd, model, useLocal, localModel, resumes, topPerformers, setTopPerformers }) => {
    const [activeTab, setActiveTab] = useState('reviewer');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState({
        reviewer: null,
        editor: null,
        analyst: null,
    });
    const [error, setError] = useState(null);

    const handleAnalyze = async () => {
        if (!resume || !jd) {
            setError("Please provide both Resume and Job Description.");
            return;
        }


        setLoading(true);
        setError(null);

        try {
            let promptTemplate = '';
            let userPrompt = '';

            if (activeTab === 'reviewer') {
                promptTemplate = PROMPTS.REVIEWER;
                userPrompt = `\n\nRESUME:\n${resume}\n\nJOB DESCRIPTION:\n${jd}`;
            } else if (activeTab === 'analyst') {
                promptTemplate = PROMPTS.ANALYST;
                userPrompt = `\n\nJOB DATA:\n${jd}`;
            } else if (activeTab === 'behavioral_fit') {
                promptTemplate = PROMPTS.JOBCOPILOT;
                userPrompt = `\n\nTASK_TYPE: BEHAVIORAL_FIT\n\nRESUME:\n${resume}\n\nJOB_DESCRIPTION:\n${jd}`;
            } else if (activeTab === 'hidden_requirements') {
                promptTemplate = PROMPTS.JOBCOPILOT;
                userPrompt = `\n\nTASK_TYPE: HIDDEN_REQUIREMENTS\n\nRESUME:\n${resume}\n\nJOB_DESCRIPTION:\n${jd}`;
            } else if (activeTab === 'checklist') {
                promptTemplate = PROMPTS.JOBCOPILOT;
                userPrompt = `\n\nTASK_TYPE: REQUIREMENT_CHECKLIST\n\nRESUME:\n${resume}\n\nJOB_DESCRIPTION:\n${jd}`;
            } else if (activeTab === 'benchmark') {
                promptTemplate = PROMPTS.BENCHMARK;
                // Find closest matching role from job description
                const matchedRole = findClosestRole(jd);
                const benchmarkData = INDUSTRY_BENCHMARKS[matchedRole];
                const benchmarkInfo = `\n\nINDUSTRY_BENCHMARK_DATA:\nROLE: ${matchedRole}\nSALARY_RANGES:\n- Junior: $${benchmarkData.salary.junior.min.toLocaleString()} - $${benchmarkData.salary.junior.max.toLocaleString()}\n- Mid: $${benchmarkData.salary.mid.min.toLocaleString()} - $${benchmarkData.salary.mid.max.toLocaleString()}\n- Senior: $${benchmarkData.salary.senior.min.toLocaleString()} - $${benchmarkData.salary.senior.max.toLocaleString()}\nTOP_SKILLS: ${benchmarkData.topSkills.join(', ')}\nMARKET_DEMAND: ${benchmarkData.demandTrend}\nGROWTH_RATE: ${benchmarkData.growthRate}%`;
                userPrompt = `\n\nRESUME:\n${resume}\n\nJOB_DESCRIPTION:\n${jd}${benchmarkInfo}`;
            } else if (activeTab === 'comparison') {
                promptTemplate = PROMPTS.COMPARISON;
                // For comparison, we need multiple resumes
                if (resumes && resumes.length > 1) {
                    const resumesText = resumes.map((r, idx) => `\n\nCANDIDATE ${idx + 1}:\n${r.content}`).join('');
                    userPrompt = `${resumesText}\n\nJOB_DESCRIPTION:\n${jd}`;
                } else {
                    setError('Comparison requires at least 2 resumes. Please upload multiple resumes.');
                    setLoading(false);
                    return;
                }
            } else if (activeTab === 'predictor') {
                promptTemplate = PROMPTS.SUCCESS_PREDICTOR;
                // For predictor, we need top performer profiles
                if (!topPerformers || topPerformers.length < 3) {
                    setError('Success Predictor requires at least 3 top performer profiles. Please add them using the manager below.');
                    setLoading(false);
                    return;
                }
                const performersText = topPerformers.map((p, idx) => `\n\nTOP_PERFORMER_${idx + 1}:\nNAME: ${p.name}\nCONTENT:\n${p.content}`).join('');
                userPrompt = `\n\nCANDIDATE_RESUME:\n${resume}\n\nJOB_DESCRIPTION:\n${jd}${performersText}`;
            }

            const fullPrompt = promptTemplate + userPrompt;

            // Generate content using either OpenAI or local model based on useLocal flag
            const result = await generateContent(fullPrompt, model, useLocal, localModel);

            setResults(prev => ({
                ...prev,
                [activeTab]: result
            }));
        } catch (err) {
            console.error('Analysis error:', err);
            setError(err.message || 'An error occurred during analysis');
        } finally {
            setLoading(false);
        }
    };

    // Special handler for cover letter generation
    const handleCoverLetterGenerate = async (companyName, tone, length) => {
        const promptTemplate = PROMPTS.COVER_LETTER;
        const userPrompt = `\n\nRESUME:\n${resume}\n\nJOB_DESCRIPTION:\n${jd}\n\nCOMPANY_NAME: ${companyName || 'Not provided'}\n\nTONE: ${tone}\n\nLENGTH: ${length}`;
        const fullPrompt = promptTemplate + userPrompt;

        const result = await generateContent(fullPrompt, model, useLocal, localModel);

        // Parse and store result
        const parsedResult = typeof result === 'string' ? JSON.parse(result) : result;
        setResults(prev => ({
            ...prev,
            cover_letter: parsedResult
        }));

        return parsedResult;
    };

    return (
        <div className="card animate-fade-in">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-text-main">🤖 AI Analysis</h3>
                    <span className={`badge text-xs ${useLocal ? 'badge-success' : 'badge-info'}`}>
                        {useLocal ? '🏠 Local Mode' : '☁️ Online Mode'}
                    </span>
                </div>
                <p className="text-text-muted text-sm">
                    {useLocal
                        ? '📴 Offline features: Review, Analysis, Checklist • Switch to Online for all features'
                        : `☁️ Using ${model} for advanced analysis • All features available`
                    }
                </p>
            </div>

            {/* Tabs and Action Button */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                {/* Tabs */}
                <div className="flex-1 overflow-x-auto">
                    <div className="flex gap-2 min-w-max pb-2">
                        {TABS.map((tab) => {
                            const isDisabled = useLocal && !tab.offline;
                            const isActive = activeTab === tab.id;

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => !isDisabled && setActiveTab(tab.id)}
                                    disabled={isDisabled}
                                    className={`px-5 py-3 text-sm font-semibold rounded-xl transition-all duration-300 whitespace-nowrap relative ${isActive
                                        ? 'bg-gradient text-white shadow-lg scale-105'
                                        : isDisabled
                                            ? 'glass border border-border text-text-dim opacity-50 cursor-not-allowed'
                                            : 'glass border border-border text-text-muted hover:text-text-main hover:border-accent hover:scale-105'
                                        }`}
                                    title={isDisabled ? 'Not available in Local mode - requires Online mode' : tab.label}
                                >
                                    <div className="flex items-center gap-2">
                                        <span>{tab.icon}</span>
                                        <span>{tab.label}</span>
                                        {tab.offline && (
                                            <span className="text-xs px-1.5 py-0.5 rounded-full bg-success/20 text-success border border-success/30">
                                                📴
                                            </span>
                                        )}
                                        {!tab.offline && (
                                            <span className="text-xs px-1.5 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30">
                                                ☁️
                                            </span>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Run Button */}
                <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className={`btn btn-primary text-base px-8 py-3 shadow-xl ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'
                        }`}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Run Analysis
                        </>
                    )}
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-6 p-4 border border-danger/30 bg-danger/10 text-danger text-sm rounded-xl flex items-start gap-3 animate-fade-in">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>{error}</span>
                </div>
            )}

            {/* Results Area */}
            <div className="min-h-[500px]">
                {activeTab === 'reviewer' && <ReviewerView data={results.reviewer} />}
                {activeTab === 'analyst' && <AnalystView data={results.analyst} />}
                {activeTab === 'benchmark' && <BenchmarkView data={results.benchmark} />}
                {activeTab === 'behavioral_fit' && <BehavioralFitView data={results.behavioral_fit} />}
                {activeTab === 'hidden_requirements' && <HiddenRequirementsView data={results.hidden_requirements} />}
                {activeTab === 'checklist' && <ChecklistView data={results.checklist} />}
                {activeTab === 'comparison' && <ComparisonView data={results.comparison} />}
                {activeTab === 'cover_letter' && (
                    <CoverLetterGenerator
                        resume={resume}
                        jd={jd}
                        model={model}
                        useLocal={useLocal}
                        localModel={localModel}
                        onGenerate={handleCoverLetterGenerate}
                    />
                )}
                {activeTab === 'predictor' && (
                    <>
                        <TopPerformerManager topPerformers={topPerformers} setTopPerformers={setTopPerformers} />
                        <PredictorView data={results.predictor} />
                    </>
                )}

                {!results[activeTab] && !loading && !error && (
                    <div className="flex flex-col items-center justify-center h-96 text-center glass rounded-2xl border-2 border-dashed border-border/50 animate-fade-in">
                        <div className="w-20 h-20 mb-6 rounded-full bg-gradient flex items-center justify-center animate-float">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h4 className="text-xl font-bold text-text-main mb-2">Ready to Analyze</h4>
                        <p className="text-text-muted max-w-md">
                            Make sure you've entered your resume and job description above, then click "Run Analysis" to get started
                        </p>
                    </div>
                )}

                {loading && (
                    <div className="flex flex-col items-center justify-center h-96 animate-fade-in">
                        <div className="w-20 h-20 mb-6 rounded-full bg-gradient flex items-center justify-center pulse-ring">
                            <svg className="animate-spin h-10 w-10 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                        <h4 className="text-xl font-bold text-text-main mb-2">Analyzing...</h4>
                        <p className="text-text-muted">AI is processing your data, this may take a moment</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
