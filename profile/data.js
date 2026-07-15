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
    "Sherry (Ke) Shi is a Data Engineer & Machine Learning Engineer at EnStream. She owns the data pipeline behind Trust Score, which flags fraud and identity risk across live telecom events, and she builds the AWS platform behind the company's cross-industry fraud data exchange.",
    "She was previously a Data Scientist at Paytm Labs, working on real-time fraud detection. Her account-takeover model scored over 15 million events a day and cut fraud losses by about 60% while easing user friction; a card-takeover model handled over 40 million requests a day at under 12 ms each. Her wider work spans computer vision and NLP, and she co-authored an IEEE paper on blockchain-based contract management.",
    "She holds a B.Math in Statistics from the University of Waterloo, an M.S. in Data Science & Analytics from Georgetown University, and an M.Eng. in Computer Science from Cornell Tech.",
  ],

  // what I'm exploring right now (shown as the "Now" section)
  // supports [text](url) link syntax (index.html converts it to <a> when rendering)
  now: [
    "Her current focus is LLMs and AI agents.",
    "She is also building [Schedule](https://schedule-drab-one.vercel.app), a local-first task planner that works fully offline.",
    "If you're exploring similar ideas, feel free to [reach out](mailto:keshi0330@gmail.com).",
  ],

  experience: [
    {
      company: "EnStream LP",
      url: "https://www.enstream.com/",
      role: "Data Engineer & Machine Learning Engineer",
      location: "Toronto, Canada",
      period: "Mar 2026 – Present",
      project: "Trust Score · Real-time Fraud & Identity Risk · Cross-industry Fraud Data Exchange",
      stack: ["AWS", "PySpark", "Python", "Kafka", "Isolation Forest"],
      bullets: [
        "Own the Trust Score pipeline end to end: 40M+ telecom events a quarter, scored without labels for v0.5–v1 by Isolation Forest, its online Mondrian variant (iMF), and K-Means, at 80% precision and recall.",
        "Provision the exchange's AWS stack in Terraform: dynamic profiles isolating QA / staging / prod data, PII sealed under its own CMK, a 99.5% uptime target in production.",
        "Design the exchange's data architecture and build its Iceberg lakehouse: 400+ GB of telco and bank fraud reports merged into one canonical record that tracks fraudsters through ports, recycles, and new numbers.",
        "Serve lookups on a hybrid path: batch-materialized answers from DynamoDB when fresh, live re-enrichment through carrier and porting APIs when stale.",
      ],
    },
    {
      company: "Paytm Labs",
      url: "https://pi.paytm.com/", // company/school website makes this card a clickable link (new tab); leave empty for a plain info card
      role: "Data Scientist",
      location: "Toronto, Canada",
      period: "Jun 2024 – Jan 2026",
      project: "Real-time Fraud Detection · Account & Card Takeover",
      stack: ["Python", "SQL", "AWS", "PySpark", "XGBoost"],
      bullets: [
        "Built the account-takeover (ATO) model scoring 15M+ events/day; cut fraud losses ~60% with one-third the user friction. Distilled 600+ features to a top-50 set with SHAP and Bayesian optimization.",
        "Shipped the card-takeover (CTO) model serving 40M+ requests/day at under 12 ms and ~$30/day to run, cutting fraud per million transactions by 37% and the false-positive rate by 30%.",
        "Ran the TB-scale data migration and the MLOps lifecycle on SageMaker and Spark, rebuilding transformation logic for strict feature parity; designed the 5-day-lookback labeling strategy and automated drift monitoring that kept v1–v4 honest.",
      ],
    },
    {
      company: "Tiancheng Zhilian Technology",
      url: "",
      role: "Machine Learning Engineer Intern",
      location: "Hangzhou, China",
      period: "Jan 2023 – Aug 2023",
      project: "Intelligent Security Surveillance & Anomaly Detection",
      stack: ["YOLOv5", "PyTorch", "TensorFlow", "OpenCV", "Python"],
      bullets: [
        "Trained a YOLOv5 detector for real-time person detection and behavior recognition over a 200 km² industrial-use lake, flagging intrusions into restricted areas and other suspicious activity.",
        "Ingested live streams from 50 cameras, boxed detected people in real time, and pushed automated alerts to the duty room.",
        "Owned delivery end to end as the project's only engineer: 400+ GB of training footage, model training, and a 6-architecture benchmark for edge deployment; live in a two-month trial.",
      ],
    },
    {
      company: "Benyang Investment",
      url: "",
      role: "Business Analyst Intern",
      location: "Shanghai, China",
      period: "Mar 2022 – Aug 2022",
      project: "Equity Sell-Down Advisory · Stock-Data Automation",
      stack: ["C", "SQL", "Python", "Wind", "Excel"],
      bullets: [
        "Wrote a C/SQL program that automated stock-data processing and shareholder-risk checks over Wind market data for a 7-analyst team, replacing manual verification and raising query efficiency ~80%.",
        "Supported client equity sell-downs across 3 portfolios, tracking holdings against regulatory sell-down limits and preparing client deliverables.",
      ],
    },
    {
      company: "Georgetown University",
      url: "https://www.georgetown.edu/",
      role: "Graduate Teaching Assistant",
      location: "Washington, D.C. (partly remote)",
      period: "Jan 2022 – Dec 2022",
      project: "Data Structures · Time Series Analysis",
      stack: ["Python", "C++", "R", "GitHub"],
      bullets: [
        "Taught labs and handled all grading and code reviews for 40+ graduate students across 2 core courses: Data Structures in Python and C++, and Time Series Analysis in R.",
        "Held office hours and set up the class Slack and GitHub org, walking students through debugging their code and assignment questions.",
      ],
    },
    {
      company: "Sunyard System Engineering",
      url: "https://www.sunyard.com/",
      role: "Data Scientist Intern",
      location: "Hangzhou, China",
      period: "Feb 2021 – Aug 2021",
      project: "WeChat Scan-to-Order Platform · Merchant Analytics & Device Monitoring",
      stack: ["ELK Stack", "ECharts", "D3.js", "Python", "SQL"],
      bullets: [
        "Delivered the MVP analytics module of a WeChat scan-to-order mini program serving 100+ merchants: ECharts and D3.js dashboards tracking orders and merchant activity across the platform.",
        "Set up the ELK Stack anomaly-warning system over the platform's operation logs, tuning alert rules from EDA to replace manual device inspection.",
      ],
    },
    {
      company: "Hangzhou Qulian Technology",
      url: "https://www.hyperchain.cn/",
      role: "Software Engineer Intern · Blockchain",
      location: "Hangzhou, China",
      period: "Mar 2020 – Aug 2020",
      project: "Hyperchain Blockchain Platform",
      stack: ["Go", "C++", "Python", "Cryptography", "Consensus Algorithms"],
      bullets: [
        "Optimized cryptographic modules and consensus on Hyperchain, a proprietary blockchain platform, and shipped 2 client products built on it.",
        "Benchmarked Hyperchain against Fabric, Libra, and PlatOn, and distilled the results into a strategy report that shaped the platform roadmap.",
      ],
    },
    {
      company: "Hong Kong Baptist University",
      url: "https://www.hkbu.edu.hk/",
      role: "Undergraduate Research Assistant",
      location: "Hong Kong (remote)",
      period: "Jan 2020 – Jan 2021",
      project: "Blockchain & FinTech Research",
      stack: ["Hyperledger Fabric", "Smart Contracts", "Cryptography"],
      bullets: [
        "Researched blockchain contract management on BEcontractor, a Hyperledger Fabric system that moved a power-grid enterprise's procurement online during COVID-19, handling US$1B+ in contracts and cutting settlement time ~66%.",
        "Co-authored the IEEE Access paper presenting the system and its rollout across the enterprise's nationwide suppliers, published in 2021.",
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
      note: "Merit Scholarship",
    },
  ],

  // All projects, newest first. `todo: true` is an internal marker only (not rendered on the page):
  // final link / polish still missing; fix these selectively later.
  projects: [
    {
      name: "Schedule",
      featured: true, // current side project; shown first
      sub: "Local-first Task Planner",
      period: "May 2026 – Present",
      stack: ["React", "TypeScript", "Vite", "Supabase", "PWA"],
      url: "https://schedule-drab-one.vercel.app",
      bullets: [
        "Build a local-first task planner in React + TypeScript with 7 linked views from year to day, nested cross-date subtasks, and progress bars that track tasks done against time elapsed; it runs fully offline as a PWA, with optional Supabase cloud sync across devices.",
      ],
    },
    {
      name: "Align AI",
      featured: true, // shown by default; the rest collapse behind "Show all projects"
      sub: "Cornell Capstone · B2B SaaS",
      period: "Jan 2024 – May 2024",
      stack: ["Python", "GPT-4", "AWS", "Microservices", "React"],
      repo: "milestone-3-alignai",
      bullets: [
        "Co-founded a B2B SaaS that turns fragmented Jira and GitHub data into live engineering reports, built as Python microservices on AWS with GPT-4 doing the analysis. Shipped the MVP to 3 pilot customers after 60+ discovery interviews.",
      ],
    },
    {
      name: "miniTorch",
      sub: "Deep-learning Framework",
      period: "Jan 2024 – Apr 2024",
      stack: ["Python", "CUDA", "Autograd"],
      repo: "CS5781_minitorch",
      bullets: [
        "Wrote a PyTorch-style deep-learning framework from scratch: reverse-mode autodiff, tensors, modular layers, and custom CUDA kernels for GPU training.",
      ],
    },
    {
      name: "Blockchain from Scratch",
      sub: "Cornell · Consensus",
      period: "Jan 2024 – Apr 2024",
      stack: ["Java", "Python", "Solidity"],
      repo: "CS5433_BlockChain",
      bullets: [
        "Implemented a cryptocurrency's moving parts in Java: UTXO transaction validation, consensus in a simulated network with adversarial nodes, and a forking blockchain with pruning, plus Merkle proofs in Python and an ERC-20 token in Solidity.",
      ],
    },
    {
      name: "Startup Systems",
      sub: "Cornell · Full-Stack",
      period: "Sep 2023 – Dec 2023",
      stack: ["React", "TypeScript", "Firebase"],
      repo: "CS5356_Building_Startup_System",
      bullets: [
        "Took a web app from spec to deployment across three milestones, ending in the first cut of Align AI: a task tracker in React and TypeScript on Firebase Auth and Firestore.",
      ],
    },
    {
      name: "Algorithm Toolkit",
      sub: "Cornell · Algorithms",
      period: "Sep 2023 – Dec 2023",
      stack: ["Python", "Data Structures", "Complexity"],
      repo: "CS5112_Algorithms",
      bullets: [
        "Solved a semester of Kleinberg & Tardos problems in Python: stable matching, Karatsuba and FFT multiplication, max-flow modeling, and count-min sketch streaming.",
      ],
    },
    {
      name: "Network Systems",
      sub: "Cornell · Networks",
      period: "Sep 2023 – Dec 2023",
      stack: ["C", "UDP", "Go-Back-N"],
      repo: "CS5450_Network",
      bullets: [
        "Built a Go-Back-N reliable-transport protocol in C on top of UDP sockets: sliding-window sender and receiver with timeouts and retransmission.",
      ],
    },
    {
      name: "Auto-Grader for ESL Essays",
      sub: "Kaggle · NLP",
      period: "Sep 2022 – Dec 2022",
      stack: ["TF-IDF", "Conv1D", "SVM"], // sub already contains NLP; don't render it again in the meta line
      repo: "",
      url: "https://github.com/kkkkshi/ANLY580_Final_Project",
      bullets: [
        "Trained an essay auto-grader scoring 6 writing traits for 8th–12th-grade ESL students, combining TF-IDF, a Conv1D model, and an SVM ensemble.",
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
      stack: ["AlexNet", "Inception v3", "VGG", "YOLOv4"],
      repo: "",
      url: "https://github.com/kkkkshi/ANLY677_Final_Project",
      bullets: [
        "Benchmarked AlexNet, Inception v3, VGG, and YOLOv4 to flag incorrect mask-wearing, comparing accuracy across COVID-era settings.",
      ],
    },
    {
      name: "Reddit Game-Community Research",
      sub: "NLP · Big Data",
      period: "Jan 2022 – Apr 2022", // per the 2026 résumé (site previously said Sep–Dec 2022)
      stack: ["PySpark", "LSTM", "Azure"], // sub already contains NLP; don't render it again in the meta line
      repo: "",
      url: "https://hotarugusa.github.io/reddit/index.html",
      bullets: [
        "Mined 100k+ Reddit and YouTube records to study game communities: EDA and NLP on a PySpark pipeline, benchmarking classical ML against an LSTM, with the best model hitting 97.8% validation accuracy.",
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
        "Pulled and cleaned data for 200+ U.S. cities via APIs, visualized it in R and Matplotlib, and built an HTML/CSS storytelling page on STEM-city real-estate trends.",
      ],
    },
    {
      name: "Dataset Toolbox",
      sub: "Tooling",
      period: "Jan 2022 – Apr 2022",
      stack: ["Python", "KD-Tree", "Apriori"],
      repo: "Dataset_Toolbox",
      bullets: [
        "Hand-built an OOP data-mining toolkit in pure Python instead of scikit-learn: six dataset types with their own cleaning and EDA, KNN with a KD-Tree fast path, Apriori rule mining, and cross-validated ROC evaluation, each method annotated with its complexity.",
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
        "Analyzed the World Happiness dataset with supervised and unsupervised methods and turned the findings into a narrative web page.",
      ],
    },
    {
      name: "ChamberCrawler3000+",
      sub: "Game",
      period: "Jan 2019 – Apr 2019",
      stack: ["C++", "UML"],
      repo: "The-Magic-Tower", // repo slug kept its old name; contents are CC3K+
      bullets: [
        "Made a terminal rogue-like in C++: five randomly generated floors of chambers, playable races, enemies and potions, and runs reproducible from a fixed seed or layout file.",
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
      note: "A process-oriented blockchain contract system on Hyperledger Fabric, deployed for a power-grid enterprise. 6,000+ contracts worth US$1B+ signed, with settlement time cut from about three months to one.",
    },
  ],

  // featured: true shown by default; the rest collapse behind "Show all certifications"
  certifications: [
    { name: "Claude Code in Action", authority: "Anthropic", date: "May 2026", url: "https://verify.skilljar.com/c/vjmkur55sxv3", featured: true },
    { name: "Claude Code 101", authority: "Anthropic", date: "May 2026", url: "https://verify.skilljar.com/c/no8kw6kydhqn" },
    { name: "Claude 101", authority: "Anthropic", date: "May 2026", url: "https://verify.skilljar.com/c/jt8kq2scu5q2" },
    { name: "Introduction to Claude Cowork", authority: "Anthropic", date: "May 2026", url: "https://verify.skilljar.com/c/yq93jiso5n7s" },
    { name: "Django App Development with SQL & Databases", authority: "IBM", date: "Nov 2023", url: "https://www.coursera.org/account/accomplishments/verify/EED4FG2STA9V" },
    { name: "Python for Data Science, AI & Development", authority: "IBM", date: "Oct 2023", url: "https://www.coursera.org/account/accomplishments/verify/VS74BKG63WWK", featured: true },
    { name: "Developing AI Applications with Python & Flask", authority: "IBM", date: "Oct 2023", url: "https://www.coursera.org/verify/QLPA24GG7NFU", featured: true },
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
      "Data Modeling",
      "Hadoop",
      "Cassandra",
      "AWS (S3 · Glue · Athena · Lake Formation · Lambda · EC2 · Step Functions · IAM · KMS · SageMaker · Redshift)",
      "Azure",
      "GCP",
      "Terraform",
      "Docker",
      "CI/CD",
      "Git",
      "ELK Stack",
      "Drift Monitoring",
      "Data Governance",
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
