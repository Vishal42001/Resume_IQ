import React, { useState } from 'react';
import { parseFile } from '../utils/fileParser';

const InputSection = ({ resume, setResume, jd, setJd }) => {
    const [parsing, setParsing] = useState(false);
    const [parseError, setParseError] = useState(null);

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

    return (
        <div className="card animate-fade-in">
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-text-main mb-2">📄 Input Your Data</h3>
                <p className="text-text-muted text-sm">Upload or paste your resume and the job description you're targeting</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Resume Input */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-text-main flex items-center gap-2" htmlFor="resume">
                            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Your Resume
                        </label>
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
                                className={`btn btn-secondary text-xs ${parsing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                {parsing ? 'Parsing...' : 'Upload File'}
                            </label>
                        </div>
                    </div>

                    {parseError && (
                        <div className="p-3 bg-danger/10 border border-danger/30 rounded-lg text-danger text-xs">
                            {parseError}
                        </div>
                    )}

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
                        className="w-full h-80 p-4 rounded-xl font-mono text-sm resize-none focus:ring-2 focus:ring-secondary/50"
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
