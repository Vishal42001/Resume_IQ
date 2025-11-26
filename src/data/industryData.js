// Industry benchmarking data for various tech roles
export const INDUSTRY_BENCHMARKS = {
    "Software Engineer": {
        salary: {
            junior: { min: 60000, max: 95000, avg: 77500, currency: "USD" },
            mid: { min: 95000, max: 140000, avg: 117500, currency: "USD" },
            senior: { min: 140000, max: 210000, avg: 175000, currency: "USD" }
        },
        topSkills: ["JavaScript", "Python", "React", "Node.js", "TypeScript", "Git", "AWS", "Docker"],
        demandTrend: "high",
        growthRate: 22,
        description: "Designs, develops, and maintains software applications"
    },
    "Frontend Developer": {
        salary: {
            junior: { min: 55000, max: 85000, avg: 70000, currency: "USD" },
            mid: { min: 85000, max: 125000, avg: 105000, currency: "USD" },
            senior: { min: 125000, max: 180000, avg: 152500, currency: "USD" }
        },
        topSkills: ["React", "JavaScript", "CSS", "HTML", "TypeScript", "Vue.js", "Angular", "Webpack"],
        demandTrend: "high",
        growthRate: 18,
        description: "Builds user-facing features and interfaces"
    },
    "Backend Developer": {
        salary: {
            junior: { min: 60000, max: 90000, avg: 75000, currency: "USD" },
            mid: { min: 90000, max: 135000, avg: 112500, currency: "USD" },
            senior: { min: 135000, max: 200000, avg: 167500, currency: "USD" }
        },
        topSkills: ["Python", "Java", "Node.js", "SQL", "MongoDB", "REST API", "Docker", "Kubernetes"],
        demandTrend: "high",
        growthRate: 20,
        description: "Develops server-side logic and database management"
    },
    "Full Stack Developer": {
        salary: {
            junior: { min: 65000, max: 95000, avg: 80000, currency: "USD" },
            mid: { min: 95000, max: 145000, avg: 120000, currency: "USD" },
            senior: { min: 145000, max: 220000, avg: 182500, currency: "USD" }
        },
        topSkills: ["JavaScript", "React", "Node.js", "Python", "SQL", "MongoDB", "AWS", "Git"],
        demandTrend: "very high",
        growthRate: 25,
        description: "Works on both frontend and backend development"
    },
    "Data Scientist": {
        salary: {
            junior: { min: 70000, max: 100000, avg: 85000, currency: "USD" },
            mid: { min: 100000, max: 150000, avg: 125000, currency: "USD" },
            senior: { min: 150000, max: 230000, avg: 190000, currency: "USD" }
        },
        topSkills: ["Python", "R", "SQL", "Machine Learning", "TensorFlow", "Pandas", "Statistics", "Data Visualization"],
        demandTrend: "very high",
        growthRate: 28,
        description: "Analyzes complex data to drive business decisions"
    },
    "DevOps Engineer": {
        salary: {
            junior: { min: 65000, max: 95000, avg: 80000, currency: "USD" },
            mid: { min: 95000, max: 145000, avg: 120000, currency: "USD" },
            senior: { min: 145000, max: 215000, avg: 180000, currency: "USD" }
        },
        topSkills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform", "Jenkins", "Linux", "Python"],
        demandTrend: "very high",
        growthRate: 27,
        description: "Manages infrastructure and deployment pipelines"
    },
    "Product Manager": {
        salary: {
            junior: { min: 70000, max: 105000, avg: 87500, currency: "USD" },
            mid: { min: 105000, max: 160000, avg: 132500, currency: "USD" },
            senior: { min: 160000, max: 250000, avg: 205000, currency: "USD" }
        },
        topSkills: ["Product Strategy", "Agile", "Data Analysis", "User Research", "Roadmapping", "Stakeholder Management", "SQL", "A/B Testing"],
        demandTrend: "high",
        growthRate: 15,
        description: "Defines product vision and strategy"
    },
    "UX/UI Designer": {
        salary: {
            junior: { min: 50000, max: 75000, avg: 62500, currency: "USD" },
            mid: { min: 75000, max: 115000, avg: 95000, currency: "USD" },
            senior: { min: 115000, max: 170000, avg: 142500, currency: "USD" }
        },
        topSkills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Wireframing", "Design Systems", "HTML/CSS", "Usability Testing"],
        demandTrend: "medium",
        growthRate: 12,
        description: "Designs user interfaces and experiences"
    },
    "Machine Learning Engineer": {
        salary: {
            junior: { min: 80000, max: 115000, avg: 97500, currency: "USD" },
            mid: { min: 115000, max: 170000, avg: 142500, currency: "USD" },
            senior: { min: 170000, max: 260000, avg: 215000, currency: "USD" }
        },
        topSkills: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning", "NLP", "Computer Vision", "MLOps"],
        demandTrend: "very high",
        growthRate: 32,
        description: "Develops and deploys ML models"
    },
    "Cloud Architect": {
        salary: {
            junior: { min: 75000, max: 110000, avg: 92500, currency: "USD" },
            mid: { min: 110000, max: 165000, avg: 137500, currency: "USD" },
            senior: { min: 165000, max: 245000, avg: 205000, currency: "USD" }
        },
        topSkills: ["AWS", "Azure", "GCP", "Cloud Architecture", "Terraform", "Kubernetes", "Security", "Networking"],
        demandTrend: "very high",
        growthRate: 30,
        description: "Designs cloud infrastructure solutions"
    },
    "Mobile Developer": {
        salary: {
            junior: { min: 60000, max: 90000, avg: 75000, currency: "USD" },
            mid: { min: 90000, max: 135000, avg: 112500, currency: "USD" },
            senior: { min: 135000, max: 195000, avg: 165000, currency: "USD" }
        },
        topSkills: ["React Native", "Swift", "Kotlin", "iOS", "Android", "Flutter", "Mobile UI", "REST API"],
        demandTrend: "high",
        growthRate: 19,
        description: "Develops mobile applications"
    },
    "Security Engineer": {
        salary: {
            junior: { min: 70000, max: 100000, avg: 85000, currency: "USD" },
            mid: { min: 100000, max: 150000, avg: 125000, currency: "USD" },
            senior: { min: 150000, max: 225000, avg: 187500, currency: "USD" }
        },
        topSkills: ["Cybersecurity", "Penetration Testing", "Network Security", "SIEM", "Encryption", "Compliance", "Python", "Linux"],
        demandTrend: "very high",
        growthRate: 31,
        description: "Protects systems and data from threats"
    }
};

// Helper function to find closest matching role
export const findClosestRole = (jobTitle) => {
    const normalizedTitle = jobTitle.toLowerCase();

    // Direct matches
    for (const role in INDUSTRY_BENCHMARKS) {
        if (normalizedTitle.includes(role.toLowerCase())) {
            return role;
        }
    }

    // Keyword matches
    const keywords = {
        "Software Engineer": ["software", "swe", "engineer"],
        "Frontend Developer": ["frontend", "front-end", "ui developer"],
        "Backend Developer": ["backend", "back-end", "server"],
        "Full Stack Developer": ["full stack", "fullstack", "full-stack"],
        "Data Scientist": ["data scientist", "data analyst", "analytics"],
        "DevOps Engineer": ["devops", "sre", "site reliability"],
        "Product Manager": ["product manager", "pm", "product owner"],
        "UX/UI Designer": ["ux", "ui", "designer", "design"],
        "Machine Learning Engineer": ["ml engineer", "machine learning", "ai engineer"],
        "Cloud Architect": ["cloud", "architect", "infrastructure"],
        "Mobile Developer": ["mobile", "ios", "android", "app developer"],
        "Security Engineer": ["security", "cybersecurity", "infosec"]
    };

    for (const [role, terms] of Object.entries(keywords)) {
        if (terms.some(term => normalizedTitle.includes(term))) {
            return role;
        }
    }

    return "Software Engineer"; // Default fallback
};

// Get demand trend color
export const getDemandColor = (trend) => {
    const colors = {
        "very high": "text-success",
        "high": "text-accent",
        "medium": "text-warning",
        "low": "text-danger"
    };
    return colors[trend] || "text-text-muted";
};
