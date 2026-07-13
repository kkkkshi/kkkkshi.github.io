/* ============================================================
   profile/data.js  ·  edit THIS file to update the homepage.
   Everything the homepage shows comes from here.
   ============================================================ */
window.PROFILE = {
  name: "Sherry (Ke) Shi",
  initials: "S",
  role: "Data Engineer & Machine Learning Engineer",
  company: "EnStream", // shown in the hero kicker (role · company · city); leave empty to hide
  tagline: "Data is the best language.",
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
    "Sherry (Ke) Shi is a Data Engineer & Machine Learning Engineer at EnStream, where she owns the data pipeline behind Trust Score, a real-time fraud and identity-risk signal for high-volume telecom events, and the AWS infrastructure for the company's cross-team data-exchange platform.",
    "She was previously a Data Scientist at Paytm Labs, on real-time fraud detection. Her account-takeover model scored 15 million events a day and cut fraud losses by about 60% while easing user friction; a card-takeover model handled 40 million requests a day in under 12ms. Her wider work spans computer vision and NLP, and she co-authored an IEEE paper on blockchain-based contract management.",
    "She holds a B.Math in Statistics from the University of Waterloo, an M.S. in Data Science & Analytics from Georgetown University, and an M.Eng. in Computer Science from Cornell Tech.",
  ],

  // what I'm exploring right now (shown as the "Now" section)
  // supports [text](url) link syntax (index.html converts it to <a> when rendering)
  now: [
    "Her current focus is LLMs and AI agents.",
    "She is also building [Schedule](https://schedule-drab-one.vercel.app), a small planner app.",
    "If you're exploring similar ideas, feel free to [reach out](mailto:keshi0330@gmail.com).",
  ],

  experience: [
    {
      company: "EnStream LP",
      url: "https://www.enstream.com/",
      role: "Data Engineer & Machine Learning Engineer",
      location: "Toronto, Canada",
      period: "Mar 2026 – Present",
      project: "Trust Score · Real-time Fraud & Identity Risk",
      stack: ["PySpark", "Kafka", "Terraform", "AWS", "Isolation Forest"],
      bullets: [
        "Own the data pipeline behind Trust Score (v0.5), EnStream's real-time fraud and identity-risk signal. It moves high-volume telecom events (SIM, device, port-out) into the feature layer that feeds scoring.",
        "Drive the unsupervised scoring core, built on Isolation Forest, its online Mondrian variant (iMF), and K-Means, to surface anomalous identity behavior without labels.",
        "Build the AWS infrastructure for Tulip, a cross-team data-exchange platform, entirely in Terraform, so the data pipeline and compute stay reproducible, version-controlled, and reviewable.",
      ],
    },
    {
      company: "Paytm Labs",
      url: "https://pi.paytm.com/", // company/school website makes this card a clickable link (new tab); leave empty for a plain info card
      role: "Data Scientist",
      location: "Toronto, Canada",
      period: "Jun 2024 – Jan 2026",
      project: "Real-time Fraud Detection System (ATO & CTO)",
      stack: ["PySpark", "AWS SageMaker", "Python", "SQL"],
      bullets: [
        "Built the account-takeover (ATO) model scoring 15M+ events/day; cut fraud losses ~60% with one-third the user friction. Distilled 600+ features to a top-50 set with SHAP and Bayesian optimization.",
        "Shipped the card-takeover (CTO) model serving 40M+ requests/day at under 12 ms, cutting fraud per million 37% while lifting approvals 30%; owned the TB-scale S3 migration, drift monitoring, and labeling that kept V1–V4 honest.",
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
        "Built a greenfield computer-vision surveillance system with YOLOv5 for real-time hazard and intrusion detection and automated alerts, trained on 400 GB+ of video from 200+ feeds, and benchmarked six architectures for edge deployment.",
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
        "Automated shareholder-risk detection with C/SQL over Wind financial data for a 7-analyst team, replacing manual verification and raising processing efficiency ~80%; managed delivery across three client portfolios.",
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
        "Optimized cryptographic modules and consensus on a proprietary blockchain platform (Hyperchain) and shipped two client products; benchmarked Hyperchain, Fabric, Libra, and PlatOn and distilled the results into a strategy report that shaped the roadmap.",
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
        "Researched blockchain for power-industry procurement (Hyperledger Fabric, SHA-256); co-authored an IEEE paper on a contract-management system that secured US$1B+ in contracts and cut settlement time ~66%.",
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

  // All projects, newest first. `todo: true` is an internal marker only (not rendered on the page):
  // final link / polish still missing; fix these selectively later.
  projects: [
    {
      name: "Align AI",
      featured: true, // shown by default; the rest collapse behind "Show all projects"
      sub: "Cornell Capstone · B2B SaaS",
      period: "Jan 2024 – May 2024",
      stack: ["Python", "GPT-4", "AWS", "Microservices", "React"],
      repo: "milestone-3-alignai",
      bullets: [
        "Co-founded a B2B SaaS that turns fragmented Jira and GitHub data into real-time engineering reports, built as Python microservices on AWS with an LLM inference engine (GPT-4). Shipped a production MVP to 3 pilot customers.",
      ],
    },
    {
      name: "miniTorch",
      featured: true,
      sub: "Deep-Learning Framework",
      period: "Jan 2024 – Apr 2024",
      stack: ["Python", "CUDA", "Autograd"],
      repo: "CS5781_minitorch",
      bullets: [
        "Built a teaching deep-learning framework from scratch: reverse-mode autodiff, tensors, modular layers, and custom CUDA kernels for GPU training.",
      ],
    },
    {
      name: "Blockchain from Scratch",
      sub: "Cornell · Consensus",
      period: "Jan 2024 – Apr 2024",
      stack: ["Python", "Proof-of-Work"],
      repo: "CS5433_BlockChain",
      bullets: [
        "Built a blockchain from scratch with proof-of-work, transactions, and consensus.",
      ],
    },
    {
      name: "Startup Systems",
      sub: "Cornell · Full-Stack",
      period: "Sep 2023 – Dec 2023",
      stack: ["JavaScript", "Web", "MVP"],
      repo: "CS5356_Building_Startup_System",
      bullets: [
        "Built a full-stack web app end-to-end in Cornell Tech's Building Startup Systems course, from product spec to a deployed MVP.",
      ],
    },
    {
      name: "Algorithm Toolkit",
      sub: "Cornell · Algorithms",
      period: "Sep 2023 – Dec 2023",
      stack: ["Python", "Data Structures", "Complexity"],
      repo: "CS5112_Algorithms",
      bullets: [
        "Implemented and analyzed core algorithms and data structures from Cornell Tech's graduate algorithms course.",
      ],
    },
    {
      name: "Network Systems",
      sub: "Cornell · Networks",
      period: "Sep 2023 – Dec 2023",
      stack: ["C", "Sockets", "TCP/IP"],
      repo: "CS5450_Network",
      bullets: [
        "Built protocol mechanics from the socket up in C for Cornell Tech's networks course.",
      ],
    },
    {
      name: "Reddit Game-Community Research",
      featured: true,
      sub: "NLP · Big Data",
      period: "Sep 2022 – Dec 2022",
      stack: ["PySpark", "LSTM", "Azure"], // sub already contains NLP; don't render it again in the meta line
      repo: "",
      url: "https://hotarugusa.github.io/reddit/index.html",
      bullets: [
        "Ran EDA, NLP, and a big-data pipeline over Reddit and YouTube data to study game communities, benchmarking classical ML against LSTM.",
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
        "Built an essay auto-grader scoring six writing traits for 8th–12th-grade ESL students, combining TF-IDF, a Conv1D model, and an SVM ensemble.",
      ],
    },
    {
      name: "Pawpularity",
      sub: "Kaggle · Computer Vision",
      period: "Sep 2022 – Dec 2022",
      stack: ["Conv2D", "Regression", "Python"],
      repo: "Pawpularity",
      bullets: [
        "Predicted shelter-pet photo appeal from images and tabular metadata for a Kaggle competition.",
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
        "Built utilities for cleaning, transforming, and packaging ML datasets: EDA helpers, ROC plots, and decision-tree and kd-tree KNN classifiers.",
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
        "Ran supervised and unsupervised analysis of the World Happiness dataset (KNN, Random Forest) and packaged it into a storytelling web page.",
      ],
    },
    {
      name: "The Magic Tower",
      sub: "Game",
      period: "Jan 2019 – Apr 2019",
      stack: ["C++", "UML"],
      repo: "The-Magic-Tower",
      bullets: [
        "Rebuilt the classic Magic Tower puzzle-RPG with four monster types and three boss stages.",
      ],
    },
  ],

  publications: [
    {
      title:
        "A Blockchain-Driven Electronic Contract Management System for Commodity Procurement in the Electronic Power Industry",
      venue: "IEEE Access", // exact journal name (verified via Crossref, DOI 10.1109/ACCESS.2021.3049562)
      date: "Jan 2021",
      url: "https://ieeexplore.ieee.org/document/9316177",
      note: "A process-oriented blockchain contract system (Hyperledger Fabric, SHA-256) deployed for a power-grid enterprise. Over 6,000 contracts and US$1B+ signed, with settlement time cut from about three months to one.",
    },
  ],

  // featured: true shown by default; the rest collapse behind "Show all certifications"
  certifications: [
    { name: "Claude Code in Action", authority: "Anthropic", date: "May 2026", url: "https://verify.skilljar.com/c/vjmkur55sxv3", featured: true },
    { name: "Claude Code 101", authority: "Anthropic", date: "May 2026", url: "https://verify.skilljar.com/c/no8kw6kydhqn", featured: true },
    { name: "Claude 101", authority: "Anthropic", date: "May 2026", url: "https://verify.skilljar.com/c/jt8kq2scu5q2", featured: true },
    { name: "Introduction to Claude Cowork", authority: "Anthropic", date: "May 2026", url: "https://verify.skilljar.com/c/yq93jiso5n7s", featured: true },
    { name: "Django App Development with SQL & Databases", authority: "IBM", date: "Nov 2023", url: "https://www.coursera.org/account/accomplishments/verify/EED4FG2STA9V" },
    { name: "Python for Data Science, AI & Development", authority: "IBM", date: "Oct 2023", url: "https://www.coursera.org/account/accomplishments/verify/VS74BKG63WWK" },
    { name: "Developing AI Applications with Python & Flask", authority: "IBM", date: "Oct 2023", url: "https://coursera.org/verify/QLPA24GG7NFU" },
    { name: "Linux Commands & Shell Scripting", authority: "IBM", date: "Sep 2023", url: "https://www.coursera.org/account/accomplishments/certificate/PXGCMF2GKJ7R" },
    { name: "Git & GitHub", authority: "IBM", date: "Sep 2023", url: "https://www.coursera.org/account/accomplishments/certificate/4F5S538PT5U5" },
    { name: "Introduction to Software Engineering", authority: "IBM", date: "Sep 2023", url: "https://www.coursera.org/account/accomplishments/certificate/BM6MMRXZZBKG" },
  ],

  skills: {
    // Category order follows work history: current DE role (data stack) → MLE/DS → AI focus → internships newest to oldest (CV → Viz → Blockchain)
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
    "Data, Cloud & MLOps": [
      "Spark / PySpark",
      "Kafka",
      "Kinesis",
      "dbt",
      "Hadoop",
      "Cassandra",
      "AWS (SageMaker · S3 · Athena · Redshift · Glue · Step Functions)",
      "Azure",
      "GCP",
      "Terraform",
      "Docker",
      "CI/CD",
      "Git",
      "ELK Stack",
      "Drift Monitoring",
      "Linux / UNIX",
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
      "Anomaly Detection (Isolation Forest · K-Means)",
    ],
    // Category names are uppercased by CSS: "NLP & LLMs" would render as "NLP & LLMS", which looks like a typo; use an uppercase-safe name
    "Language Models & NLP": [
      "LLMs (GPT-4 · Claude)",
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
    "Data Viz": ["Tableau", "Matplotlib", "ECharts", "D3.js"],
    Blockchain: ["Hyperledger Fabric", "Smart Contracts", "Cryptography"],
    Languages: ["Chinese (native)", "English (native)", "Japanese (JLPT N3)", "French (basic)"],
  },

  footprints: {
    // Country count comes from data/footprints.json (countryCount); the 1999 start year is the user's choice (life span,
    // independent of the map's year band); "some photos" wording = only some are web images (own photos withheld for privacy)
    title: "A map of everywhere she's been",
    meta: "13 countries · 1999–2026 · some photos from the web",
    href: "footprints.html",
  },
};
