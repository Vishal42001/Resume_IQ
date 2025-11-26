import React, { useState } from 'react';
import { parseFile } from '../utils/fileParser';

const InputSection = ({ resume, setResume, jd, setJd, resumes, setResumes }) => {
    const [parsing, setParsing] = useState(false);
    const [parseError, setParseError] = useState(null);
    const [uploadMode, setUploadMode] = useState('single'); // 'single' or 'multiple'

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setParsing(true);
        setParseError(null);

        try {
            const text = await parseFile(file);
            setResume(text);
        } catch (err) {
            setParseError(err.message);
        } finally {
            setParsing(false);
        }
    };

    const handleMultipleFileUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        if (files.length > 5) {
            setParseError('Maximum 5 resumes allowed for comparison');
            return;
        }

        if (files.length < 2) {
            setParseError('Please select at least 2 resumes for comparison');
            return;
        }

        setParsing(true);
        setParseError(null);

        try {
            const parsedResumes = [];
            for (const file of files) {
                const text = await parseFile(file);
                parsedResumes.push({
                    name: file.name,
                    content: text,
                    id: `${file.name}-${Date.now()}-${Math.random()}`
                });
            }
            setResumes(parsedResumes);
        } catch (err) {
            setParseError(err.message);
        } finally {
            setParsing(false);
        }
    };

    const removeResume = (id) => {
        setResumes(resumes.filter(r => r.id !== id));
    };

    return (
        <div className="card animate-fade-in">
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-text-main mb-2">📄 Input Your Data</h3>
                <p className="text-text-muted text-sm">Upload or paste your resume and the job description you're targeting</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Resume Input */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                        <label className="text-sm font-semibold text-text-main flex items-center gap-2">
                            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Resume(s)
                        </label>
                    </div>

                    {/* Mode Toggle */}
                    <div className="glass border border-border rounded-xl p-3 mb-4">
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-medium text-text-muted">Upload Mode:</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setUploadMode('single')}
                                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${uploadMode === 'single'
                                            ? 'bg-accent text-white'
                                            : 'glass border border-border text-text-muted hover:text-text-main'
                                        }`}
                                >
                                    Single Resume
                                </button>
                                <button
                                    onClick={() => setUploadMode('multiple')}
                                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${uploadMode === 'multiple'
                                            ? 'bg-accent text-white'
                                            : 'glass border border-border text-text-muted hover:text-text-main'
                                        }`}
                                >
                                    Multiple (Comparison)
                                </button>
                            </div>
                        </div>
                    </div>

                    {parseError && (
                        <div className="p-3 bg-danger/10 border border-danger/30 rounded-lg text-danger text-xs">
                            {parseError}
                        </div>
                    )}

                    {/* Single Resume Mode */}
                    {uploadMode === 'single' && (
                        <>
                            <div className="flex items-center justify-between">
                                <p className="text-xs text-text-muted">Upload a PDF/DOCX file or paste text below</p>
                                <div className="relative">
                                    <input
                                        type="file"
                                        id="resume-upload"
                                        accept=".pdf,.docx"
                                        className="hidden"
                                        onChange={handleFileUpload}
                                    />
                                    <label
                                        htmlFor="resume-upload"
                                        className={`btn btn-primary text-xs ${parsing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        {parsing ? 'Parsing...' : 'Upload File'}
                                    </label>
                                </div>
                            </div>

                            <textarea
                                id="resume"
                                className="w-full h-80 p-4 rounded-xl font-mono text-sm resize-none focus:ring-2 focus:ring-accent/50"
                                placeholder="Paste your resume content here or upload a PDF/DOCX file..."
                                value={resume}
                                onChange={(e) => setResume(e.target.value)}
                            />
                            <p className="text-xs text-text-muted">
                                {resume.length > 0 ? `${resume.length} characters` : 'No content yet'}
                            </p>
                        </>
                    )}

                    {/* Multiple Resume Mode */}
                    {uploadMode === 'multiple' && (
                        <>
                            <div className="flex items-center justify-between">
                                <p className="text-xs text-text-muted">Upload 2-5 PDF/DOCX files for comparison</p>
                                <div className="relative">
                                    <input
                                        type="file"
                                        id="multiple-resume-upload"
                                        accept=".pdf,.docx"
                                        multiple
                                        className="hidden"
                                        onChange={handleMultipleFileUpload}
                                    />
                                    <label
                                        htmlFor="multiple-resume-upload"
                                        className={`btn btn-primary text-xs ${parsing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        {parsing ? 'Parsing...' : 'Upload Files'}
                                    </label>
                                </div>
                            </div>

                            {/* Multiple Resumes List */}
                            {resumes && resumes.length > 0 ? (
                                <div className="glass border border-border rounded-xl p-4 space-y-2 min-h-[320px]">
                                    <div className="text-xs font-semibold text-text-main mb-3 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Uploaded Resumes ({resumes.length})
                                    </div>
                                    {resumes.map((r, idx) => (
                                        <div key={r.id} className="flex items-center justify-between p-3 glass border border-border rounded-lg hover:border-accent/50 transition-all">
                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                                <span className="badge badge-info text-xs flex-shrink-0">#{idx + 1}</span>
                                                <span className="text-sm text-text-main truncate font-medium">{r.name}</span>
                                            </div>
                                            <button
                                                onClick={() => removeResume(r.id)}
                                                className="text-danger hover:text-danger/80 transition-colors flex-shrink-0 p-1 hover:bg-danger/10 rounded"
                                                title="Remove"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="glass border-2 border-dashed border-border/50 rounded-xl p-8 min-h-[320px] flex flex-col items-center justify-center text-center">
                                    <svg className="w-16 h-16 text-text-dim mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p className="text-text-muted text-sm mb-2">No resumes uploaded yet</p>
                                    <p className="text-text-dim text-xs">Click "Upload Files" to select 2-5 resumes</p>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Job Description Input */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-text-main flex items-center gap-2" htmlFor="jd">
                            <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Job Description
                        </label>
                    </div>

                    <textarea
                        id="jd"
                        className="w-full h-[500px] p-4 rounded-xl font-mono text-sm resize-none focus:ring-2 focus:ring-secondary/50"
                        placeholder="Paste the target job description here..."
                        value={jd}
                        onChange={(e) => setJd(e.target.value)}
                    />
                    <p className="text-xs text-text-muted">
                        {jd.length > 0 ? `${jd.length} characters` : 'No content yet'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InputSection;

