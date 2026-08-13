export type Project = {
    title: string;
    description: string;
    image: string;
    year: string;
    category: "web" | "mobile";
    link?: string;
    featured?: boolean;
};

export type Role = {
    key: string;
    title: string;
    description: string;
};

export type Service = {
    title: string;
    description: string;
};

export type Faq = {
    question: string;
    answer: string;
};

export type Step = {
    number: string;
    title: string;
    description: string;
};

export type CoreValue = {
    title: string;
    description: string;
    image: string;
};

export const eventTags = ["Week of CodeBox", "Food Provided"] as const;

export type EventTag = (typeof eventTags)[number];

export type ClubEvent = {
    /** ISO date, e.g. "2026-08-20" */
    date: string;
    name: string;
    time: string;
    presenters?: string[];
    tags?: EventTag[];
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
        title: "Mustang Maps",
        description:
            "Full-fledged navigation app for Cal Poly students, providing campus shortcuts and amenity location.",
        image: "/projects/mustang-maps.png",
        year: "2026",
        category: "mobile",
        link: "https://mustang-maps-landing-page.vercel.app/",
        featured: true,
    },
    {
        title: "Poly Problems",
        description:
            "Mobile app platform for reporting and discussing Cal Poly campus issues.",
        image: "/projects/poly-problems.png",
        year: "2026",
        category: "mobile",
        link: "https://www.polyproblems.com/",
        featured: true,
    },
    {
        title: "Poly Pages",
        description:
            "Campus specific, credit based note sharing platform for Cal Poly students. Share notes, earn credits, learn together.",
        image: "/projects/poly-pages.png",
        year: "2026",
        category: "web",
        link: "https://www.polypages.dev/",
    },
    {
        title: "Aura Farm",
        description:
            "Social media platform that turns campuses into a weekly challenge map. Complete real world tasks around campus to earn Aura points.",
        image: "/projects/aura-farm.png",
        year: "2026",
        category: "mobile",
        link: "https://www.aurafarm.codebox.so/",
    },
    {
        title: "Poly Buys",
        description:
            "Campus specific marketplace for Cal Poly students to buy and sell items like textbooks, furniture, and event tickets. It centralizes student to student listings in one place.",
        image: "/projects/poly-buys.png",
        year: "2026",
        category: "web",
        link: "https://app.polybuys.com/",
    },
];

export const services: Service[] = [
    {
        title: "Web Development",
        description:
            "We craft custom websites built for speed, scalability, and seamless user experiences, from sleek landing pages to full-stack platforms.",
    },
    {
        title: "Mobile Applications",
        description:
            "We bring solution-forward mobile app visions to life using modern native and cross-platform frameworks.",
    },
    {
        title: "AI & Machine Learning",
        description:
            "Build intelligent applications that employ AI technologies to solve real-world problems on campus and beyond.",
    },
];

export const roles: Role[] = [
    {
        key: "developer",
        title: "Developer",
        description:
            "As a developer, your primary role will be to contribute code to your team's software project. You will have the opportunity to work on an interdisciplinary team with a project manager and designers.",
    },
    {
        key: "product-manager",
        title: "Product Manager",
        description:
            "As a product manager, you will be leading a team of developers and designers to build out a software project over the course of the term. You will be heavily involved in the organization of the project and be a main driver in the team's success.",
    },
    {
        key: "tech-lead",
        title: "Tech Lead",
        description:
            "As a tech lead, you will be leading a team of developers to flesh out product software over the course of the year. You will be heavily involved in the development of the project and be a main driver in the team's success.",
    },
    {
        key: "designer",
        title: "Designer",
        description:
            "As a designer, your primary role will be to apply the UX design process to create wireframes for projects. You will have the opportunity to collaborate & work with an interdisciplinary team of developers.",
    },
    {
        key: "marketing-associate",
        title: "Marketing Associate",
        description:
            "As a marketing associate, you will help grow CodeBox's presence on campus — running social media, planning events, and spreading the word about our projects and showcases.",
    },
];

export const faqs: Faq[] = [
    {
        question: "What is CodeBox?",
        answer: "CodeBox is a student-run software engineering club at Cal Poly SLO. Members work in teams to design, develop, and ship real web and mobile products over the course of the academic year.",
    },
    {
        question: "How do I join CodeBox?",
        answer: "Fill out our quick interest form — no commitment required. We'll match you with a project team based on your skills and learning goals — no interviews required.",
    },
    {
        question: "What kind of projects do you work on?",
        answer: "Student-led web apps, mobile apps, and AI tools that solve real problems on campus — like Mustang Maps, Poly Problems, and Poly Pages.",
    },
    {
        question: "Do I need programming experience to join?",
        answer: "Nope! We welcome all skill levels, from complete beginners to experienced developers. You'll learn by building alongside teammates and mentors.",
    },
    {
        question: "What technologies do you use?",
        answer: "Teams choose their own stacks — commonly React, Next.js, React Native, Swift, Python, and cloud platforms like Supabase and Firebase.",
    },
    {
        question: "How much time commitment is required?",
        answer: "Expect a few hours per week: a weekly team meeting plus time working on your part of the project. It's flexible around your class schedule.",
    },
];

export const steps: Step[] = [
    {
        number: "01",
        title: "Show Interest",
        description:
            "Fill out our quick interest form, and tell us about your interests and experience level.",
    },
    {
        number: "02",
        title: "Get Matched",
        description:
            "We'll match you with a project team based on your skills and learning goals.",
    },
    {
        number: "03",
        title: "Build",
        description:
            "Work with your team to design, develop, and deploy your project over the academic year.",
    },
    {
        number: "04",
        title: "Showcase",
        description: "Present your work at our end-of-year showcase!",
    },
];

export const events: ClubEvent[] = [
    {
        date: "2026-08-20",
        name: "CSSE Club Chat",
        time: "3:30 PM – 5:00 PM",
        presenters: ["Rishi", "Isaac"],
    },
    {
        date: "2026-08-23",
        name: "CodeBox @ WOW Club Fair",
        time: "10:00 AM",
    },
    {
        date: "2026-08-28",
        name: "CodeBox Interest Meeting #1",
        time: "6:00 PM",
    },
    {
        date: "2026-08-31",
        name: "2025 Project Review",
        time: "6:00 PM",
        tags: ["Week of CodeBox"],
    },
    {
        date: "2026-09-01",
        name: "Speed Dating Social with CIE",
        time: "6:00 PM",
        tags: ["Week of CodeBox", "Food Provided"],
    },
    {
        date: "2026-09-02",
        name: "LinkedIn Roast",
        time: "6:00 PM",
        tags: ["Week of CodeBox"],
    },
    {
        date: "2026-09-03",
        name: "CodeBox Trivia Night",
        time: "6:00 PM",
        tags: ["Week of CodeBox"],
    },
    {
        date: "2026-09-04",
        name: "Panda Express Trip",
        time: "6:00 PM",
        tags: ["Week of CodeBox"],
    },
    {
        date: "2026-09-05",
        name: "CodeBoxHacks Day 1",
        time: "8:00 AM – 5:00 PM",
        tags: ["Week of CodeBox"],
    },
    {
        date: "2026-09-06",
        name: "CodeBoxHacks Day 2",
        time: "8:00 AM – 5:00 PM",
        tags: ["Week of CodeBox"],
    },
];

export const coreValues: CoreValue[] = [
    {
        title: "Innovation",
        description:
            "Create products that make a difference on campus and beyond.",
        image: "/codebox-1.jpg",
    },
    {
        title: "Community",
        description:
            "Build lasting friendships and professional connections with fellow Cal Poly students who share your passion.",
        image: "/codebox-4.jpg",
    },
    {
        title: "Mentorship & Learning",
        description:
            "Learn from experienced developers and grow your skills through hands-on collaboration and code reviews.",
        image: "/codebox-5.jpg",
    },
];

export const leadership: LeadershipMember[] = [
    {
        name: "Rishi Thakkar",
        role: "Co-Founder & President",
        linkedin: "https://www.linkedin.com/in/rishi-thakkar1/",
        github: "#",
    },
    {
        name: "Isaac Tsai",
        role: "Vice President",
        linkedin: "https://www.linkedin.com/in/isaac-m-tsai/",
        github: "#",
    },
    {
        name: "Scott Eisenberg",
        role: "Head of Product",
        linkedin: "https://www.linkedin.com/in/scott-eisenberg2/",
        github: "#",
    },
    {
        name: "Joshua Panicker",
        role: "Director of External Engineering",
        linkedin: "https://www.linkedin.com/in/joshua-panicker-32610a2b0/",
        github: "#",
    },
    {
        name: "Winnie Trinh",
        role: "Director of External Engineering",
        linkedin: "https://www.linkedin.com/in/winnie-trinh/",
        github: "#",
    },
    {
        name: "Evan Taylor",
        role: "Director of Internal Engineering",
        linkedin: "https://www.linkedin.com/in/evan-l-taylor/",
        github: "#",
    },
    {
        name: "Stella Daoud",
        role: "Director of Operations",
        linkedin: "https://www.linkedin.com/in/stelladaoud/",
        github: "#",
    },
    {
        name: "Emma Walker",
        role: "Director of Design",
        linkedin: "https://www.linkedin.com/in/emma-walker-040705320/",
        github: "#",
    },
    {
        name: "Drew Tompkins",
        role: "Director of Marketing",
        linkedin: "https://www.linkedin.com/in/drew-tompkins-a963873ba/",
        github: "#",
    },
    {
        name: "Dakshesh Pasala",
        role: "Advisor",
        linkedin: "https://www.linkedin.com/in/daksheshpasala/",
        github: "#",
    },
    {
        name: "Parker Jones",
        role: "Advisor",
        linkedin: "https://www.linkedin.com/in/parker-jones-ai/",
        github: "#",
    },
];

export const leadership2025: LeadershipMember[] = [
    {
        name: "Muzart Tuman",
        role: "Founder & President",
        linkedin: "https://www.linkedin.com/in/muzart-tuman/",
        github: "#",
    },
    {
        name: "Hannah Moshtaghi",
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
];

export const members: TeamMember[] = [
    { name: "Srinithi Doddapaneni", role: "Developer" },
    { name: "Trace Macias", role: "Developer" },
    { name: "Jacky Liu", role: "Developer" },
    { name: "Atharv Allepally", role: "Developer" },
    { name: "Vishal Murali Kannan", role: "Developer" },
    { name: "Jake Orchanian", role: "Developer" },
    { name: "Drew Tompkins", role: "Developer" },
    { name: "Snehil Kakani", role: "Developer" },
    { name: "Rodney Fujiyama", role: "Developer" },
    { name: "Osbaldo Orozco", role: "Developer" },
    { name: "Jacob Lee", role: "Developer" },
    { name: "Scout Knight-Pheng", role: "Developer" },
    { name: "Daniel Erazo", role: "Developer" },
    { name: "Victor Xie", role: "Developer" },
    { name: "Carter Lim", role: "Developer" },
    { name: "Emma Walker", role: "Developer" },
    { name: "Moe Aung", role: "Developer" },
    { name: "Noah Gullo", role: "Developer" },
    { name: "Wieland Rodriguez", role: "Developer" },
    { name: "Stella Daoud", role: "Developer" },
    { name: "Arin Johar", role: "Developer" },
    { name: "Chloe Low", role: "Developer" },
    { name: "Emi Okumoto", role: "Developer" },
    { name: "Scott Eisenberg", role: "Developer" },
    { name: "Deekshitha Gangi", role: "Developer" },
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
];

export const designers: TeamMember[] = [
    { name: "Hannah Moshtaghi", role: "Designers" },
    { name: "Stella Kwon", role: "Designers" },
    { name: "Isaiah Cortez ", role: "Designers" },
    { name: "Isaac Tsai", role: "Designers" },
    { name: "Chanelle Friend", role: "Designers" },
];

const leadership2026Names = leadership
    .filter((leader) => leader.role !== "Advisor")
    .map((leader) => leader.name);

const advisor2026Names = ["Aaron Keen", "Dakshesh Pasala", "Parker Jones"];

const leadership2025Names = leadership2025
    .filter((leader) => !leader.role.toLowerCase().includes("tech lead"))
    .map((leader) => leader.name);

const techLeadNames = techLeads.map((member) => member.name);

const developerNames = members.map((member) => member.name);

const leadNames = productManagers.map((member) => member.name);

const designerNames = designers.map((member) => member.name);

const advisorNames = ["Aaron Keen"];

export const teamYears: TeamYear[] = [
    {
        year: "2026 - 2027",
        sections: {
            leadership: leadership2026Names,
            techLeads: [],
            productLeads: [],
            developers: [],
            designers: [],
            advisors: advisor2026Names,
        },
    },
    {
        year: "2025 - 2026",
        sections: {
            leadership: leadership2025Names,
            techLeads: techLeadNames,
            productLeads: leadNames,
            developers: developerNames,
            designers: designerNames,
            advisors: advisorNames,
        },
    },
];
