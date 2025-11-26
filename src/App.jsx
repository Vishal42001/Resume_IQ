import React, { useState, useEffect } from 'react';
import InputSection from './components/InputSection';
import Dashboard from './components/Dashboard';

function App() {
  const [model, setModel] = useState('gpt-4o-mini');
  const [resume, setResume] = useState('');
  const [jd, setJd] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [useLocal, setUseLocal] = useState(false); // Local vs Online toggle
  const [localModel, setLocalModel] = useState('llama3'); // Selected local model
  const [resumes, setResumes] = useState([]); // Multiple resumes for comparison
  const [topPerformers, setTopPerformers] = useState([]); // Top performer profiles for predictor

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

  return (
    <div className="min-h-screen pb-20 text-text-main font-sans">
      {/* Header with Glass Effect */}
      <header className="sticky top-0 z-50 glass border-b border-border shadow-lg">
        <div className="container flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 animate-slide-in">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center pulse-ring" style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
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

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Local/Online Toggle */}
            <div className="flex items-center gap-3 glass border border-border rounded-xl px-4 py-2">
              <span className={`text-xs font-medium uppercase tracking-wider transition-colors ${!useLocal ? 'text-accent' : 'text-text-muted'}`}>
                Online
              </span>
              <div
                className="relative w-14 h-7 cursor-pointer"
                onClick={toggleLocal}
                title={useLocal ? 'Switch to Online (OpenAI)' : 'Switch to Local Model'}
              >
                <div className={`absolute inset-0 rounded-full transition-all duration-300 ${useLocal ? 'bg-success/20 border-2 border-success' : 'bg-accent/20 border-2 border-accent'
                  }`}></div>
                <div className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center ${useLocal ? 'translate-x-7 bg-success' : 'bg-accent'
                  }`}>
                  {useLocal ? (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                      <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                      <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
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
              className="theme-toggle"
              onClick={toggleTheme}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <div className="theme-toggle-slider">
                {darkMode ? (
                  <svg className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>

            {/* Model Selector - Shows appropriate selector based on mode */}
            {useLocal ? (
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium text-text-muted uppercase tracking-wider">Local Model</span>
                <select
                  value={localModel}
                  onChange={(e) => {
                    setLocalModel(e.target.value);
                    localStorage.setItem('localModel', e.target.value);
                  }}
                  className="glass border border-border rounded-xl px-4 py-2 text-sm font-medium focus:outline-none cursor-pointer transition-all hover:border-success"
                >
                  <option value="llama3">Llama 3 (8B)</option>
                  <option value="qwen2.5">Qwen 2.5</option>
                  <option value="mistral:7b">Mistral (7B)</option>
                  <option value="llama2">Llama 2 (7B)</option>
                  <option value="codellama">CodeLlama</option>
                  <option value="phi">Phi</option>
                  <option value="gemma">Gemma</option>
                </select>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium text-text-muted uppercase tracking-wider">Model</span>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="glass border border-border rounded-xl px-4 py-2 text-sm font-medium focus:outline-none cursor-pointer transition-all hover:border-accent"
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

      {/* Main Content */}
      <main className="container mt-20 pb-20">
        {/* Hero Section */}
        <div className="mb-20 text-center animate-fade-in">
          <h2 className="text-6xl md:text-7xl font-black tracking-tight mb-6 gradient-text leading-tight">
            Smart Resume Optimization
          </h2>
          <p className="text-text-muted text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-8">
            Leverage AI to analyze, optimize, and tailor your resume for any job. Get intelligent insights, ATS optimization, and interview preparation—all in one powerful platform.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <span className="badge badge-info text-sm py-2 px-4 animate-float">🎯 5 AI Features</span>
            <span className="badge badge-success text-sm py-2 px-4 animate-float" style={{ animationDelay: '0.2s' }}>✓ ATS Optimized</span>
            <span className="badge badge-info text-sm py-2 px-4 animate-float" style={{ animationDelay: '0.4s' }}>💼 Interview Prep</span>
            <span className={`badge text-sm py-2 px-4 animate-float ${useLocal ? 'badge-success' : 'badge-info'}`} style={{ animationDelay: '0.6s' }}>
              {useLocal ? '🏠 Running Locally' : '☁️ Running Online'}
            </span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="space-y-12">
          <InputSection
            resume={resume}
            setResume={setResume}
            jd={jd}
            setJd={setJd}
            resumes={resumes}
            setResumes={setResumes}
          />

          <Dashboard
            resume={resume}
            jd={jd}
            model={model}
            useLocal={useLocal}
            localModel={localModel}
            resumes={resumes}
            topPerformers={topPerformers}
            setTopPerformers={setTopPerformers}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
