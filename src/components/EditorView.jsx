import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';

const EditorView = ({ data }) => {
    if (!data) return null;

    // State for editable content
    const [resumeData, setResumeData] = useState(data);
    const resumeRef = useRef(null);

    // Update handlers
    const updateField = (field, value) => {
        setResumeData(prev => ({ ...prev, [field]: value }));
    };

    const updateContact = (field, value) => {
        setResumeData(prev => ({
            ...prev,
            contact: { ...prev.contact, [field]: value }
        }));
    };

    const updateExperience = (index, field, value) => {
        const newExperience = [...resumeData.experience];
        newExperience[index] = { ...newExperience[index], [field]: value };
        setResumeData(prev => ({ ...prev, experience: newExperience }));
    };

    const updateAchievement = (expIndex, achIndex, value) => {
        const newExperience = [...resumeData.experience];
        const newAchievements = [...newExperience[expIndex].achievements];
        newAchievements[achIndex] = value;
        newExperience[expIndex] = { ...newExperience[expIndex], achievements: newAchievements };
        setResumeData(prev => ({ ...prev, experience: newExperience }));
    };

    // Download as PDF
    const downloadPDF = async () => {
        try {
            const element = resumeRef.current;
            if (!element) {
                alert('Resume preview not found. Please try again.');
                return;
            }

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

            // Generate filename
            const fileName = resumeData.full_name ?
                resumeData.full_name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '') :
                'resume';

            // Use blob and create download link manually
            const pdfBlob = pdf.output('blob');
            const url = URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${fileName}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('PDF download error:', error);
            alert('Failed to generate PDF. Please try again.');
        }
    };

    // Download as DOCX
    const downloadDOCX = async () => {
        try {
            const doc = new Document({
                sections: [{
                    properties: {},
                    children: [
                        // Name
                        new Paragraph({
                            text: resumeData.full_name || '',
                            heading: HeadingLevel.HEADING_1,
                            alignment: AlignmentType.CENTER,
                        }),
                        // Contact Info
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({
                                    text: [
                                        resumeData.contact?.email,
                                        resumeData.contact?.phone,
                                        resumeData.contact?.location
                                    ].filter(Boolean).join(' | '),
                                    size: 20,
                                }),
                            ],
                        }),
                        new Paragraph({ text: '' }), // Spacing

                        // Professional Summary
                        new Paragraph({
                            text: 'PROFESSIONAL SUMMARY',
                            heading: HeadingLevel.HEADING_2,
                        }),
                        new Paragraph({
                            text: resumeData.professional_summary || '',
                        }),
                        new Paragraph({ text: '' }),

                        // Experience
                        new Paragraph({
                            text: 'EXPERIENCE',
                            heading: HeadingLevel.HEADING_2,
                        }),
                        ...(resumeData.experience || []).flatMap(exp => [
                            new Paragraph({
                                children: [
                                    new TextRun({ text: exp.title || '', bold: true }),
                                    new TextRun({ text: ` - ${exp.company || ''}` }),
                                ],
                            }),
                            new Paragraph({
                                children: [
                                    new TextRun({ text: `${exp.location || ''} | ${exp.dates || ''}`, italics: true }),
                                ],
                            }),
                            ...(exp.achievements || []).map(ach =>
                                new Paragraph({
                                    text: `• ${ach}`,
                                    bullet: { level: 0 },
                                })
                            ),
                            new Paragraph({ text: '' }),
                        ]),

                        // Skills
                        new Paragraph({
                            text: 'SKILLS',
                            heading: HeadingLevel.HEADING_2,
                        }),
                        ...(resumeData.skills ? [
                            resumeData.skills.technical?.length > 0 && new Paragraph({
                                text: `Technical: ${resumeData.skills.technical.join(', ')}`,
                            }),
                            resumeData.skills.tools?.length > 0 && new Paragraph({
                                text: `Tools: ${resumeData.skills.tools.join(', ')}`,
                            }),
                        ].filter(Boolean) : []),
                        new Paragraph({ text: '' }),

                        // Education
                        new Paragraph({
                            text: 'EDUCATION',
                            heading: HeadingLevel.HEADING_2,
                        }),
                        ...(resumeData.education || []).flatMap(edu => [
                            new Paragraph({
                                children: [
                                    new TextRun({ text: edu.degree || '', bold: true }),
                                ],
                            }),
                            new Paragraph({
                                text: `${edu.institution || ''} - ${edu.graduation_date || ''}`,
                            }),
                        ]),
                    ],
                }],
            });

            const blob = await Packer.toBlob(doc);

            // Generate filename
            const fileName = resumeData.full_name ?
                resumeData.full_name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '') :
                'resume';

            // Use native browser download with proper MIME type
            const url = URL.createObjectURL(new Blob([blob], {
                type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            }));
            const link = document.createElement('a');
            link.href = url;
            link.download = `${fileName}.docx`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('DOCX download error:', error);
            alert('Failed to generate DOCX. Please try again.');
        }
    };

    // Copy to clipboard
    const copyToClipboard = () => {
        const text = resumeRef.current.innerText;
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="animate-fade-in space-y-6">
            {/* Header with actions */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-text-main">Optimized Resume</h2>
                    <p className="text-sm text-text-muted mt-1">Edit the content below and download when ready</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={copyToClipboard}
                        className="btn btn-secondary text-xs"
                        title="Copy to clipboard"
                    >
                        📋 Copy
                    </button>
                    <button
                        onClick={downloadDOCX}
                        className="btn btn-secondary text-xs"
                        title="Download as DOCX"
                    >
                        📄 DOCX
                    </button>
                    <button
                        onClick={downloadPDF}
                        className="btn btn-primary text-xs"
                        title="Download as PDF"
                    >
                        📥 PDF
                    </button>
                </div>
            </div>

            {/* Resume Preview and Editor */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Editable Form */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-text-main mb-4">Edit Content</h3>

                    {/* Name */}
                    <div>
                        <label className="label">Full Name</label>
                        <input
                            type="text"
                            className="input"
                            value={resumeData.full_name || ''}
                            onChange={(e) => updateField('full_name', e.target.value)}
                        />
                    </div>

                    {/* Contact */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="label">Email</label>
                            <input
                                type="email"
                                className="input"
                                value={resumeData.contact?.email || ''}
                                onChange={(e) => updateContact('email', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="label">Phone</label>
                            <input
                                type="text"
                                className="input"
                                value={resumeData.contact?.phone || ''}
                                onChange={(e) => updateContact('phone', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="label">Location</label>
                            <input
                                type="text"
                                className="input"
                                value={resumeData.contact?.location || ''}
                                onChange={(e) => updateContact('location', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="label">LinkedIn</label>
                            <input
                                type="text"
                                className="input"
                                value={resumeData.contact?.linkedin || ''}
                                onChange={(e) => updateContact('linkedin', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Professional Summary */}
                    <div>
                        <label className="label">Professional Summary</label>
                        <textarea
                            className="textarea"
                            rows="4"
                            value={resumeData.professional_summary || ''}
                            onChange={(e) => updateField('professional_summary', e.target.value)}
                        />
                    </div>

                    {/* Experience */}
                    <div>
                        <label className="label">Experience</label>
                        {(resumeData.experience || []).map((exp, expIndex) => (
                            <div key={expIndex} className="card mb-3 space-y-2">
                                <input
                                    type="text"
                                    className="input text-sm"
                                    placeholder="Job Title"
                                    value={exp.title || ''}
                                    onChange={(e) => updateExperience(expIndex, 'title', e.target.value)}
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="text"
                                        className="input text-sm"
                                        placeholder="Company"
                                        value={exp.company || ''}
                                        onChange={(e) => updateExperience(expIndex, 'company', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        className="input text-sm"
                                        placeholder="Dates"
                                        value={exp.dates || ''}
                                        onChange={(e) => updateExperience(expIndex, 'dates', e.target.value)}
                                    />
                                </div>
                                {(exp.achievements || []).map((ach, achIndex) => (
                                    <textarea
                                        key={achIndex}
                                        className="textarea text-sm"
                                        rows="2"
                                        placeholder="Achievement"
                                        value={ach}
                                        onChange={(e) => updateAchievement(expIndex, achIndex, e.target.value)}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Live Preview */}
                <div>
                    <h3 className="text-lg font-semibold text-text-main mb-4">Preview</h3>
                    <div
                        ref={resumeRef}
                        className="card bg-white p-10 shadow-lg"
                        style={{
                            minHeight: '1000px',
                            maxWidth: '210mm',
                            fontFamily: 'Arial, sans-serif'
                        }}
                    >
                        {/* Name */}
                        <h1 className="text-4xl font-bold text-center text-gray-900 mb-1" style={{ letterSpacing: '0.5px' }}>
                            {resumeData.full_name || 'Your Name'}
                        </h1>

                        {/* Contact */}
                        <div className="text-center text-sm text-gray-600 mb-6 pb-4 border-b border-gray-300">
                            {resumeData.contact?.email && <span>{resumeData.contact.email}</span>}
                            {resumeData.contact?.phone && <span className="mx-2">•</span>}
                            {resumeData.contact?.phone && <span>{resumeData.contact.phone}</span>}
                            {resumeData.contact?.location && <span className="mx-2">•</span>}
                            {resumeData.contact?.location && <span>{resumeData.contact.location}</span>}
                            {resumeData.contact?.linkedin && (
                                <>
                                    <br />
                                    <span className="text-blue-600">{resumeData.contact.linkedin}</span>
                                </>
                            )}
                        </div>

                        {/* Professional Summary */}
                        {resumeData.professional_summary && (
                            <div className="mb-6">
                                <h2 className="text-base font-bold text-gray-900 uppercase mb-2" style={{ borderBottom: '2px solid #333', paddingBottom: '4px' }}>
                                    Professional Summary
                                </h2>
                                <p className="text-sm text-gray-800 leading-relaxed text-justify">
                                    {resumeData.professional_summary}
                                </p>
                            </div>
                        )}

                        {/* Experience */}
                        {resumeData.experience && resumeData.experience.length > 0 && (
                            <div className="mb-6">
                                <h2 className="text-base font-bold text-gray-900 uppercase mb-3" style={{ borderBottom: '2px solid #333', paddingBottom: '4px' }}>
                                    Experience
                                </h2>
                                {resumeData.experience.map((exp, idx) => (
                                    <div key={idx} className="mb-4">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-base">{exp.title}</h3>
                                                <p className="text-sm text-gray-700 italic">{exp.company}{exp.location && `, ${exp.location}`}</p>
                                            </div>
                                            <div className="text-sm text-gray-600 italic">
                                                {exp.dates}
                                            </div>
                                        </div>
                                        <ul className="mt-2 space-y-1.5 ml-5">
                                            {(exp.achievements || []).map((ach, achIdx) => (
                                                <li key={achIdx} className="text-sm text-gray-800 leading-relaxed" style={{ listStyleType: 'disc' }}>
                                                    {ach}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Skills */}
                        {resumeData.skills && (
                            <div className="mb-6">
                                <h2 className="text-base font-bold text-gray-900 uppercase mb-2" style={{ borderBottom: '2px solid #333', paddingBottom: '4px' }}>
                                    Skills
                                </h2>
                                <div className="text-sm text-gray-800 space-y-1.5">
                                    {resumeData.skills.technical && resumeData.skills.technical.length > 0 && (
                                        <p><strong>Technical:</strong> {resumeData.skills.technical.join(', ')}</p>
                                    )}
                                    {resumeData.skills.tools && resumeData.skills.tools.length > 0 && (
                                        <p><strong>Tools & Technologies:</strong> {resumeData.skills.tools.join(', ')}</p>
                                    )}
                                    {resumeData.skills.soft_skills && resumeData.skills.soft_skills.length > 0 && (
                                        <p><strong>Soft Skills:</strong> {resumeData.skills.soft_skills.join(', ')}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Education */}
                        {resumeData.education && resumeData.education.length > 0 && (
                            <div className="mb-6">
                                <h2 className="text-base font-bold text-gray-900 uppercase mb-2" style={{ borderBottom: '2px solid #333', paddingBottom: '4px' }}>
                                    Education
                                </h2>
                                {resumeData.education.map((edu, idx) => (
                                    <div key={idx} className="mb-2">
                                        <div className="flex justify-between items-baseline">
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-sm">{edu.degree}</h3>
                                                <p className="text-sm text-gray-700">{edu.institution}</p>
                                            </div>
                                            <p className="text-sm text-gray-600 italic">{edu.graduation_date}</p>
                                        </div>
                                        {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                                        {edu.honors && <p className="text-sm text-gray-600 italic">{edu.honors}</p>}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Projects */}
                        {resumeData.projects && resumeData.projects.length > 0 && (
                            <div className="mb-6">
                                <h2 className="text-base font-bold text-gray-900 uppercase mb-2" style={{ borderBottom: '2px solid #333', paddingBottom: '4px' }}>
                                    Projects
                                </h2>
                                {resumeData.projects.map((proj, idx) => (
                                    <div key={idx} className="mb-2">
                                        <h3 className="font-bold text-gray-900 text-sm">{proj.name}</h3>
                                        <p className="text-sm text-gray-800 leading-relaxed">{proj.description}</p>
                                        {proj.link && (
                                            <p className="text-sm text-blue-600">{proj.link}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Certifications */}
                        {resumeData.certifications && resumeData.certifications.length > 0 && (
                            <div>
                                <h2 className="text-base font-bold text-gray-900 uppercase mb-2" style={{ borderBottom: '2px solid #333', paddingBottom: '4px' }}>
                                    Certifications
                                </h2>
                                <ul className="space-y-1 ml-5">
                                    {resumeData.certifications.map((cert, idx) => (
                                        <li key={idx} className="text-sm text-gray-800" style={{ listStyleType: 'disc' }}>{cert}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditorView;
