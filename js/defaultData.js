export const DEFAULT_RESUME_DATA = {
    personal: {
        name: "Alex Griffin",
        email: "alex.griffin.dev@example.com",
        mobile: "+1 (555) 123-4567",
        linkedin: "https://linkedin.com/in/alexgriffindev",
        github: "https://github.com/alexgriffindev",
        location: "San Francisco, CA"
    },
    skills: [
        { name: "Languages", details: "JavaScript, TypeScript, Python, HTML5, CSS3" },
        { name: "Frameworks/Libraries", details: "React, Next.js, Node.js, Express, Tailwind CSS" },
        { name: "Databases", details: "PostgreSQL, MongoDB, Redis" },
        { name: "Tools", details: "Docker, Git, Webpack, Jenkins, AWS" },
        { name: "Other Skills", details: "Agile Methodologies, REST APIs, CI/CD, System Design" }
    ],
    hobbies: [
        { title: "Competitive Programming" },
        { title: "3D Printing" },
        { title: "Urban Gardening" },
        { title: "Espresso Brewing" }
    ],
    experiences: [
        {
            title: "Senior Software Engineer at TechCorp Inc.",
            startDate: "Jan 2023",
            endDate: "Present",
            desc: [
                "Led development of microservices architecture serving 1M+ users.",
                "Mentored junior developers and conducted code reviews."
            ]
        },
        {
            title: "Software Developer at StartupXYZ",
            startDate: "Jun 2021",
            endDate: "Dec 2022",
            desc: [
                "Built full-stack web applications using React and Node.js.",
                "Implemented CI/CD pipelines reducing deployment time by 60%."
            ]
        }
    ],
    projects: [
        {
            title: "Zenith - Real-Time Collaboration Platform",
            date: "June 2025",
            tech: "React, TypeScript, Node.js, WebSockets, PostgreSQL",
            desc: [
                "Developed a web-based platform for team collaboration featuring shared whiteboards.",
                "Implemented WebSocket connections for instant updates and collaborative features."
            ]
        }
    ],
    education: [
        {
            school: "University of California, Berkeley",
            location: "Berkeley, CA",
            degree: "B.S. Computer Science",
            dates: "2017 - 2021",
            grade: "3.8",
            gradeType: "cgpa"
        }
    ],
    achievements: [
        { title: "Hackathon Winner - Global Tech 2024", date: "2024" }
    ],
    certifications: [
        { title: "AWS Certified Solutions Architect", date: "2023" }
    ]
};
