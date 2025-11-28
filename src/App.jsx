import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import InputSection from './components/InputSection';
import FeatureSelectionPage from './components/FeatureSelectionPage';
import Dashboard from './components/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'input', 'features', 'results'
  const [model, setModel] = useState('gpt-4o-mini');
  const [resume, setResume] = useState('');
  const [jd, setJd] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [useLocal, setUseLocal] = useState(false);
  const [localModel, setLocalModel] = useState('llama3');
  const [resumes, setResumes] = useState([]);
  const [topPerformers, setTopPerformers] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    setDarkMode(savedTheme === 'dark');
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Check for saved model preference
    const savedUseLocal = localStorage.getItem('useLocal') === 'true';
    setUseLocal(savedUseLocal);

    // Check for saved local model preference
    const savedLocalModel = localStorage.getItem('localModel') || 'llama3';
    setLocalModel(savedLocalModel);

    // Load top performers from localStorage
    const savedTopPerformers = localStorage.getItem('topPerformers');
    if (savedTopPerformers) {
      try {
        setTopPerformers(JSON.parse(savedTopPerformers));
      } catch (e) {
        console.error('Failed to load top performers:', e);
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = darkMode ? 'light' : 'dark';
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleLocal = () => {
    const newUseLocal = !useLocal;
    setUseLocal(newUseLocal);
    localStorage.setItem('useLocal', newUseLocal.toString());
  };

  // Save top performers to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('topPerformers', JSON.stringify(topPerformers));
  }, [topPerformers]);

  const handleStartFromHome = () => {
    setCurrentPage('input');
  };

  const handleContinueToFeatures = () => {
    setCurrentPage('features');
  };

  const handleFeatureSelection = (features) => {
    setSelectedFeatures(features);
    setCurrentPage('results');
  };

  const handleBackToInput = () => {
    setCurrentPage('input');
  };

  const handleBackToFeatures = () => {
    setCurrentPage('features');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen text-text-main font-sans" style={{
      background: darkMode ? '#0a0a0a' : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)'
    }}>
      {/* Header */}
      {currentPage !== 'home' && (
        <header className="sticky top-0 z-50 border-b border-border shadow-sm" style={{
          background: darkMode ? 'rgba(10, 10, 10, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)'
        }}>
          <div className="container flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={handleBackToHome}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)'
              }}>
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight gradient-text">ResumeIQ</h1>
                <p className="text-xs text-text-muted">Powered by AI</p>
              </div>
            </div>

            {/* Navigation Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm">
              <button
                onClick={handleBackToHome}
                className="text-text-muted hover:text-accent transition-colors"
              >
                Home
              </button>
              {currentPage !== 'home' && (
                <>
                  <span className="text-text-dim">/</span>
                  <button
                    onClick={handleBackToInput}
                    className={`transition-colors ${currentPage === 'input' ? 'text-accent font-semibold' : 'text-text-muted hover:text-accent'}`}
                  >
                    Input
                  </button>
                </>
              )}
              {(currentPage === 'features' || currentPage === 'results') && (
                <>
                  <span className="text-text-dim">/</span>
                  <button
                    onClick={handleBackToFeatures}
                    className={`transition-colors ${currentPage === 'features' ? 'text-accent font-semibold' : 'text-text-muted hover:text-accent'}`}
                  >
                    Analysis Selection
                  </button>
                </>
              )}
              {currentPage === 'results' && (
                <>
                  <span className="text-text-dim">/</span>
                  <span className="text-accent font-semibold">Results</span>
                </>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-2">
              {/* Local/Online Toggle */}
              <div className="flex items-center gap-2 card px-2 py-1" style={{ height: '36px' }}>
                <span className={`text-xs font-medium uppercase tracking-wider transition-colors ${!useLocal ? 'text-accent' : 'text-text-muted'}`}>
                  Online
                </span>
                <div
                  className="relative w-10 h-5 cursor-pointer"
                  onClick={toggleLocal}
                  title={useLocal ? 'Switch to Online (OpenAI)' : 'Switch to Local Model'}
                >
                  <div className={`absolute inset-0 rounded-full transition-all duration-300 ${useLocal ? 'bg-success/20 border border-success' : 'bg-accent/20 border border-accent'
                    }`}></div>
                  <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-all duration-300 flex items-center justify-center ${useLocal ? 'translate-x-5 bg-success' : 'bg-accent'
                    }`}>
                    {useLocal ? (
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                        <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                        <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                      </svg>
                    ) : (
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className={`text-xs font-medium uppercase tracking-wider transition-colors ${useLocal ? 'text-success' : 'text-text-muted'}`}>
                  Local
                </span>
              </div>

              {/* Theme Toggle */}
              <div
                className="w-12 h-6 cursor-pointer relative rounded-full transition-all"
                onClick={toggleTheme}
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                style={{
                  background: darkMode ? 'rgba(124, 58, 237, 0.2)' : 'rgba(124, 58, 237, 0.2)',
                  border: '1px solid rgba(124, 58, 237, 0.3)'
                }}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center bg-gradient`}
                  style={{
                    left: darkMode ? 'calc(100% - 22px)' : '2px'
                  }}
                >
                  {darkMode ? (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Model Selector */}
              {useLocal ? (
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-text-muted whitespace-nowrap">Model:</span>
                  <select
                    value={localModel}
                    onChange={(e) => {
                      setLocalModel(e.target.value);
                      localStorage.setItem('localModel', e.target.value);
                    }}
                    className="border border-border rounded-lg px-2 py-1 text-xs font-medium focus:outline-none cursor-pointer transition-all hover:border-success"
                    style={{
                      height: '36px',
                      minWidth: '110px',
                      backgroundColor: 'var(--bg-card)',
                      color: 'var(--text-main)'
                    }}
                  >
                    <option value="llama3">Llama 3</option>
                    <option value="qwen2.5">Qwen 2.5</option>
                    <option value="mistral:7b">Mistral</option>
                    <option value="llama2">Llama 2</option>
                    <option value="codellama">CodeLlama</option>
                    <option value="phi">Phi</option>
                    <option value="gemma">Gemma</option>
                  </select>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-text-muted whitespace-nowrap">Model:</span>
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="border border-border rounded-lg px-2 py-1 text-xs font-medium focus:outline-none cursor-pointer transition-all hover:border-accent"
                    style={{
                      height: '36px',
                      minWidth: '110px',
                      backgroundColor: 'var(--bg-card)',
                      color: 'var(--text-main)'
                    }}
                  >
                    <option value="gpt-4o-mini">GPT-4o Mini</option>
                    <option value="gpt-4o">GPT-4o</option>
                    <option value="gpt-4-turbo">GPT-4 Turbo</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main>
        {currentPage === 'home' && (
          <HomePage onStart={handleStartFromHome} />
        )}

        {currentPage === 'input' && (
          <div className="container py-20">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-black text-text-main mb-4">
                  Input Your Data
                </h2>
                <p className="text-lg text-text-muted max-w-2xl mx-auto">
                  Upload or paste your resume and the job description you're targeting. Our AI will analyze both to provide comprehensive optimization insights.
                </p>
              </div>

              <InputSection
                resume={resume}
                setResume={setResume}
                jd={jd}
                setJd={setJd}
                resumes={resumes}
                setResumes={setResumes}
              />

              <div className="text-center mt-12">
                <button
                  onClick={handleContinueToFeatures}
                  disabled={!resume || !jd}
                  className={`btn btn-primary text-lg px-12 py-4 shadow-2xl ${!resume || !jd
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:scale-105'
                    } transition-transform`}
                >
                  <span>Continue to Analysis Selection</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'features' && (
          <FeatureSelectionPage
            onContinue={handleFeatureSelection}
            useLocal={useLocal}
          />
        )}

        {currentPage === 'results' && (
          <div className="container py-20">
            <Dashboard
              resume={resume}
              jd={jd}
              model={model}
              useLocal={useLocal}
              localModel={localModel}
              resumes={resumes}
              topPerformers={topPerformers}
              setTopPerformers={setTopPerformers}
              selectedFeatures={selectedFeatures}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
