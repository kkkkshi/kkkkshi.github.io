/* ============================================================
   profile/data.js  ·  edit THIS file to update the homepage.
   Everything the homepage shows comes from here (except the
   live GitHub data, which is fetched at load time and merged
   with `featuredRepos` below).
   ============================================================ */
window.PROFILE = {
  name: "Sherry (Ke) Shi",
  initials: "S",
  role: "Data Scientist",
  tagline:
    "Real-time machine learning for fraud and risk. I turn high-volume, messy data into systems that hold up in production.",
  location: "Toronto, ON",
  email: "keshi0330@gmail.com",
  githubUser: "kkkkshi",

  links: {
    github: "https://github.com/kkkkshi",
    linkedin: "https://www.linkedin.com/in/keshi0330/",
    email: "mailto:keshi0330@gmail.com",
    resume: "", // drop a PDF at profile/Ke_Shi_Resume.pdf and put the path here to show a "Résumé" button
  },

  about: [
    "Statistician turned engineer. I stopped chasing elegant models and started shipping ones that survive 3 a.m. in production.",
    "Today that's real-time fraud detection at Paytm Labs — account- and card-takeover models scoring tens of millions of events a day. I own the full lifecycle: features, modeling, deployment, drift monitoring. The unglamorous parts — clean labels, a quiet on-call page — matter as much as the model.",
    "Statistics at Waterloo, data science at Georgetown, CS at Cornell Tech — across fraud, computer vision, NLP, and a blockchain paper. I land in unfamiliar domains and turn the mess into something that works. Based in Toronto; I keep a map of the rest.",
  ],

  // what I'm exploring right now (shown as the "Now" section)
  now: [
    "Deep in LLM agents — building agentic tooling, wiring up multi-agent systems, routing them through Claude Code.",
    "The frontier moves fast. I'd rather build on it than read about it.",
  ],

  experience: [
    {
      company: "Paytm Labs",
      url: "https://pi.paytm.com/", // company/school website makes this card a clickable link (new tab); leave empty for a plain info card
      role: "Data Scientist",
      location: "Toronto, Canada",
      period: "Jun 2024 – Jan 2026",
      project: "Real-time Fraud Detection System (ATO & CTO)",
      stack: ["PySpark", "AWS SageMaker", "Python", "SQL"],
      bullets: [
        "Built the account-takeover (ATO) model that scores 15M+ events/day and cut fraud losses ~60% at 3× less user friction. Distilled 600+ features to a top-50 set with SHAP and Bayesian optimization.",
        "Shipped the card-takeover (CTO) model at 40M+ requests/day under 12 ms, cutting fraud-per-million 37% while lifting approvals 30%; owned the TB-scale S3 migration, drift monitoring, and labeling that kept V1–V4 honest.",
      ],
    },
    {
      company: "Tiancheng Zhilian Technology",
      url: "",
      role: "Machine Learning Engineer Intern",
      location: "Hangzhou, China",
      period: "Jan 2023 – Aug 2023",
      project: "Intelligent Security Surveillance & Anomaly Detection",
      stack: ["YOLOv5", "TensorFlow", "OpenCV", "Python"],
      bullets: [
        "Built a greenfield computer-vision surveillance system with YOLOv5 for real-time hazard and intrusion detection and automated alerts, trained on 400GB+ of video from 200+ feeds and benchmarked six architectures for edge deployment.",
      ],
    },
    {
      company: "Benyang Investment",
      url: "",
      role: "Business Analyst Intern",
      location: "Shanghai, China",
      period: "Mar 2022 – Aug 2022",
      project: "Equity-Risk Analytics · South China",
      stack: ["C", "SQL", "Wind", "Excel"],
      bullets: [
        "Automated shareholder-risk detection with C/SQL over Wind financial data for a 7-analyst team, replacing manual verification and lifting processing efficiency ~80%; managed delivery across three client portfolios.",
      ],
    },
    {
      company: "Georgetown University",
      url: "https://www.georgetown.edu/",
      role: "Graduate Teaching Assistant",
      location: "Washington, D.C.",
      period: "Jan 2022 – Dec 2022",
      project: "Data Structures · Time Series Analysis",
      stack: ["Python", "C++", "R"],
      bullets: [
        "Taught labs and ran end-to-end assessment for 40+ graduate students across two core courses: code reviews, grading, and office hours. Set up the class Slack and GitHub org.",
      ],
    },
    {
      company: "Sunyard System Engineering",
      url: "https://www.sunyard.com/",
      role: "Data Scientist Intern",
      location: "Hangzhou, China",
      period: "Feb 2021 – Aug 2021",
      project: "Merchant Analytics & Device Monitoring",
      stack: ["ELK Stack", "ECharts", "Python", "SQL"],
      bullets: [
        "Built the MVP analytics module for 100+ merchants (ECharts dashboards) and an anomaly-warning system from operation-log EDA on the ELK stack, replacing manual inspection.",
      ],
    },
    {
      company: "Hangzhou Qulian Technology",
      url: "https://www.hyperchain.cn/",
      role: "Software Engineer Intern · Blockchain",
      location: "Hangzhou, China",
      period: "Mar 2020 – Aug 2020",
      project: "Hyperchain Blockchain Platform",
      stack: ["Python", "C++", "Linux", "Cryptography"],
      bullets: [
        "Optimized cryptographic modules and consensus on a proprietary blockchain platform (Hyperchain) and shipped two client products; benchmarked Hyperchain/Fabric/Libra/PlatOn into a strategy report that shaped the roadmap.",
      ],
    },
    {
      company: "Hong Kong Baptist University",
      url: "https://www.hkbu.edu.hk/",
      role: "Undergraduate Research Assistant",
      location: "Hong Kong",
      period: "Jan 2020 – Jan 2021",
      project: "Blockchain & FinTech Research",
      stack: ["Hyperledger Fabric", "Smart Contracts", "Cryptography"],
      bullets: [
        "Researched blockchain for power-industry procurement (Hyperledger Fabric, SHA-256); co-authored an IEEE paper on a contract-management system that secured $1B+ in contracts and cut settlement time ~66%.",
      ],
    },
  ],

  education: [
    {
      school: "Cornell University",
      url: "https://www.cornell.edu/",
      degree: "M.Eng. in Computer Science",
      location: "New York, NY",
      period: "Aug 2023 – May 2024",
      note: "GPA 4.0 · ML & Entrepreneurship",
    },
    {
      school: "Georgetown University",
      url: "https://www.georgetown.edu/",
      degree: "M.S. in Data Science & Analytics",
      location: "Washington, D.C.",
      period: "Aug 2021 – Dec 2022",
      note: "GPA 4.0 · NLP & Deep Learning",
    },
    {
      school: "University of Waterloo",
      url: "https://uwaterloo.ca/",
      degree:
        "B.Math in Honours Statistics, Minor in Combinatorics & Optimization",
      location: "Waterloo, ON",
      period: "Aug 2017 – Apr 2021",
      note: "GPA 3.3 · Merit Scholarship",
    },
  ],

  // All projects, newest first. `todo: true` shows a TODO badge on the card
  // (still needs a final link / cleanup, pick & fix later).
  projects: [
    {
      name: "Align AI",
      featured: true, // shown by default; the rest collapse behind "Show all projects"
      sub: "Cornell Capstone · B2B SaaS",
      period: "Jan 2024 – May 2024",
      stack: ["Python", "GPT-4", "AWS", "Microservices", "React"],
      repo: "milestone-3-alignai",
      bullets: [
        "Co-founded a B2B SaaS that turns fragmented Jira and GitHub data into real-time engineering reports — Python microservices on AWS and an LLM (GPT-4) inference engine. Shipped a production MVP to 3 pilot customers.",
      ],
    },
    {
      name: "miniTorch",
      featured: true,
      sub: "Deep-learning framework",
      period: "Jan 2024 – Apr 2024",
      stack: ["Python", "CUDA", "Autograd"],
      repo: "CS5781_minitorch",
      bullets: [
        "A teaching deep-learning framework built from scratch: reverse-mode autodiff, tensors, modular layers, and custom CUDA kernels for GPU training.",
      ],
    },
    {
      name: "Blockchain",
      sub: "From scratch",
      period: "Jan 2024 – Apr 2024",
      stack: ["Python", "Proof-of-Work"],
      repo: "CS5433_BlockChain",
      bullets: [
        "A from-scratch blockchain with proof-of-work, transactions, and consensus.",
      ],
    },
    {
      name: "Startup Systems",
      sub: "Cornell · Full-Stack",
      period: "Sep 2023 – Dec 2023",
      stack: ["JavaScript", "Web", "MVP"],
      repo: "CS5356_Building_Startup_System",
      bullets: [
        "A full-stack web app built end-to-end in Cornell Tech's Building Startup Systems course, from product spec to a deployed MVP.",
      ],
    },
    {
      name: "Algorithm Toolkit",
      sub: "Cornell · Algorithms",
      period: "Sep 2023 – Dec 2023",
      stack: ["Python", "Data Structures", "Complexity"],
      repo: "CS5112_Algorithms",
      bullets: [
        "Implementations and analysis of core algorithms and data structures from Cornell Tech's graduate algorithms course.",
      ],
    },
    {
      name: "Network Systems",
      sub: "Cornell · Networks",
      period: "Sep 2023 – Dec 2023",
      stack: ["C", "Sockets", "TCP/IP"],
      repo: "CS5450_Network",
      bullets: [
        "A systems-level networking project in C for Cornell Tech's networks course, building protocol mechanics from the socket up.",
      ],
    },
    {
      name: "Reddit Game-Community Research",
      featured: true,
      sub: "NLP · Big Data",
      period: "Sep 2022 – Dec 2022",
      stack: ["NLP", "PySpark", "LSTM", "Azure"],
      repo: "",
      url: "https://hotarugusa.github.io/reddit/index.html",
      bullets: [
        "EDA, NLP, and a big-data pipeline over Reddit and YouTube data to study game communities, benchmarking classical ML against LSTM.",
      ],
    },
    {
      name: "Auto-Grader for ESL Essays",
      sub: "Kaggle Competition",
      period: "Sep 2022 – Dec 2022",
      stack: ["TF-IDF", "Conv1D", "SVM", "NLP"],
      repo: "",
      url: "https://github.com/kkkkshi/ANLY580_Final_Project",
      bullets: [
        "Essay auto-grader scoring six writing traits for 8–12th-grade ESL students, combining TF-IDF, a Conv1D model, and an SVM ensemble.",
      ],
    },
    {
      name: "Pawpularity",
      sub: "Kaggle · Computer Vision",
      period: "Sep 2022 – Dec 2022",
      stack: ["Conv2D", "Regression", "Python"],
      repo: "Pawpularity",
      bullets: [
        "Kaggle competition predicting shelter-pet photo appeal from images and tabular metadata.",
      ],
    },
    {
      name: "Mask-Wearing Detection",
      sub: "Computer Vision",
      period: "May 2022 – Aug 2022",
      stack: ["AlexNet", "Inception", "VGG", "YOLOv4"],
      repo: "",
      url: "https://github.com/kkkkshi/ANLY677_Final_Project",
      bullets: [
        "Benchmarked CNN architectures (AlexNet, Inception v3, VGG, YOLOv4) to flag incorrect mask-wearing across COVID-era scenarios, comparing accuracy by setting.",
      ],
    },
    {
      name: "U.S. STEM Cities Real Estate",
      sub: "Data Viz · Storytelling",
      period: "Jan 2022 – Apr 2022",
      stack: ["Python", "R", "Matplotlib", "HTML/CSS"],
      repo: "",
      todo: true,
      bullets: [
        "Gathered and cleaned data for 200+ U.S. cities via APIs, visualized in R/Matplotlib, and built an HTML/CSS storytelling page on STEM-city real-estate trends.",
      ],
    },
    {
      name: "Dataset Toolbox",
      sub: "Tooling",
      period: "Jan 2022 – Apr 2022",
      stack: ["Python", "Scikit-learn"],
      repo: "Dataset_Toolbox",
      bullets: [
        "Utilities for cleaning, transforming, and packaging ML datasets: EDA, ROC, and tree / kd-tree-KNN classifiers.",
      ],
    },
    {
      name: "World Happiness, 2008–2020",
      sub: "ML · Data Viz",
      period: "Sep 2021 – Dec 2021",
      stack: ["KNN", "Random Forest", "R"],
      repo: "",
      todo: true,
      bullets: [
        "Supervised and unsupervised analysis of the World Happiness dataset (KNN, Random Forest), packaged into a storytelling web page.",
      ],
    },
    {
      name: "The Magic Tower",
      sub: "Game",
      period: "Jan 2019 – Apr 2019",
      stack: ["C++", "UML"],
      repo: "The-Magic-Tower",
      bullets: [
        "A remake of the classic Magic Tower puzzle-RPG, with four monster types and three boss stages.",
      ],
    },
  ],

  publications: [
    {
      title:
        "A Blockchain-Driven Electronic Contract Management System for Commodity Procurement in the Electronic Power Industry",
      venue: "IEEE",
      date: "Jan 2021",
      url: "https://ieeexplore.ieee.org/document/9316177",
      note: "A process-oriented blockchain contract system (Hyperledger Fabric, SHA-256) deployed for a power-grid enterprise. Over 6,000 contracts and ¥6.5B signed, with settlement time cut from about three months to one.",
    },
  ],

  certifications: [
    { name: "Claude Code in Action", authority: "Anthropic", date: "May 2026", url: "https://verify.skilljar.com/c/vjmkur55sxv3" },
    { name: "Claude Code 101", authority: "Anthropic", date: "May 2026", url: "https://verify.skilljar.com/c/no8kw6kydhqn" },
    { name: "Claude 101", authority: "Anthropic", date: "May 2026", url: "https://verify.skilljar.com/c/jt8kq2scu5q2" },
    { name: "Introduction to Claude Cowork", authority: "Anthropic", date: "May 2026", url: "https://verify.skilljar.com/c/yq93jiso5n7s" },
    { name: "Django App Development with SQL & Databases", authority: "IBM", date: "Nov 2023", url: "https://www.coursera.org/account/accomplishments/verify/EED4FG2STA9V" },
    { name: "Python for Data Science, AI & Development", authority: "IBM", date: "Oct 2023", url: "https://www.coursera.org/account/accomplishments/verify/VS74BKG63WWK" },
    { name: "Developing AI Applications with Python & Flask", authority: "IBM", date: "Oct 2023", url: "https://coursera.org/verify/QLPA24GG7NFU" },
    { name: "Linux Commands & Shell Scripting", authority: "IBM", date: "Sep 2023", url: "https://www.coursera.org/account/accomplishments/certificate/PXGCMF2GKJ7R" },
    { name: "Git & GitHub", authority: "IBM", date: "Sep 2023", url: "https://www.coursera.org/account/accomplishments/certificate/4F5S538PT5U5" },
    { name: "Introduction to Software Engineering", authority: "IBM", date: "Sep 2023", url: "https://www.coursera.org/account/accomplishments/certificate/BM6MMRXZZBKG" },
  ],

  skills: {
    Programming: [
      "Python",
      "SQL",
      "Java",
      "C++",
      "C",
      "JavaScript / TypeScript",
      "R",
      "Shell",
    ],
    "Machine Learning": [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "Deep Learning",
      "CUDA",
      "Feature Engineering",
      "SHAP",
      "Bayesian Optimization",
      "Classical ML (RF · SVM · KNN)",
    ],
    "NLP & LLMs": [
      "LLMs (GPT-4)",
      "NLP",
      "LSTM",
      "TF-IDF",
      "Sentiment Analysis",
    ],
    "AI Agents": [
      "Claude Code",
      "LLM Agents",
      "Multi-Agent Systems",
      "Prompt Engineering",
      "RAG",
      "MCP",
    ],
    "Computer Vision": [
      "OpenCV",
      "YOLO (v4 · v5)",
      "CNNs (AlexNet · VGG · Inception)",
      "Image Classification",
    ],
    "Data, Cloud & MLOps": [
      "Spark / PySpark",
      "Hadoop",
      "Cassandra",
      "AWS (SageMaker · S3 · Athena)",
      "Azure",
      "GCP",
      "Docker",
      "CI/CD",
      "Git",
      "ELK Stack",
      "Drift Monitoring",
      "Linux / UNIX",
    ],
    "Data Viz": ["Tableau", "Matplotlib", "ECharts", "D3.js"],
    Blockchain: ["Hyperledger Fabric", "Smart Contracts", "Cryptography"],
    Languages: ["Chinese (native)", "English (native)", "Japanese", "French"],
  },

  footprints: {
    blurb:
      "Beyond the résumé: a hand-built, multi-layer map of everywhere I've lived and traveled. 13 countries, 2014 to 2026, with photos and field notes.",
    href: "footprints.html",
  },
};
