export const portfolioData = {
  name: "Kushal",
  role: "Software Engineer",
  tagline: "Building Robust Software, Scalable Backends & High-Reliability Systems",
  location: "Belagavi, Karnataka, India",
  phone: "+91 6366136055",
  email: "kushalhiremath9@gmail.com",
  about: "Electronics & Communication Engineering graduate with hands-on experience across full-stack development, software quality engineering, and embedded firmware. Proficient in Java, C++, Python, Spring Boot, REST APIs, and database architecture. Actively seeking Software Engineer (SWE) and IT opportunities to develop high-performance, scalable applications and solve real-world problems.",
  
  stats: [
    { label: "Engineering Grad", value: "2025" },
    { label: "Primary Languages", value: "Java, C++, Python" },
    { label: "Target Roles", value: "Software Engineer / SWE" },
    { label: "Academic Record", value: "KLE Tech Univ" }
  ],

  experience: [
    {
      title: "Quality Assurance Software Tester",
      company: "Ajinkya Technologies",
      location: "Belagavi, Karnataka",
      period: "Jan 2026 – Jun 2026",
      type: "Professional Experience",
      highlights: [
        "Performed manual testing of web and mobile applications to validate functionality, usability, and application behavior.",
        "Designed and executed comprehensive test cases based on application requirements and documented test results.",
        "Identified, reported, and tracked software defects, collaborating closely with developers to support timely resolution.",
        "Participated in requirement analysis and application validation to improve overall software quality."
      ],
      tags: ["Manual Testing", "Test Scenarios", "STLC", "Defect Tracking", "Regression Testing"]
    },
    {
      title: "Firmware Developer",
      company: "Simply Link Tech Solutions",
      location: "Belagavi, Karnataka",
      period: "Jun 2025 – Sep 2025",
      type: "Internship / Experience",
      highlights: [
        "Developed ESP32-based IoT applications using C++ and LVGL for embedded graphical user interfaces.",
        "Worked with hardware communication protocols (I2C, SPI, UART) to support reliable communication between embedded components.",
        "Contributed to ESP32-based product development, rigorous hardware debugging, and functional improvements."
      ],
      tags: ["C++", "ESP32", "LVGL", "Hardware Protocols", "IoT Architecture"]
    }
  ],

  projects: [
    {
      id: "buildpay-transaction-management",
      title: "BuildPay – Construction Payment & Transaction Management",
      category: "Frontend Stack",
      description: "A comprehensive construction payment management dashboard engineered for builders, contractors, and site managers to track labour and contractor payments, monitor project budgets and expenses, manage real-time transactions, export detailed Excel reports, and securely synchronize financial records across devices using Firebase.",
      tech: ["React", "Firebase", "Cloud Sync", "Excel Export", "Budget & Expense Tracking", "Transaction Management"],
      metrics: "Live Cloud Sync & Reports",
      icon: "CreditCard"
    },
    {
      id: "employee-management",
      title: "Employee Management System",
      category: "Software Engineering & Backend",
      description: "Architected and engineered a comprehensive employee management platform supporting full CRUD operations, database schema normalization, transaction handling, and secure database connectivity using Java and MySQL.",
      tech: ["Java", "MySQL", "JDBC", "CRUD Operations", "Spring Concepts", "Database Design"],
      metrics: "Full CRUD Architecture",
      icon: "Users"
    },
    {
      id: "netflix-analysis",
      title: "Netflix Data Analysis",
      category: "Data Science & Analytics",
      description: "Analyzed 8,807 Netflix titles using Python, Pandas, Matplotlib, and Seaborn. Performed in-depth data cleaning, exploratory data analysis, and visualization to identify content distribution, country trends, movie durations, and yearly additions.",
      tech: ["Python", "Pandas", "Matplotlib", "Seaborn", "EDA"],
      metrics: "8,807+ Records Processed",
      icon: "Film"
    },
    {
      id: "house-price-prediction",
      title: "House Price Prediction System",
      category: "Machine Learning & Algorithms",
      description: "Developed a supervised Machine Learning model using Linear Regression to predict house prices based on multiple features. Included feature engineering, statistical preprocessing, and evaluation using Python, Pandas, NumPy, and Scikit-learn.",
      tech: ["Python", "Scikit-learn", "NumPy", "Pandas", "Linear Regression"],
      metrics: "Supervised ML Regression",
      icon: "Home"
    }
  ],

  skills: {
    "Programming Languages": [
      { name: "Java (Core & OOP)", level: 90, color: "#e5c07b" },
      { name: "C++ (Data Structures)", level: 90, color: "#61afef" },
      { name: "Python", level: 85, color: "#98c379" }
    ],
    "Backend & Databases": [
      { name: "MySQL & Oracle SQL", level: 88 },
      { name: "JDBC & CRUD Architecture", level: 88 },
      { name: "Spring & Spring Boot", level: 80 },
      { name: "Relational Modeling & Joins", level: 85 }
    ],
    "Software & API Testing": [
      { name: "REST API Testing (Postman)", level: 88 },
      { name: "Manual & Functional Testing", level: 95 },
      { name: "System, Smoke & Regression Testing", level: 90 },
      { name: "STLC & Test Design", level: 92 }
    ],
    "Systems & Web Technologies": [
      { name: "HTML & CSS", level: 82 },
      { name: "ESP32 & IoT Embedded Systems", level: 86 },
      { name: "Hardware Protocols (I2C, SPI, UART)", level: 82 },
      { name: "LVGL Embedded GUI", level: 84 }
    ],
    "Developer Tools & Practices": [
      { name: "Git & GitHub", level: 88 },
      { name: "VS Code", level: 92 },
      { name: "Jira (Agile/Scrum)", level: 85 },
      { name: "Problem Solving & Analytical Thinking", level: 92 }
    ]
  },

  education: [
    {
      degree: "Bachelor of Engineering in Electronics & Communication",
      institution: "KLE Technological University",
      period: "2021 – 2025",
      score: "64.12%",
      details: "Comprehensive coursework in Embedded Systems, Computer Networks, Object-Oriented Programming, and Software Engineering."
    },
    {
      degree: "Pre-University Education (Science)",
      institution: "KLE Independent Pre-University College",
      period: "2019 – 2021",
      score: "82.00%",
      details: "Physics, Chemistry, Mathematics, Electronics."
    },
    {
      degree: "Secondary School Leaving Certificate (SSLC)",
      institution: "S.R. Chandak English High School, Solapur",
      period: "2018 – 2019",
      score: "87.60%",
      details: "Graduated with distinction."
    }
  ],

  activities: [
    "Participated in technical workshops, startup mockups, and professional technology events.",
    "Attended industry networking events focused on software development and technology innovation.",
    "Passionate about scalable architecture, algorithm design, and reliable software delivery."
  ]
};
