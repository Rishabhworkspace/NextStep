export type CareerPath =
  | "swe"
  | "ds"
  | "ml"
  | "design"
  | "pm"
  | "security"
  | "fullstack"
  | "devops"
  | "mobile"
  | "cloud"
  | "blockchain"
  | "gamedev"
  | "ba"
  | "marketing"

export interface Question {
  id: string
  concept: string
  question: string
  options: string[]
  correctIndex: number
  difficulty: "easy" | "medium" | "hard"
}

export interface PathConfig {
  label: string
  topics: string[]
}

// ─── Path Metadata ───────────────────────────────────────
export const PATH_CONFIG: Record<CareerPath, PathConfig> = {
  swe: {
    label: "Software Engineer",
    topics: ["Data Structures", "Algorithms", "System Design", "OOP", "Testing"],
  },
  ds: {
    label: "Data Scientist",
    topics: ["Python", "Statistics", "SQL", "Pandas/NumPy", "ML Basics", "Data Visualization"],
  },
  ml: {
    label: "ML Engineer",
    topics: ["ML Algorithms", "Deep Learning", "Math", "NLP", "Computer Vision", "Model Evaluation"],
  },
  design: {
    label: "Product Designer",
    topics: ["UI Principles", "UX Research", "Design Tools", "Typography", "Color Theory", "Accessibility"],
  },
  pm: {
    label: "Product Manager",
    topics: ["Product Strategy", "Metrics", "Agile", "User Research", "Prioritization", "Roadmapping"],
  },
  security: {
    label: "Security Analyst",
    topics: ["Network Security", "Cryptography", "OWASP", "Linux", "Authentication", "Ethical Hacking"],
  },
  fullstack: {
    label: "Full Stack Developer",
    topics: ["HTML/CSS", "JavaScript", "React", "Node.js", "Databases", "REST APIs", "TypeScript", "Git"],
  },
  devops: {
    label: "DevOps Engineer",
    topics: ["Docker", "Kubernetes", "CI/CD", "Linux", "AWS", "Monitoring", "Networking"],
  },
  mobile: {
    label: "Mobile App Developer",
    topics: ["React Native", "Flutter", "Mobile UI", "App Lifecycle", "APIs", "Storage"],
  },
  cloud: {
    label: "Cloud Architect",
    topics: ["AWS", "GCP/Azure", "Serverless", "Networking", "Security", "Infrastructure"],
  },
  blockchain: {
    label: "Blockchain Developer",
    topics: ["Solidity", "Smart Contracts", "Web3", "Cryptography", "DeFi", "Consensus"],
  },
  gamedev: {
    label: "Game Developer",
    topics: ["Game Design", "Unity/C#", "Physics", "Graphics", "AI in Games", "Multiplayer"],
  },
  ba: {
    label: "Business Analyst",
    topics: ["Requirements", "SQL", "Data Analysis", "Process Modeling", "Stakeholder Mgmt", "Tools"],
  },
  marketing: {
    label: "Digital Marketer",
    topics: ["SEO", "Google Ads", "Social Media", "Analytics", "Content Strategy", "Email Marketing"],
  },
}

// ─── Question Banks (placeholder — user will provide real questions) ─────
// Each path has ~5 sample questions for now. User will replace with 100 per path.

const QUESTION_BANKS: Record<CareerPath, Question[]> = {
  swe: [
    { id: "swe-1", concept: "Data Structures", question: "What is the time complexity of accessing an element in an array by index?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correctIndex: 0, difficulty: "easy" },
    { id: "swe-2", concept: "Data Structures", question: "Which data structure uses LIFO (Last In First Out) principle?", options: ["Queue", "Stack", "Linked List", "Tree"], correctIndex: 1, difficulty: "easy" },
    { id: "swe-3", concept: "Algorithms", question: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correctIndex: 1, difficulty: "easy" },
    { id: "swe-4", concept: "Algorithms", question: "Which sorting algorithm has the best average-case time complexity?", options: ["Bubble Sort O(n²)", "Merge Sort O(n log n)", "Selection Sort O(n²)", "Insertion Sort O(n²)"], correctIndex: 1, difficulty: "medium" },
    { id: "swe-5", concept: "System Design", question: "What is the primary benefit of horizontal scaling?", options: ["Simpler code", "Handles more traffic by adding machines", "Reduces memory usage", "Faster disk I/O"], correctIndex: 1, difficulty: "medium" },
    { id: "swe-6", concept: "OOP", question: "What does the SOLID 'S' stand for?", options: ["Single Responsibility", "Static Typing", "Structural Design", "Sequential Processing"], correctIndex: 0, difficulty: "easy" },
    { id: "swe-7", concept: "Data Structures", question: "Which data structure is best for implementing an LRU cache?", options: ["Array", "Stack", "HashMap + Doubly Linked List", "Binary Tree"], correctIndex: 2, difficulty: "hard" },
    { id: "swe-8", concept: "Algorithms", question: "What algorithmic paradigm does Dijkstra's shortest path use?", options: ["Dynamic Programming", "Divide and Conquer", "Greedy", "Backtracking"], correctIndex: 2, difficulty: "medium" },
    { id: "swe-9", concept: "Testing", question: "What does TDD stand for?", options: ["Type-Driven Design", "Test-Driven Development", "Task-Driven Delivery", "Technical Design Document"], correctIndex: 1, difficulty: "easy" },
    { id: "swe-10", concept: "System Design", question: "What is a CDN primarily used for?", options: ["Database replication", "Serving static content closer to users", "Load balancing APIs", "Encrypting data"], correctIndex: 1, difficulty: "easy" },
  ],
  ds: [
    { id: "ds-1", concept: "Python", question: "What is the output of `type([]) is list` in Python?", options: ["True", "False", "TypeError", "None"], correctIndex: 0, difficulty: "easy" },
    { id: "ds-2", concept: "Statistics", question: "What is the median of the dataset [1, 3, 5, 7, 9]?", options: ["3", "5", "7", "4"], correctIndex: 1, difficulty: "easy" },
    { id: "ds-3", concept: "SQL", question: "Which SQL clause is used to filter rows?", options: ["SELECT", "WHERE", "ORDER BY", "GROUP BY"], correctIndex: 1, difficulty: "easy" },
    { id: "ds-4", concept: "Pandas/NumPy", question: "How do you select a column 'age' from a DataFrame df?", options: ["df.age()", "df['age']", "df.get_column('age')", "df.select('age')"], correctIndex: 1, difficulty: "easy" },
    { id: "ds-5", concept: "ML Basics", question: "What type of ML problem is email spam detection?", options: ["Regression", "Clustering", "Classification", "Reinforcement Learning"], correctIndex: 2, difficulty: "easy" },
    { id: "ds-6", concept: "Statistics", question: "What does a p-value less than 0.05 typically indicate?", options: ["Weak correlation", "Statistical significance", "Large sample size", "Normal distribution"], correctIndex: 1, difficulty: "medium" },
    { id: "ds-7", concept: "Python", question: "Which keyword creates a generator function in Python?", options: ["return", "generate", "yield", "async"], correctIndex: 2, difficulty: "medium" },
    { id: "ds-8", concept: "Data Visualization", question: "Which chart type is best to show distribution of a single variable?", options: ["Pie chart", "Histogram", "Line chart", "Scatter plot"], correctIndex: 1, difficulty: "easy" },
    { id: "ds-9", concept: "SQL", question: "What type of JOIN returns rows when there is a match in both tables?", options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "CROSS JOIN"], correctIndex: 2, difficulty: "easy" },
    { id: "ds-10", concept: "ML Basics", question: "What is overfitting?", options: ["Model is too simple", "Model memorizes training data and fails on new data", "Model has high bias", "Model runs too slowly"], correctIndex: 1, difficulty: "medium" },
  ],
  ml: [
    { id: "ml-1", concept: "ML Algorithms", question: "Which algorithm is commonly used for classification with a linear decision boundary?", options: ["K-Means", "Logistic Regression", "PCA", "DBSCAN"], correctIndex: 1, difficulty: "easy" },
    { id: "ml-2", concept: "Deep Learning", question: "What is an activation function in neural networks?", options: ["A loss function", "A function that introduces non-linearity", "An optimizer", "A regularization technique"], correctIndex: 1, difficulty: "easy" },
    { id: "ml-3", concept: "Math", question: "What does the gradient in gradient descent represent?", options: ["The loss value", "The direction of steepest ascent", "The learning rate", "The batch size"], correctIndex: 1, difficulty: "medium" },
    { id: "ml-4", concept: "NLP", question: "What does TF-IDF stand for?", options: ["Total Feature - Inverse Data Frequency", "Term Frequency - Inverse Document Frequency", "Text Format - Index Data File", "Transform Feature - Input Data Format"], correctIndex: 1, difficulty: "medium" },
    { id: "ml-5", concept: "Model Evaluation", question: "What metric is best for imbalanced classification?", options: ["Accuracy", "F1 Score", "MSE", "R²"], correctIndex: 1, difficulty: "medium" },
    { id: "ml-6", concept: "Deep Learning", question: "What is the purpose of dropout in neural networks?", options: ["Speed up training", "Prevent overfitting", "Increase accuracy", "Reduce model size"], correctIndex: 1, difficulty: "medium" },
    { id: "ml-7", concept: "Computer Vision", question: "What type of neural network is primarily used for image classification?", options: ["RNN", "CNN", "GAN", "Transformer"], correctIndex: 1, difficulty: "easy" },
    { id: "ml-8", concept: "ML Algorithms", question: "What is the curse of dimensionality?", options: ["Too many models", "Performance degrades with too many features", "Too few data points", "Slow training"], correctIndex: 1, difficulty: "hard" },
    { id: "ml-9", concept: "Math", question: "What is the derivative of x² with respect to x?", options: ["x", "2x", "x²", "2"], correctIndex: 1, difficulty: "easy" },
    { id: "ml-10", concept: "NLP", question: "What is a word embedding?", options: ["A dictionary lookup", "A dense vector representation of words", "A binary encoding", "A hash code"], correctIndex: 1, difficulty: "medium" },
  ],
  design: [
    { id: "design-1", concept: "UI Principles", question: "What does the design principle 'Fitts's Law' describe?", options: ["Color contrast ratios", "Time to reach a target is based on its size and distance", "Typography hierarchy", "Grid alignment"], correctIndex: 1, difficulty: "medium" },
    { id: "design-2", concept: "UX Research", question: "What is a user persona?", options: ["A real user profile", "A fictional character representing a user segment", "A login avatar", "A UI component"], correctIndex: 1, difficulty: "easy" },
    { id: "design-3", concept: "Design Tools", question: "What is Figma's 'Auto Layout' used for?", options: ["Animating components", "Responsive and flexible frame layouts", "Exporting assets", "Version control"], correctIndex: 1, difficulty: "easy" },
    { id: "design-4", concept: "Typography", question: "What is the recommended minimum body text size for web?", options: ["10px", "12px", "16px", "20px"], correctIndex: 2, difficulty: "easy" },
    { id: "design-5", concept: "Color Theory", question: "What are complementary colors?", options: ["Colors next to each other on the color wheel", "Colors opposite each other on the color wheel", "Same hue, different saturation", "Grayscale variants"], correctIndex: 1, difficulty: "easy" },
    { id: "design-6", concept: "Accessibility", question: "What is the minimum contrast ratio for WCAG AA text?", options: ["2:1", "3:1", "4.5:1", "7:1"], correctIndex: 2, difficulty: "medium" },
    { id: "design-7", concept: "UI Principles", question: "What is 'visual hierarchy' in design?", options: ["Arranging elements by file size", "Guiding the eye through size, color, and placement", "Alphabetical ordering", "Layer ordering in Figma"], correctIndex: 1, difficulty: "easy" },
    { id: "design-8", concept: "UX Research", question: "What is a usability test?", options: ["A performance benchmark", "Observing users interact with a product to find issues", "A unit test for components", "An A/B test"], correctIndex: 1, difficulty: "easy" },
    { id: "design-9", concept: "Design Tools", question: "What is a design token?", options: ["A payment method", "A named value for design decisions (colors, spacing, etc.)", "A Figma plugin", "An animation keyframe"], correctIndex: 1, difficulty: "medium" },
    { id: "design-10", concept: "Accessibility", question: "What does ARIA stand for?", options: ["Accessible Rich Internet Applications", "Auto Responsive Interface Architecture", "Advanced Rendering Input API", "Adaptive Resource Integration Access"], correctIndex: 0, difficulty: "medium" },
  ],
  pm: [
    { id: "pm-1", concept: "Product Strategy", question: "What is a product's 'North Star Metric'?", options: ["Revenue", "The single metric that best captures core value delivered to customers", "Daily active users", "App store rating"], correctIndex: 1, difficulty: "medium" },
    { id: "pm-2", concept: "Metrics", question: "What does DAU stand for?", options: ["Data Analysis Unit", "Daily Active Users", "Design Architecture Update", "Development Automation Utility"], correctIndex: 1, difficulty: "easy" },
    { id: "pm-3", concept: "Agile", question: "What is a 'sprint' in Scrum?", options: ["A bug fix session", "A time-boxed iteration (usually 2 weeks)", "A design review", "A customer interview"], correctIndex: 1, difficulty: "easy" },
    { id: "pm-4", concept: "User Research", question: "What is a Jobs-to-be-Done (JTBD) framework?", options: ["A hiring framework", "Understanding why users 'hire' a product to accomplish a task", "A project management tool", "A testing methodology"], correctIndex: 1, difficulty: "medium" },
    { id: "pm-5", concept: "Prioritization", question: "What framework uses Impact and Effort to prioritize features?", options: ["SWOT Analysis", "ICE Score", "Impact-Effort Matrix", "MoSCoW"], correctIndex: 2, difficulty: "medium" },
    { id: "pm-6", concept: "Product Strategy", question: "What is product-market fit?", options: ["When a product's features match competitors", "When a product satisfies a strong market demand", "When revenue exceeds costs", "When all features are shipped"], correctIndex: 1, difficulty: "easy" },
    { id: "pm-7", concept: "Metrics", question: "What is churn rate?", options: ["Rate of new signups", "Percentage of customers who stop using the product", "Revenue growth rate", "Page load speed"], correctIndex: 1, difficulty: "easy" },
    { id: "pm-8", concept: "Roadmapping", question: "What is a product roadmap?", options: ["A codebase architecture diagram", "A strategic plan showing product direction over time", "A list of bugs to fix", "A user flow diagram"], correctIndex: 1, difficulty: "easy" },
    { id: "pm-9", concept: "Agile", question: "What is a 'retrospective' in Agile?", options: ["A code review", "A meeting to reflect on what went well/poorly in a sprint", "A product launch", "A customer survey"], correctIndex: 1, difficulty: "easy" },
    { id: "pm-10", concept: "Prioritization", question: "In MoSCoW prioritization, what does 'S' stand for?", options: ["Simple", "Should Have", "Scalable", "Secure"], correctIndex: 1, difficulty: "medium" },
  ],
  security: [
    { id: "sec-1", concept: "Network Security", question: "What does a firewall do?", options: ["Encrypts data", "Filters network traffic based on rules", "Backs up data", "Compresses files"], correctIndex: 1, difficulty: "easy" },
    { id: "sec-2", concept: "Cryptography", question: "What is symmetric encryption?", options: ["Same key for encryption & decryption", "Different keys for encryption & decryption", "No key needed", "One-time pad only"], correctIndex: 0, difficulty: "easy" },
    { id: "sec-3", concept: "OWASP", question: "What is SQL Injection?", options: ["A database optimization technique", "Inserting malicious SQL through user input", "A type of JOIN", "A backup method"], correctIndex: 1, difficulty: "easy" },
    { id: "sec-4", concept: "Linux", question: "What does `chmod 755` do?", options: ["Deletes a file", "Owner: rwx, Group: r-x, Others: r-x", "Changes file ownership", "Compresses a file"], correctIndex: 1, difficulty: "medium" },
    { id: "sec-5", concept: "Authentication", question: "What is the purpose of a JWT (JSON Web Token)?", options: ["Database queries", "Stateless authentication between parties", "File encryption", "CSS styling"], correctIndex: 1, difficulty: "medium" },
    { id: "sec-6", concept: "OWASP", question: "What is XSS (Cross-Site Scripting)?", options: ["A styling framework", "Injecting malicious scripts into web pages viewed by others", "A caching strategy", "A CSS preprocessor"], correctIndex: 1, difficulty: "medium" },
    { id: "sec-7", concept: "Ethical Hacking", question: "What is penetration testing?", options: ["Performance testing", "Authorized simulated attack to find vulnerabilities", "A/B testing", "Unit testing"], correctIndex: 1, difficulty: "easy" },
    { id: "sec-8", concept: "Network Security", question: "What does VPN stand for?", options: ["Virtual Private Network", "Visual Processing Node", "Verified Public Network", "Variable Protocol Name"], correctIndex: 0, difficulty: "easy" },
    { id: "sec-9", concept: "Cryptography", question: "What is hashing used for?", options: ["Reversible encryption", "Generating a fixed-size digest for integrity verification", "Compressing data", "Sorting data"], correctIndex: 1, difficulty: "medium" },
    { id: "sec-10", concept: "Authentication", question: "What is Multi-Factor Authentication (MFA)?", options: ["Using multiple passwords", "Requiring two or more verification methods", "Logging in from multiple devices", "Encrypting passwords twice"], correctIndex: 1, difficulty: "easy" },
  ],
  fullstack: [
    { id: "fs-1", concept: "HTML/CSS", question: "What does `display: flex` do?", options: ["Makes element invisible", "Enables flexbox layout on a container", "Makes text bold", "Adds a border"], correctIndex: 1, difficulty: "easy" },
    { id: "fs-2", concept: "JavaScript", question: "What is a closure in JavaScript?", options: ["A CSS property", "A function that retains access to its outer scope", "A loop construct", "A DOM element"], correctIndex: 1, difficulty: "medium" },
    { id: "fs-3", concept: "React", question: "What does the `useEffect` hook do in React?", options: ["Manages state", "Performs side effects after render", "Creates components", "Validates forms"], correctIndex: 1, difficulty: "easy" },
    { id: "fs-4", concept: "Node.js", question: "What is Express.js?", options: ["A database", "A minimal web framework for Node.js", "A CSS library", "A testing tool"], correctIndex: 1, difficulty: "easy" },
    { id: "fs-5", concept: "Databases", question: "What does ACID stand for in databases?", options: ["Atomicity, Consistency, Isolation, Durability", "Add, Create, Insert, Delete", "Async, Cache, Index, Deploy", "Access, Control, Identity, Data"], correctIndex: 0, difficulty: "medium" },
    { id: "fs-6", concept: "REST APIs", question: "What HTTP method is used to update a resource?", options: ["GET", "POST", "PUT", "DELETE"], correctIndex: 2, difficulty: "easy" },
    { id: "fs-7", concept: "TypeScript", question: "What is an interface in TypeScript?", options: ["A class method", "A contract defining the structure of an object", "A loop type", "A CSS module"], correctIndex: 1, difficulty: "easy" },
    { id: "fs-8", concept: "Git", question: "What does `git rebase` do?", options: ["Deletes a branch", "Reapplies commits on top of another base", "Creates a tag", "Reverts a commit"], correctIndex: 1, difficulty: "medium" },
    { id: "fs-9", concept: "JavaScript", question: "What is the event loop in JavaScript?", options: ["A for loop", "A mechanism that handles async callbacks in single-threaded JS", "A DOM event", "A CSS animation"], correctIndex: 1, difficulty: "medium" },
    { id: "fs-10", concept: "React", question: "What is the virtual DOM?", options: ["A browser API", "A lightweight copy of the real DOM used for diffing", "A database", "A CSS framework"], correctIndex: 1, difficulty: "medium" },
  ],
  devops: [
    { id: "do-1", concept: "Docker", question: "What is a Docker container?", options: ["A virtual machine", "A lightweight, isolated environment running an application", "A database", "A cloud server"], correctIndex: 1, difficulty: "easy" },
    { id: "do-2", concept: "Kubernetes", question: "What is a Kubernetes Pod?", options: ["A docker image", "The smallest deployable unit containing one or more containers", "A load balancer", "A network rule"], correctIndex: 1, difficulty: "medium" },
    { id: "do-3", concept: "CI/CD", question: "What does CI stand for in CI/CD?", options: ["Container Integration", "Continuous Integration", "Cloud Infrastructure", "Code Inspection"], correctIndex: 1, difficulty: "easy" },
    { id: "do-4", concept: "Linux", question: "What command lists all running processes?", options: ["ls -la", "ps aux", "cat /proc", "df -h"], correctIndex: 1, difficulty: "easy" },
    { id: "do-5", concept: "AWS", question: "What is AWS S3 used for?", options: ["Computing", "Object storage", "Databases", "Networking"], correctIndex: 1, difficulty: "easy" },
    { id: "do-6", concept: "Docker", question: "What is a Dockerfile?", options: ["A running container", "A script with instructions to build a Docker image", "A network config", "A log file"], correctIndex: 1, difficulty: "easy" },
    { id: "do-7", concept: "Monitoring", question: "What is Prometheus used for?", options: ["Code deployment", "Metrics collection and monitoring", "Container orchestration", "DNS management"], correctIndex: 1, difficulty: "medium" },
    { id: "do-8", concept: "Networking", question: "What does DNS do?", options: ["Encrypts traffic", "Translates domain names to IP addresses", "Compresses data", "Routes emails"], correctIndex: 1, difficulty: "easy" },
    { id: "do-9", concept: "CI/CD", question: "What is a deployment pipeline?", options: ["A database table", "An automated sequence of steps to build, test, and deploy code", "A Kubernetes resource", "A Docker volume"], correctIndex: 1, difficulty: "medium" },
    { id: "do-10", concept: "AWS", question: "What is AWS Lambda?", options: ["A VM service", "A serverless compute service that runs code without provisioning servers", "A storage bucket", "A database"], correctIndex: 1, difficulty: "medium" },
  ],
  mobile: [
    { id: "mob-1", concept: "React Native", question: "What language does React Native use?", options: ["Swift", "Kotlin", "JavaScript/TypeScript", "Dart"], correctIndex: 2, difficulty: "easy" },
    { id: "mob-2", concept: "Flutter", question: "What language is Flutter built on?", options: ["JavaScript", "Kotlin", "Swift", "Dart"], correctIndex: 3, difficulty: "easy" },
    { id: "mob-3", concept: "Mobile UI", question: "What is a safe area in mobile design?", options: ["A secure storage zone", "The visible area not obscured by notches or system bars", "A testing sandbox", "An encrypted zone"], correctIndex: 1, difficulty: "easy" },
    { id: "mob-4", concept: "App Lifecycle", question: "What does 'backgrounded' mean for a mobile app?", options: ["App is deleted", "App is running but not visible to the user", "App crashed", "App is installing"], correctIndex: 1, difficulty: "easy" },
    { id: "mob-5", concept: "APIs", question: "What is REST?", options: ["A sleep mode", "An architectural style for web services using HTTP", "A database type", "A testing framework"], correctIndex: 1, difficulty: "easy" },
    { id: "mob-6", concept: "Storage", question: "What is AsyncStorage in React Native?", options: ["A cloud database", "A simple key-value local storage system", "A state manager", "A file system API"], correctIndex: 1, difficulty: "medium" },
    { id: "mob-7", concept: "React Native", question: "What is the purpose of React Navigation?", options: ["State management", "Handling screen transitions and navigation stack", "API calls", "Animations"], correctIndex: 1, difficulty: "easy" },
    { id: "mob-8", concept: "Flutter", question: "What is a Widget in Flutter?", options: ["A database table", "A building block of the UI", "A backend service", "A test utility"], correctIndex: 1, difficulty: "easy" },
    { id: "mob-9", concept: "Mobile UI", question: "What is haptic feedback?", options: ["Sound effects", "Tactile vibration response to user interaction", "Visual animations", "Push notifications"], correctIndex: 1, difficulty: "medium" },
    { id: "mob-10", concept: "App Lifecycle", question: "What is a deep link?", options: ["A database join", "A URL that opens a specific screen in a mobile app", "A CSS selector", "A Git reference"], correctIndex: 1, difficulty: "medium" },
  ],
  cloud: [
    { id: "cl-1", concept: "AWS", question: "What is EC2 in AWS?", options: ["A storage service", "A virtual server service", "A DNS service", "A messaging queue"], correctIndex: 1, difficulty: "easy" },
    { id: "cl-2", concept: "Serverless", question: "What is the main advantage of serverless computing?", options: ["No internet needed", "No server management — pay only for what you use", "Faster hardware", "Unlimited storage"], correctIndex: 1, difficulty: "easy" },
    { id: "cl-3", concept: "Networking", question: "What is a VPC?", options: ["Virtual Private Cloud — an isolated network in the cloud", "Very Private Computer", "Virtual Processing Container", "Verified Public Certificate"], correctIndex: 0, difficulty: "medium" },
    { id: "cl-4", concept: "Security", question: "What is IAM in cloud services?", options: ["Instant Access Memory", "Identity and Access Management", "Internal Application Monitor", "Internet API Manager"], correctIndex: 1, difficulty: "easy" },
    { id: "cl-5", concept: "Infrastructure", question: "What is Infrastructure as Code (IaC)?", options: ["Writing apps in assembly", "Managing infrastructure through machine-readable config files", "Using only CLI tools", "Cloud-native databases"], correctIndex: 1, difficulty: "medium" },
    { id: "cl-6", concept: "AWS", question: "What is CloudFormation?", options: ["A weather API", "An AWS IaC service for provisioning resources via templates", "A CDN service", "A database migration tool"], correctIndex: 1, difficulty: "medium" },
    { id: "cl-7", concept: "GCP/Azure", question: "What is Google Cloud's equivalent of AWS S3?", options: ["Cloud SQL", "Cloud Storage", "BigQuery", "Cloud Functions"], correctIndex: 1, difficulty: "easy" },
    { id: "cl-8", concept: "Serverless", question: "What triggers an AWS Lambda function?", options: ["Manual SSH", "Events (API calls, S3 uploads, schedules, etc.)", "Cron jobs only", "Docker commands"], correctIndex: 1, difficulty: "medium" },
    { id: "cl-9", concept: "Networking", question: "What is a load balancer?", options: ["A database optimizer", "Distributes incoming traffic across multiple servers", "A CI tool", "A monitoring agent"], correctIndex: 1, difficulty: "easy" },
    { id: "cl-10", concept: "Infrastructure", question: "What is Terraform?", options: ["A programming language", "An open-source IaC tool for multi-cloud provisioning", "A container runtime", "A CI/CD platform"], correctIndex: 1, difficulty: "medium" },
  ],
  blockchain: [
    { id: "bc-1", concept: "Solidity", question: "What is Solidity?", options: ["A CSS framework", "A programming language for Ethereum smart contracts", "A database", "A testing tool"], correctIndex: 1, difficulty: "easy" },
    { id: "bc-2", concept: "Smart Contracts", question: "What is a smart contract?", options: ["A legal document", "Self-executing code deployed on a blockchain", "An API endpoint", "A database trigger"], correctIndex: 1, difficulty: "easy" },
    { id: "bc-3", concept: "Web3", question: "What is a wallet in blockchain?", options: ["A physical device", "Software that manages private keys and interacts with blockchain", "A bank account", "A cloud storage"], correctIndex: 1, difficulty: "easy" },
    { id: "bc-4", concept: "Cryptography", question: "What is a hash function in blockchain?", options: ["A sorting algorithm", "A function that converts input to a fixed-size string", "An encryption method", "A consensus mechanism"], correctIndex: 1, difficulty: "medium" },
    { id: "bc-5", concept: "DeFi", question: "What does DeFi stand for?", options: ["Defined Finance", "Decentralized Finance", "Digital Filing", "Distributed Features"], correctIndex: 1, difficulty: "easy" },
    { id: "bc-6", concept: "Consensus", question: "What is Proof of Work?", options: ["A project management method", "A consensus mechanism requiring computational effort to validate blocks", "A testing strategy", "A design pattern"], correctIndex: 1, difficulty: "medium" },
    { id: "bc-7", concept: "Solidity", question: "What is 'gas' in Ethereum?", options: ["A cryptocurrency", "A unit measuring computational effort to execute transactions", "A smart contract type", "A wallet feature"], correctIndex: 1, difficulty: "medium" },
    { id: "bc-8", concept: "Web3", question: "What is an NFT?", options: ["A networking protocol", "A unique, non-fungible token on a blockchain", "A database record", "A file type"], correctIndex: 1, difficulty: "easy" },
    { id: "bc-9", concept: "Smart Contracts", question: "What is a reentrancy attack?", options: ["A DDoS attack", "An exploit where a contract function is recursively called before state updates", "A phishing attack", "A brute force attack"], correctIndex: 1, difficulty: "hard" },
    { id: "bc-10", concept: "Consensus", question: "What is Proof of Stake?", options: ["Mining-based consensus", "Validators lock up tokens as collateral to validate blocks", "A hash puzzle", "A voting system"], correctIndex: 1, difficulty: "medium" },
  ],
  gamedev: [
    { id: "gd-1", concept: "Game Design", question: "What is a game loop?", options: ["A for loop", "The core cycle of input → update → render in a game", "A leaderboard system", "A save file format"], correctIndex: 1, difficulty: "easy" },
    { id: "gd-2", concept: "Unity/C#", question: "What language does Unity primarily use?", options: ["Python", "Java", "C#", "C++"], correctIndex: 2, difficulty: "easy" },
    { id: "gd-3", concept: "Physics", question: "What is a collider in game engines?", options: ["A visual effect", "A component that defines an object's physical shape for collision detection", "A sound effect", "A script runner"], correctIndex: 1, difficulty: "easy" },
    { id: "gd-4", concept: "Graphics", question: "What is a sprite?", options: ["A 3D model", "A 2D image used in games", "A sound file", "A physics body"], correctIndex: 1, difficulty: "easy" },
    { id: "gd-5", concept: "AI in Games", question: "What is pathfinding in game AI?", options: ["Loading game files", "Calculating the optimal route from one point to another", "Rendering graphics", "Saving game state"], correctIndex: 1, difficulty: "easy" },
    { id: "gd-6", concept: "Game Design", question: "What is a game mechanic?", options: ["A bug in the game", "A core rule or system that defines how the game works", "A graphics setting", "A cheat code"], correctIndex: 1, difficulty: "easy" },
    { id: "gd-7", concept: "Unity/C#", question: "What is a 'Prefab' in Unity?", options: ["A texture file", "A reusable game object template", "A scene type", "A shader"], correctIndex: 1, difficulty: "medium" },
    { id: "gd-8", concept: "Physics", question: "What is a Rigidbody in Unity?", options: ["A static object", "A component that enables physics simulation on a game object", "A UI element", "A camera type"], correctIndex: 1, difficulty: "medium" },
    { id: "gd-9", concept: "Multiplayer", question: "What is client-server architecture in multiplayer games?", options: ["All players share one screen", "A central server manages game state while clients connect to it", "Players email each other", "Games run offline"], correctIndex: 1, difficulty: "medium" },
    { id: "gd-10", concept: "Graphics", question: "What is a shader?", options: ["A game level", "A program that runs on the GPU to control rendering", "A save file", "An input handler"], correctIndex: 1, difficulty: "medium" },
  ],
  ba: [
    { id: "ba-1", concept: "Requirements", question: "What is a functional requirement?", options: ["A hardware spec", "A description of what the system should do", "A performance metric", "A design mockup"], correctIndex: 1, difficulty: "easy" },
    { id: "ba-2", concept: "SQL", question: "What does SELECT DISTINCT do?", options: ["Selects all rows", "Returns only unique values", "Deletes duplicates", "Sorts results"], correctIndex: 1, difficulty: "easy" },
    { id: "ba-3", concept: "Data Analysis", question: "What is a pivot table?", options: ["A database table", "A tool to summarize and reorganize data", "A SQL JOIN", "A chart type"], correctIndex: 1, difficulty: "easy" },
    { id: "ba-4", concept: "Process Modeling", question: "What is a BPMN diagram?", options: ["A database schema", "A standardized flowchart for business processes", "A network diagram", "A class diagram"], correctIndex: 1, difficulty: "medium" },
    { id: "ba-5", concept: "Stakeholder Mgmt", question: "Who is a stakeholder?", options: ["Only the CEO", "Anyone affected by or who can affect the project outcome", "Only the developer", "The project manager"], correctIndex: 1, difficulty: "easy" },
    { id: "ba-6", concept: "Tools", question: "What is JIRA primarily used for?", options: ["Code editing", "Project and issue tracking", "Database management", "Design mockups"], correctIndex: 1, difficulty: "easy" },
    { id: "ba-7", concept: "Requirements", question: "What is a user story?", options: ["A blog post", "A short description of a feature from the user's perspective", "A test case", "A bug report"], correctIndex: 1, difficulty: "easy" },
    { id: "ba-8", concept: "Data Analysis", question: "What is the difference between mean and median?", options: ["No difference", "Mean is the average; median is the middle value", "Mean is always larger", "Median is a percentage"], correctIndex: 1, difficulty: "easy" },
    { id: "ba-9", concept: "Process Modeling", question: "What is a use case diagram?", options: ["A code flowchart", "A visual showing how users interact with a system", "A database schema", "A test plan"], correctIndex: 1, difficulty: "medium" },
    { id: "ba-10", concept: "SQL", question: "What does GROUP BY do in SQL?", options: ["Sorts rows", "Groups rows sharing a value for aggregate functions", "Filters rows", "Joins tables"], correctIndex: 1, difficulty: "easy" },
  ],
  marketing: [
    { id: "mkt-1", concept: "SEO", question: "What does SEO stand for?", options: ["Social Engagement Optimization", "Search Engine Optimization", "Site Experience Observer", "Structured Event Output"], correctIndex: 1, difficulty: "easy" },
    { id: "mkt-2", concept: "Google Ads", question: "What is PPC advertising?", options: ["Post-Purchase Checkout", "Pay Per Click — ads charged per click", "Product Page Content", "Public Press Campaign"], correctIndex: 1, difficulty: "easy" },
    { id: "mkt-3", concept: "Social Media", question: "What is 'reach' in social media?", options: ["Number of posts", "Total unique users who see your content", "Number of followers", "Total likes"], correctIndex: 1, difficulty: "easy" },
    { id: "mkt-4", concept: "Analytics", question: "What is a bounce rate?", options: ["Email delivery failure rate", "Percentage of visitors who leave after viewing only one page", "Click-through rate", "Conversion rate"], correctIndex: 1, difficulty: "easy" },
    { id: "mkt-5", concept: "Content Strategy", question: "What is a content calendar?", options: ["A blogging platform", "A schedule planning when and where to publish content", "A social media app", "An email template"], correctIndex: 1, difficulty: "easy" },
    { id: "mkt-6", concept: "SEO", question: "What is a backlink?", options: ["A broken link", "A link from another website pointing to yours", "A redirect", "An anchor tag"], correctIndex: 1, difficulty: "easy" },
    { id: "mkt-7", concept: "Email Marketing", question: "What is an email open rate?", options: ["Rate emails are sent", "Percentage of recipients who open your email", "Cost per email", "Bounce rate"], correctIndex: 1, difficulty: "easy" },
    { id: "mkt-8", concept: "Google Ads", question: "What is Quality Score in Google Ads?", options: ["A page speed metric", "Google's rating of ad relevance, CTR, and landing page quality", "A domain authority", "A social media metric"], correctIndex: 1, difficulty: "medium" },
    { id: "mkt-9", concept: "Analytics", question: "What is a conversion?", options: ["A website redesign", "When a user completes a desired action (purchase, signup, etc.)", "A page view", "A social media share"], correctIndex: 1, difficulty: "easy" },
    { id: "mkt-10", concept: "Social Media", question: "What is an engagement rate?", options: ["Number of posts per day", "Percentage of audience that interacts with content", "Follower growth rate", "Ad spend"], correctIndex: 1, difficulty: "medium" },
  ],
}

// ─── Quiz Selection Algorithm ──────────────────────────────────
export function getQuizQuestions(path: CareerPath, count = 20): Question[] {
  const bank = QUESTION_BANKS[path] || []
  if (bank.length === 0) return []

  const shuffled = [...bank].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

export function getPathTopics(path: CareerPath): string[] {
  return PATH_CONFIG[path]?.topics || []
}

export function getPathLabel(path: CareerPath): string {
  return PATH_CONFIG[path]?.label || path
}

export const ALL_PATHS = Object.keys(PATH_CONFIG) as CareerPath[]

export default QUESTION_BANKS
