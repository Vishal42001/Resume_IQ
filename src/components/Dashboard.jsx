import React, { useState, useEffect } from 'react';
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
import ATSScoreView from './ATSScoreView';
import { INDUSTRY_BENCHMARKS, findClosestRole } from '../data/industryData';

const FEATURE_MAP = {
    'reviewer': { component: ReviewerView, prompt: 'REVIEWER', label: 'Review' },
    'ats_score': { component: ATSScoreView, prompt: 'ATS_SCORE', label: 'ATS Score' },
    'analyst': { component: AnalystView, prompt: 'ANALYST', label: 'Analysis' },
    'benchmarking': { component: BenchmarkView, prompt: 'BENCHMARK', label: 'Benchmarking' },
    'comparison': { component: ComparisonView, prompt: 'COMPARISON', label: 'Compare Candidates' },
    'predictor': { component: PredictorView, prompt: 'SUCCESS_PREDICTOR', label: 'Success Predictor' },
    'cover_letter': { component: CoverLetterGenerator, prompt: 'COVER_LETTER', label: 'Cover Letter', special: true },
    'behavioral_fit': { component: BehavioralFitView, prompt: 'JOBCOPILOT', taskType: 'BEHAVIORAL_FIT', label: 'Behavioral Fit' },
    'hidden_requirements': { component: HiddenRequirementsView, prompt: 'JOBCOPILOT', taskType: 'HIDDEN_REQUIREMENTS', label: 'Hidden Requirements' },
    'checklist': { component: ChecklistView, prompt: 'JOBCOPILOT', taskType: 'REQUIREMENT_CHECKLIST', label: 'Checklist' },
};

const Dashboard = ({ resume, jd, model, useLocal, localModel, resumes, topPerformers, setTopPerformers, selectedFeatures = [] }) => {
    const [activeTab, setActiveTab] = useState(selectedFeatures[0] || 'reviewer');
    const [loading, setLoading] = useState({});
    const [results, setResults] = useState({});
    const [error, setError] = useState(null);

    // Auto-run analysis for all selected features on mount
    useEffect(() => {
        if (selectedFeatures.length > 0) {
            selectedFeatures.forEach(featureId => {
                handleAnalyze(featureId);
            });
        }
    }, []); // Run once on mount

    const handleAnalyze = async (featureId) => {
        if (!resume || !jd) {
            setError("Please provide both Resume and Job Description.");
            return;
        }

        setLoading(prev => ({ ...prev, [featureId]: true }));
        setError(null);

        try {
            const feature = FEATURE_MAP[featureId];
            if (!feature) return;

            let promptTemplate = PROMPTS[feature.prompt];
            let userPrompt = '';

            // Build prompt based on feature type
            if (feature.taskType) {
                // JobCopilot features
                userPrompt = `\\n\\nTASK_TYPE: ${feature.taskType}\\n\\nRESUME:\\n${resume}\\n\\nJOB_DESCRIPTION:\\n${jd}`;
            } else if (featureId === 'benchmarking') {
                const matchedRole = findClosestRole(jd);
                const benchmarkData = INDUSTRY_BENCHMARKS[matchedRole];
                const benchmarkInfo = `\\n\\nINDUSTRY_BENCHMARK_DATA:\\nROLE: ${matchedRole}\\nSALARY_RANGES:\\n- Junior: $${benchmarkData.salary.junior.min.toLocaleString()} - $${benchmarkData.salary.junior.max.toLocaleString()}\\n- Mid: $${benchmarkData.salary.mid.min.toLocaleString()} - $${benchmarkData.salary.mid.max.toLocaleString()}\\n- Senior: $${benchmarkData.salary.senior.min.toLocaleString()} - $${benchmarkData.salary.senior.max.toLocaleString()}\\nTOP_SKILLS: ${benchmarkData.topSkills.join(', ')}\\nMARKET_DEMAND: ${benchmarkData.demandTrend}\\nGROWTH_RATE: ${benchmarkData.growthRate}%`;
                userPrompt = `\\n\\nRESUME:\\n${resume}\\n\\nJOB_DESCRIPTION:\\n${jd}${benchmarkInfo}`;
            } else if (featureId === 'comparison') {
                if (resumes && resumes.length > 1) {
                    const resumesText = resumes.map((r, idx) => `\\n\\nCANDIDATE ${idx + 1}:\\n${r.content}`).join('');
                    userPrompt = `${resumesText}\\n\\nJOB_DESCRIPTION:\\n${jd}`;
                } else {
                    setError('Comparison requires at least 2 resumes.');
                    setLoading(prev => ({ ...prev, [featureId]: false }));
                    return;
                }
            } else if (featureId === 'predictor') {
                if (!topPerformers || topPerformers.length < 3) {
                    setError('Success Predictor requires at least 3 top performer profiles.');
                    setLoading(prev => ({ ...prev, [featureId]: false }));
                    return;
                }
                const performersText = topPerformers.map((p, idx) => `\\n\\nTOP_PERFORMER_${idx + 1}:\\nNAME: ${p.name}\\nCONTENT:\\n${p.content}`).join('');
                userPrompt = `\\n\\nCANDIDATE_RESUME:\\n${resume}\\n\\nJOB_DESCRIPTION:\\n${jd}${performersText}`;
            } else if (featureId === 'analyst') {
                userPrompt = `\\n\\nJOB_DATA:\\n${jd}`;
            } else {
                // Default: reviewer, ats_score
                userPrompt = `\\n\\nRESUME:\\n${resume}\\n\\nJOB_DESCRIPTION:\\n${jd}`;
            }

            const fullPrompt = promptTemplate + userPrompt;
            const result = await generateContent(fullPrompt, model, useLocal, localModel);

            setResults(prev => ({
                ...prev,
                [featureId]: result
            }));
        } catch (err) {
            console.error('Analysis error:', err);
            setError(err.message || 'An error occurred during analysis');
        } finally {
            setLoading(prev => ({ ...prev, [featureId]: false }));
        }
    };

    // Special handler for cover letter
    const handleCoverLetterGenerate = async (companyName, tone, length) => {
        const promptTemplate = PROMPTS.COVER_LETTER;
        const userPrompt = `\\n\\nRESUME:\\n${resume}\\n\\nJOB_DESCRIPTION:\\n${jd}\\n\\nCOMPANY_NAME: ${companyName || 'Not provided'}\\n\\nTONE: ${tone}\\n\\nLENGTH: ${length}`;
        const fullPrompt = promptTemplate + userPrompt;

        const result = await generateContent(fullPrompt, model, useLocal, localModel);
        const parsedResult = typeof result === 'string' ? JSON.parse(result) : result;

        setResults(prev => ({
            ...prev,
            cover_letter: parsedResult
        }));

        return parsedResult;
    };

    const filteredFeatures = selectedFeatures.length > 0
        ? selectedFeatures.filter(id => FEATURE_MAP[id])
        : Object.keys(FEATURE_MAP);

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-12 text-center animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-black text-text-main mb-4">
                    AI Analysis Results
                </h2>
                <p className="text-lg text-text-muted max-w-2xl mx-auto">
                    {selectedFeatures.length > 0
                        ? `Running ${selectedFeatures.length} analysis feature${selectedFeatures.length > 1 ? 's' : ''}`
                        : 'Comprehensive AI-powered resume analysis'
                    }
                </p>
            </div>

            {/* Tabs */}
            <div className="mb-8">
                <div className="flex flex-wrap gap-3 justify-center">
                    {filteredFeatures.map((featureId) => {
                        const feature = FEATURE_MAP[featureId];
                        if (!feature) return null;

                        const isActive = activeTab === featureId;
                        const isLoading = loading[featureId];
                        const hasResult = results[featureId];

                        return (
                            <button
                                key={featureId}
                                onClick={() => setActiveTab(featureId)}
                                className={`px-6 py-3 rounded-xl font-semibold transition-all ${isActive
                                        ? 'bg-gradient text-white shadow-lg scale-105'
                                        : 'card hover:border-accent'
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <span>{feature.label}</span>
                                    {isLoading && (
                                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    )}
                                    {!isLoading && hasResult && (
                                        <span className="text-success">✓</span>
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>
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
                {(() => {
                    const feature = FEATURE_MAP[activeTab];
                    if (!feature) return null;

                    const Component = feature.component;
                    const isLoading = loading[activeTab];
                    const result = results[activeTab];

                    if (activeTab === 'cover_letter') {
                        return (
                            <CoverLetterGenerator
                                resume={resume}
                                jd={jd}
                                model={model}
                                useLocal={useLocal}
                                localModel={localModel}
                                onGenerate={handleCoverLetterGenerate}
                            />
                        );
                    }

                    if (activeTab === 'predictor') {
                        return (
                            <>
                                <TopPerformerManager topPerformers={topPerformers} setTopPerformers={setTopPerformers} />
                                <Component data={result} />
                            </>
                        );
                    }

                    if (isLoading) {
                        return (
                            <div className="flex flex-col items-center justify-center h-96 animate-fade-in">
                                <div className="w-20 h-20 mb-6 rounded-full bg-gradient flex items-center justify-center pulse-ring">
                                    <svg className="animate-spin h-10 w-10 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold text-text-main mb-2">Analyzing...</h4>
                                <p className="text-text-muted">AI is processing your data for {feature.label}</p>
                            </div>
                        );
                    }

                    return <Component data={result} />;
                })()}
            </div>
        </div>
    );
};

export default Dashboard;
