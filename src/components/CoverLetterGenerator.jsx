import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

const CoverLetterGenerator = ({ resume, jd, model, useLocal, localModel, onGenerate }) => {
    const [companyName, setCompanyName] = useState('');
    const [tone, setTone] = useState('professional');
    const [length, setLength] = useState('medium');
    const [generatedLetter, setGeneratedLetter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGenerate = async () => {
        if (!resume || !jd) {
            setError('Please provide both resume and job description');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const result = await onGenerate(companyName, tone, length);
            setGeneratedLetter(result);
        } catch (err) {
            setError(err.message || 'Failed to generate cover letter');
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        if (generatedLetter?.cover_letter) {
            navigator.clipboard.writeText(generatedLetter.cover_letter);
            alert('Cover letter copied to clipboard!');
        }
    };

    const handleDownloadPDF = () => {
        if (!generatedLetter?.cover_letter) return;

        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 20;
        const maxWidth = pageWidth - 2 * margin;

        // Add title
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text('Cover Letter', margin, 20);

        // Add content
        doc.setFontSize(11);
        doc.setFont(undefined, 'normal');

        const lines = doc.splitTextToSize(generatedLetter.cover_letter, maxWidth);
        doc.text(lines, margin, 35);

        // Save PDF
        doc.save('cover-letter.pdf');
    };

    const toneOptions = [
        { value: 'professional', label: 'Professional', icon: '💼', desc: 'Formal and polished' },
        { value: 'enthusiastic', label: 'Enthusiastic', icon: '🎯', desc: 'Energetic and passionate' },
        { value: 'creative', label: 'Creative', icon: '🎨', desc: 'Unique and memorable' }
    ];

    const lengthOptions = [
        { value: 'short', label: 'Short', words: '200-250 words', desc: '3 paragraphs' },
        { value: 'medium', label: 'Medium', words: '300-400 words', desc: '4 paragraphs' },
        { value: 'long', label: 'Long', words: '450-550 words', desc: '5 paragraphs' }
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="card">
                <h3 className="text-2xl font-bold text-text-main mb-2">📝 Cover Letter Generator</h3>
                <p className="text-text-muted text-sm">
                    Generate a personalized, AI-powered cover letter tailored to your resume and the job description
                </p>
            </div>

            {/* Configuration */}
            <div className="card">
                <h4 className="text-lg font-bold text-text-main mb-4">Configuration</h4>

                <div className="space-y-6">
                    {/* Company Name */}
                    <div>
                        <label className="text-sm font-semibold text-text-main mb-2 block">
                            Company Name (Optional)
                        </label>
                        <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="e.g., Google, Microsoft, Startup Inc."
                            className="w-full p-3 rounded-xl border border-border bg-bg-secondary text-text-main focus:ring-2 focus:ring-accent/50 focus:outline-none"
                        />
                    </div>

                    {/* Tone Selection */}
                    <div>
                        <label className="text-sm font-semibold text-text-main mb-3 block">
                            Tone
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {toneOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => setTone(option.value)}
                                    className={`p-4 rounded-xl border-2 transition-all text-left ${tone === option.value
                                            ? 'border-accent bg-accent/10'
                                            : 'border-border glass hover:border-accent/50'
                                        }`}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-2xl">{option.icon}</span>
                                        <span className="font-semibold text-text-main">{option.label}</span>
                                    </div>
                                    <p className="text-xs text-text-muted">{option.desc}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Length Selection */}
                    <div>
                        <label className="text-sm font-semibold text-text-main mb-3 block">
                            Length
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {lengthOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => setLength(option.value)}
                                    className={`p-4 rounded-xl border-2 transition-all text-left ${length === option.value
                                            ? 'border-accent bg-accent/10'
                                            : 'border-border glass hover:border-accent/50'
                                        }`}
                                >
                                    <div className="font-semibold text-text-main mb-1">{option.label}</div>
                                    <div className="text-xs text-text-muted mb-1">{option.words}</div>
                                    <div className="text-xs text-text-dim">{option.desc}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Generate Button */}
                    <button
                        onClick={handleGenerate}
                        disabled={loading || !resume || !jd}
                        className="btn btn-primary w-full text-lg py-4"
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                Generating...
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Generate Cover Letter
                            </>
                        )}
                    </button>

                    {error && (
                        <div className="p-4 bg-danger/10 border border-danger/30 rounded-xl text-danger text-sm">
                            {error}
                        </div>
                    )}
                </div>
            </div>

            {/* Generated Letter */}
            {generatedLetter && (
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h4 className="text-lg font-bold text-text-main">Generated Cover Letter</h4>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="badge badge-info text-xs">
                                    {generatedLetter.word_count} words
                                </span>
                                <span className="badge badge-success text-xs">
                                    {generatedLetter.tone_used}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleCopy}
                                className="btn btn-secondary text-sm"
                                title="Copy to clipboard"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Copy
                            </button>
                            <button
                                onClick={handleDownloadPDF}
                                className="btn btn-primary text-sm"
                                title="Download as PDF"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                PDF
                            </button>
                        </div>
                    </div>

                    {/* Letter Content */}
                    <div className="glass border border-border rounded-xl p-6 mb-4">
                        <div className="prose prose-sm max-w-none text-text-main whitespace-pre-wrap">
                            {generatedLetter.cover_letter}
                        </div>
                    </div>

                    {/* Key Highlights */}
                    {generatedLetter.key_highlights && generatedLetter.key_highlights.length > 0 && (
                        <div className="glass border border-border rounded-xl p-4 mb-4">
                            <h5 className="text-sm font-semibold text-text-main mb-3">Key Highlights</h5>
                            <ul className="space-y-2">
                                {generatedLetter.key_highlights.map((highlight, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-text-main">
                                        <span className="text-accent flex-shrink-0">✓</span>
                                        <span>{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Suggestions */}
                    {generatedLetter.suggestions && generatedLetter.suggestions.length > 0 && (
                        <div className="glass border border-border rounded-xl p-4">
                            <h5 className="text-sm font-semibold text-text-main mb-3 flex items-center gap-2">
                                <svg className="w-4 h-4 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                Suggestions for Improvement
                            </h5>
                            <ul className="space-y-2">
                                {generatedLetter.suggestions.map((suggestion, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-text-muted">
                                        <span className="text-warning flex-shrink-0">•</span>
                                        <span>{suggestion}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {/* Info Box */}
            {!generatedLetter && !loading && (
                <div className="glass border border-border rounded-xl p-6">
                    <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="text-sm text-text-muted">
                            <p className="font-semibold text-text-main mb-2">Tips for Best Results:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Ensure your resume is complete and up-to-date</li>
                                <li>Provide a detailed job description</li>
                                <li>Add the company name for more personalization</li>
                                <li>Choose the tone that matches the company culture</li>
                                <li>Review and customize the generated letter before sending</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CoverLetterGenerator;
