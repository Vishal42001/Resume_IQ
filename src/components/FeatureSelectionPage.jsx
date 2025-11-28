import React, { useState } from 'react';

const FEATURES = [
    {
        id: 'reviewer',
        name: 'Review',
        description: 'Get comprehensive resume evaluation and scoring',
        icon: '✓',
        offline: true
    },
    {
        id: 'ats_score',
        name: 'ATS Score',
        description: 'Check ATS compatibility and optimization',
        icon: '🎯',
        offline: true
    },
    {
        id: 'analyst',
        name: 'Analysis',
        description: 'Detailed job and company analysis',
        icon: '📊',
        offline: true
    },
    {
        id: 'benchmarking',
        name: 'Benchmarking',
        description: 'Compare against industry standards',
        icon: '📈',
        offline: false
    },
    {
        id: 'comparison',
        name: 'Compare Candidates',
        description: 'Side-by-side resume comparison',
        icon: '📊',
        offline: false
    },
    {
        id: 'predictor',
        name: 'Success Predictor',
        description: 'Predict hiring success probability',
        icon: '🔮',
        offline: false
    },
    {
        id: 'cover_letter',
        name: 'Cover Letter',
        description: 'Generate tailored cover letters',
        icon: '📝',
        offline: false
    },
    {
        id: 'behavioral_fit',
        name: 'Behavioral Fit',
        description: 'Analyze cultural and behavioral alignment',
        icon: '🎯',
        offline: false
    },
    {
        id: 'checklist',
        name: 'Checklist',
        description: 'Requirement checklist mapping',
        icon: '☑️',
        offline: true
    }
];

const FeatureSelectionPage = ({ onContinue, useLocal }) => {
    const [selectedFeatures, setSelectedFeatures] = useState([]);

    const toggleFeature = (featureId) => {
        setSelectedFeatures(prev =>
            prev.includes(featureId)
                ? prev.filter(id => id !== featureId)
                : [...prev, featureId]
        );
    };

    const selectAll = () => {
        const availableFeatures = FEATURES
            .filter(f => !useLocal || f.offline)
            .map(f => f.id);
        setSelectedFeatures(availableFeatures);
    };

    const clearAll = () => {
        setSelectedFeatures([]);
    };

    const handleContinue = () => {
        if (selectedFeatures.length > 0) {
            onContinue(selectedFeatures);
        }
    };

    const availableCount = FEATURES.filter(f => !useLocal || f.offline).length;

    return (
        <div className="min-h-screen py-20">
            <div className="container">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12 animate-fade-in">
                        <h2 className="text-4xl md:text-5xl font-black text-text-main mb-4">
                            AI Analysis Selection
                        </h2>
                        <p className="text-lg text-text-muted max-w-2xl mx-auto">
                            Choose one or more AI features to apply to your input. Select all or pick specific analysis
                        </p>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={selectAll}
                                className="btn btn-secondary text-sm"
                            >
                                Select All
                            </button>
                            <button
                                onClick={clearAll}
                                className="btn btn-secondary text-sm"
                            >
                                Clear All
                            </button>
                        </div>
                        <div className="text-sm font-semibold text-text-muted">
                            {selectedFeatures.length} of {availableCount} features
                        </div>
                    </div>

                    {/* Feature Grid */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {FEATURES.map((feature) => {
                            const isDisabled = useLocal && !feature.offline;
                            const isSelected = selectedFeatures.includes(feature.id);

                            return (
                                <div
                                    key={feature.id}
                                    onClick={() => !isDisabled && toggleFeature(feature.id)}
                                    className={`card cursor-pointer transition-all ${isSelected
                                            ? 'border-accent bg-accent/5'
                                            : isDisabled
                                                ? 'opacity-50 cursor-not-allowed'
                                                : 'hover:border-accent/50'
                                        }`}
                                    style={{
                                        borderWidth: isSelected ? '2px' : '1px'
                                    }}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{
                                            background: isSelected
                                                ? 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)'
                                                : 'rgba(124, 58, 237, 0.1)'
                                        }}>
                                            {feature.icon}
                                        </div>
                                        {isSelected && (
                                            <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="text-lg font-bold text-text-main mb-2">
                                        {feature.name}
                                    </h3>

                                    <p className="text-sm text-text-muted mb-4">
                                        {feature.description}
                                    </p>

                                    <div className="flex items-center gap-2">
                                        {feature.offline ? (
                                            <span className="badge badge-success text-xs">
                                                📴 Offline
                                            </span>
                                        ) : (
                                            <span className="badge badge-info text-xs">
                                                ☁️ Online
                                            </span>
                                        )}
                                        {isDisabled && (
                                            <span className="badge badge-warning text-xs">
                                                Unavailable
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-border">
                                        <a href="#" className="text-xs text-accent hover:underline">
                                            Research in analysis →
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Continue Button */}
                    <div className="text-center">
                        <button
                            onClick={handleContinue}
                            disabled={selectedFeatures.length === 0}
                            className={`btn btn-primary text-lg px-12 py-4 shadow-2xl ${selectedFeatures.length === 0
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'hover:scale-105'
                                } transition-transform`}
                        >
                            <span>Continue to Analysis</span>
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

export default FeatureSelectionPage;
