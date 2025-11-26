# Resume IQ - AI-Powered Resume Analysis Platform

<div align="center">

![Resume IQ](https://img.shields.io/badge/Resume-IQ-06b6d4?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61dafb?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646cff?style=for-the-badge&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Transform your hiring process with AI-powered resume analysis, candidate comparison, and predictive analytics.**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack)

</div>

---

## 🚀 Features

### Core Analysis Tools

#### 📝 **Resume Review**
- Comprehensive ATS compatibility analysis
- Skill extraction and matching
- Experience evaluation
- Improvement recommendations

#### 📊 **Job Description Analysis**
- Role requirements breakdown
- Skills categorization (required vs. preferred)
- Seniority level assessment
- Market insights

#### 🎯 **Behavioral Fit Analysis**
- Cultural alignment assessment
- Soft skills evaluation
- Team compatibility insights
- Leadership potential analysis

#### 🔍 **Hidden Requirements Detection**
- Uncover implicit job requirements
- Read between the lines
- Identify unstated expectations
- Cultural fit indicators

#### ☑️ **Requirements Checklist**
- Detailed requirement mapping
- Match percentage calculation
- Gap identification
- Priority-based recommendations

### Advanced Features

#### 📊 **Candidate Comparison Dashboard**
- **Compare up to 5 candidates** side-by-side
- Visual skill match charts (required vs. preferred)
- Automatic ranking by overall score
- Detailed breakdown per candidate
- Export comparison results

#### 🔮 **Success Predictor**
- **Dual-analysis system**: JD Fit (60%) + Cultural Fit (40%)
- Index top performer profiles
- 6-dimensional trait analysis:
  - Leadership
  - Technical Depth
  - Communication
  - Adaptability
  - Impact
  - Team Collaboration
- Radar chart visualization
- Similar performer matching
- Predictive success scoring

#### 📝 **Cover Letter Generator**
- **AI-powered personalization**
- 3 tone options: Professional, Enthusiastic, Creative
- 3 length options: Short (200-250), Medium (300-400), Long (450-550 words)
- PDF export
- Copy to clipboard
- Key highlights extraction
- Improvement suggestions

#### 📈 **Industry Benchmarking**
- **12 tech roles** with comprehensive data
- Salary estimates by experience level (Junior/Mid/Senior)
- Market competitiveness scoring (0-100)
- Skills gap analysis
- Career insights & recommendations
- Growth potential assessment
- Visual salary charts

---

## 🎨 Screenshots

### Main Dashboard
![Dashboard](https://via.placeholder.com/800x450/1e293b/06b6d4?text=Resume+Analyzer+Dashboard)

### Candidate Comparison
![Comparison](https://via.placeholder.com/800x450/1e293b/06b6d4?text=Candidate+Comparison+View)

### Success Predictor
![Predictor](https://via.placeholder.com/800x450/1e293b/06b6d4?text=Success+Predictor+Analysis)

---

## 🎯 Demo

**Live Demo:** [Coming Soon]

**Quick Start:**
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key (for online mode)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/Vishal42001/Resume_IQ.git
cd Resume_IQ
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure API Key**
- The app will prompt for your OpenAI API key on first use
- API key is stored securely in browser localStorage
- Alternatively, set up local Ollama for offline mode

4. **Run the development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
```

---

## 🎮 Usage

### Basic Workflow

1. **Upload Resume**
   - Paste text directly OR
   - Upload PDF/DOCX file
   - Supports multiple resumes for comparison

2. **Add Job Description**
   - Paste the job posting
   - Include company info for better results

3. **Select Analysis Type**
   - Choose from 8+ analysis tools
   - Each provides unique insights

4. **Review Results**
   - Interactive visualizations
   - Actionable recommendations
   - Export options (PDF, CSV)

### Advanced Features

#### Candidate Comparison
1. Switch to "Multiple (Comparison)" mode
2. Upload 2-5 resumes
3. Add job description
4. Go to "Compare Candidates" tab
5. View ranked results with charts

#### Success Predictor
1. Upload 3-20 top performer profiles
2. Upload candidate resume
3. Add job description
4. Run prediction analysis
5. Review dual-score breakdown

#### Cover Letter Generator
1. Upload resume and job description
2. Go to "Cover Letter" tab
3. Select tone and length
4. Generate personalized letter
5. Download PDF or copy text

#### Industry Benchmarking
1. Upload resume and job description
2. Go to "Benchmarking" tab
3. View salary estimates
4. Analyze skills gaps
5. Review career recommendations

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI framework
- **Vite 7.2.4** - Build tool
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization

### AI & Processing
- **OpenAI GPT-4** - AI analysis (online mode)
- **Ollama** - Local AI models (offline mode)
- **Custom prompts** - Specialized analysis logic

### File Processing
- **mammoth** - DOCX parsing
- **pdf-parse** - PDF extraction
- **jsPDF** - PDF generation
- **papaparse** - CSV export

### State Management
- React Hooks
- localStorage for persistence

---

## 📊 Supported Roles (Benchmarking)

- Software Engineer
- Frontend Developer
- Backend Developer
- Full Stack Developer
- Data Scientist
- DevOps Engineer
- Product Manager
- UX/UI Designer
- Machine Learning Engineer
- Cloud Architect
- Mobile Developer
- Security Engineer

---

## 🎨 Design Features

- **Glass morphism UI** with backdrop blur
- **Cyan/Blue theme** (#06b6d4, #0ea5e9)
- **Dark mode** compatible
- **Responsive design** for all screen sizes
- **Smooth animations** and transitions
- **Accessible** with ARIA labels

---

## 🔒 Privacy & Security

- **Local-first**: All data processed in browser
- **No server storage**: Resume data never leaves your device
- **API key security**: Stored only in browser localStorage
- **Offline mode**: Use local AI models with Ollama
- **No tracking**: Zero analytics or user tracking

---

## 🚦 Roadmap

### Completed ✅
- [x] Resume review and analysis
- [x] Job description analysis
- [x] Behavioral fit assessment
- [x] Candidate comparison dashboard
- [x] Success predictor with top performers
- [x] Cover letter generator
- [x] Industry benchmarking

### In Progress 🚧
- [ ] Batch processing (10+ candidates)
- [ ] Historical tracking
- [ ] Export reports (PDF/Excel)

### Planned 📋
- [ ] Chrome extension for LinkedIn
- [ ] Team collaboration features
- [ ] Interview question generator
- [ ] Salary negotiation assistant
- [ ] ATS integration (Greenhouse, Lever)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Vishal Kumar Singh**

- GitHub: [@Vishal42001](https://github.com/Vishal42001)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Recharts for beautiful visualizations
- Tailwind CSS for styling utilities
- Vite for blazing-fast development

---

## 📧 Support

For support, email your-email@example.com or open an issue on GitHub.

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by Vishal Kumar Singh

</div>
