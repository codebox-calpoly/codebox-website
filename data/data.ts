export type Project = {
    title: string;
    description: string;
    tags: string[];
    image: string;
    label?: string;
    bgClass: string;
    category: "Client" | "AI" | "Product";
    featured?: boolean;
};

export type LeadershipMember = {
    name: string;
    role: string;
    linkedin: string;
    github: string;
};

export type TeamMember = {
    name: string;
    role: string;
};

export type TeamYearSections = {
    leadership: string[];
    advisors: string[];
    techLeads: string[];
    productLeads: string[];
    developers: string[];
    designers: string[];
};

export type TeamYear = {
    year: string;
    sections: TeamYearSections;
};

export const projects: Project[] = [
    {
        title: "Reddit",
        description:
            "Reddit is one of the largest and most active form platforms on the internet. We designed an innovative MLK scoreboard experience.",
        tags: ["UI/UX"],
        image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwdGVhbXxlbnwxfHx8fDE3NjQ2MjYwNDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
        label: "UI/UX",
        bgClass: "bg-accent",
        category: "Client",
        featured: true,
    },
    {
        title: "Solidigm AI",
        description:
            "Solidigm is a global leader in NAND flash memory solutions. We built a data abstraction pipeline as a part of their AI debugging tool.",
        tags: ["AI/ML", "Backend"],
        image: "https://images.unsplash.com/photo-1731816803705-54ab8fbd6a8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHlpbmclMjBjb21wdXRlcnxlbnwxfHx8fDE3NjQ1ODcxNzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        label: "AI/ML",
        bgClass: "bg-[var(--project-purple)]",
        category: "AI",
        featured: true,
    },
    {
        title: "GoodNotes",
        description:
            "Goodnotes is a leading digital note taking platform. We created a proof-of-concept testing platform.",
        tags: ["WEB3", "Testing"],
        image: "https://images.unsplash.com/photo-1704699175212-117f10d5b3b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb2Rlcm4lMjB3ZWIlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzY0NjU5NzI0fDA&ixlib=rb-4.1.0&q=80&w=1080",
        label: "WEB3",
        bgClass: "bg-chart-2",
        category: "Client",
        featured: true,
    },
    {
        title: "Render",
        description:
            "Render is a cloud platform designed to simplify the deployment and management of web applications.",
        tags: ["UI/UX", "Cloud"],
        image: "https://images.unsplash.com/photo-1688413709025-5f085266935a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBwYXR0ZXJufGVufDF8fHx8MTc2NDY1ODk0OXww&ixlib=rb-4.1.0&q=80&w=1080",
        label: "UI/UX",
        bgClass: "bg-[var(--project-silver)]",
        category: "Client",
        featured: true,
    },
    {
        title: "StudyHub AI",
        description:
            "AI-powered study assistant that generates personalized learning resources and practice problems based on your curriculum.",
        tags: ["Python", "OpenAI", "React"],
        image: "https://images.unsplash.com/photo-1594892185343-0241e1d47d15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjb2RpbmclMjBjb2xsYWJvcmF0aW9uJTIwd29ya3NwYWNlfGVufDF8fHx8MTc2NDY1OTcyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
        label: "AI/ML",
        bgClass: "bg-[var(--project-emerald)]",
        category: "AI",
    },
    {
        title: "Campus Connect",
        description:
            "Social platform connecting Cal Poly students with events, clubs, and opportunities across campus with real-time notifications.",
        tags: ["React", "Firebase", "Mobile"],
        image: "https://images.unsplash.com/photo-1702047129200-89734f555f38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0ZWNoJTIwc3RhcnR1cCUyMG9mZmljZXxlbnwxfHx8fDE3NjQ1OTY1NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
        label: "Product",
        bgClass: "bg-chart-4",
        category: "Product",
    },
    {
        title: "EcoTrack Mobile",
        description:
            "Mobile app helping students track and reduce their carbon footprint with gamification and social challenges.",
        tags: ["React Native", "Sustainability"],
        image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwdGVhbXxlbnwxfHx8fDE3NjQ2MjYwNDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
        label: "Mobile",
        bgClass: "bg-[var(--project-lime)]",
        category: "Product",
    },
    {
        title: "Neural Canvas",
        description:
            "AI-powered creative tool that transforms sketches into polished digital art using advanced ML models.",
        tags: ["AI/ML", "Computer Vision"],
        image: "https://images.unsplash.com/photo-1731816803705-54ab8fbd6a8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzdHVkZW50JTIwc3R1ZHlpbmclMjBjb21wdXRlcnxlbnwxfHx8fDE3NjQ1ODcxNzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        label: "AI/ML",
        bgClass: "bg-[var(--project-pink)]",
        category: "AI",
    },
];

export const leadership: LeadershipMember[] = [
    {
        name: "Muzart Tuman",
        role: "Founder & President",
        linkedin: "https://www.linkedin.com/in/muzart-tuman/",
        github: "#",
    },
    {
        name: "Hannah Moshtagi",
        role: "Co-Founder",
        linkedin: "https://www.linkedin.com/in/hannah-moshtaghi/",
        github: "#",
    },
    {
        name: "Rishi Thakkar",
        role: "Vice President",
        linkedin: "https://www.linkedin.com/in/rishi-thakkar1/",
        github: "#",
    },
    {
        name: "Matthew Blam",
        role: "Director of Engineering",
        linkedin: "https://www.linkedin.com/in/matthew-blam/",
        github: "https://github.com/MatthewBlam",
    },
    {
        name: "Parker Jones",
        role: "Director of Projects",
        linkedin: "https://www.linkedin.com/in/parker-jones-ai/",
        github: "#",
    },
    {
        name: "Lucy Anguiano",
        role: "Director of Marketing",
        linkedin: "#",
        github: "#",
    },
    {
        name: "Lindsay Minami",
        role: "Director of Membership",
        linkedin: "https://www.linkedin.com/in/lindsay-minami/",
        github: "#",
    },
    {
        name: "Agnes Kong",
        role: "Director of Operations",
        linkedin: "https://www.linkedin.com/in/agneskongg/",
        github: "#",
    },
    {
        name: "Dakshesh Pasala",
        role: "Associate Director of Engineering",
        linkedin: "https://www.linkedin.com/in/daksheshpasala/",
        github: "#",
    },
    {
        name: "Samiksha Karimbil",
        role: "Associate Director of Engineering",
        linkedin: "https://www.linkedin.com/in/samiksha-karimbil/",
        github: "https://github.com/samikshakarimbil",
    },
];

export const techLeads: TeamMember[] = [
    { name: "Saman Sepehr", role: "Tech Lead" },
    { name: "Jaydon Chen ", role: "Tech Lead" },
    { name: "Peter Chinh", role: "Tech Lead" },
    { name: "Namish Mannepalli", role: "Tech Lead" },
    { name: "Joshua Panicker", role: "Tech Lead" },
    { name: "Jonah Chan", role: "Tech Lead" },
    { name: "Siddharth Balaji", role: "Tech Lead" },
    { name: "Winnie Trinh ", role: "Tech Lead" },
    { name: "Rohit Kota", role: "Tech Lead" },
    { name: "Rishi Thakkar", role: "Tech Lead" },
]

export const members: TeamMember[] = [
    { name: "Srinithi Doddapaneni", role: "Developer" },
    { name: "Trace Macias", role: "Developer" },
    { name: "Liu Jacky", role: "Developer" },
    { name: "Atharv Allepally", role: "Developer" },
    { name: "Vishal Murali Kannan", role: "Developer" },
    { name: "Jake Orchanian", role: "Developer" },
    { name: "Drew", role: "Developer" },
    { name: "Snehil Kakani", role: "Developer" },
    { name: "Rodney", role: "Developer" },
    { name: "Osbaldo", role: "Developer" },
    { name: "Jacob Lee", role: "Developer" },
    { name: "Scout Knight-Pheng", role: "Developer" },
    { name: "Daniel Erazo", role: "Developer" },
    { name: "Victor Xie", role: "Developer" },
    { name: "Carter Lim", role: "Developer" },
    { name: "Emma Walker", role: "Developer" },
    { name: "Moe Aung", role: "Developer" },
    { name: "Noah Gullo", role: "Developer" },
    { name: "Wieland", role: "Developer" },
    { name: "Stella", role: "Developer" },
    { name: "Arin Johar", role: "Developer" },
    { name: "Chloe Low", role: "Developer" },
    { name: "Emi Okumoto", role: "Developer" },
    { name: "Scott Eisenberg", role: "Developer" },
    { name: "Deekshi", role: "Developer" },
    { name: "Matthew Phan", role: "Developer" },
    { name: "Taye Staats", role: "Developer" },
    { name: "Cole Hackman", role: "Developer" },
    { name: "Lorinc Heutchy", role: "Developer" },
    { name: "Haixin Huang", role: "Developer" },
    { name: "Evan Taylor", role: "Developer" },
    { name: "Domenic Federico", role: "Developer" },
];

export const productManagers: TeamMember[] = [
    { name: "Shishir Bonthala", role: "Product Manager" },
    { name: "Idhika Nagalingam", role: "Product Manager" },
    { name: "Anthony Orozco", role: "Product Manager" },
    { name: "Harry Obraztsov ", role: "Product Manager" },
    { name: "Evan Taylor", role: "Product Manager" },
]

export const designers: TeamMember[] = [
    { name: "Hannah Moshtagi", role: "Designers" },
    { name: "Stella Kwon", role: "Designers" },
    { name: "Isaiah Cortez ", role: "Designers" },
    { name: "Isaac Tsai", role: "Designers" },
    { name: "Chanelle Friend", role: "Designers" },
]	

const leadershipNames = leadership
    .filter((leader) => !leader.role.toLowerCase().includes("tech lead"))
    .map((leader) => leader.name);

const techLeadNames = techLeads.map((member) => member.name);

const developerNames = members.map((member) => member.name);

const leadNames = productManagers.map((member) => member.name);

const designerNames = designers.map((member) => member.name);

const advisorNames = ["Aaron Keen"]

export const teamYears: TeamYear[] = [
    {
        year: "2025-2026",
        sections: {
            leadership: leadershipNames,
            techLeads: techLeadNames,
            productLeads: leadNames,
            developers: developerNames,
            designers: designerNames,
            advisors: advisorNames,
        },
    },
    {
        year: "2024-2025",
        sections: {
            leadership: [],
            techLeads: [],
            productLeads: [],
            developers: [],
            designers: [],
            advisors: [],
        },
    },
    {
        year: "2023-2024",
        sections: {
            leadership: [],
            techLeads: [],
            productLeads: [],
            developers: [],
            designers: [],
            advisors: [],
        },
    },
];
