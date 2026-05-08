const projects = [
  {
    id: 1,
    title: "E-Commerce Website",
    description:
      "A full-stack e-commerce platform with product listing, cart, authentication and payment integration built using MERN stack.",
    longDescription:
      "Built with React.js, Node.js, Express.js and MongoDB. Features include user authentication, product search, filters, cart management and payment gateway.",
    image: "/images/projects/ecommerce.png",
    tags: ["React.js", "Node.js", "MongoDB", "Express.js", "JWT", "Tailwind CSS"],
    category: "fullstack",
    github: "https://github.com/hariii110/e-commerce",
    live: "",
    featured: true,
  },
 {
    id: 2,
    title: "Portfolio Website",
    description:
      "Personal portfolio website with animations, responsive design and working contact form built using Next.js.",
    longDescription:
      "Built with Next.js, Tailwind CSS and WebGL aurora effect. Features smooth scroll, animated sections and Nodemailer contact form.",
    image: "/images/projects/portfolio.png",
    tags: ["Next.js", "Tailwind CSS", "Nodemailer", "JavaScript"],
    category: "frontend",
    github: "https://github.com/hariii110/portfolio",
    live: "",
    featured: true,
  },
  {
    id: 3,
    title: "Gift Suggestion System",
    description:
      "A smart gift suggestion application that recommends personalized gifts based on user preferences and occasions.",
    longDescription:
      "Built with React.js. Features personalized recommendations, category filtering and user-friendly interface.",
    image: "/images/projects/gift.png",
    tags: ["React.js", "CSS", "JavaScript"],
    category: "frontend",
    github: "",
    live: "",
    featured: false,
  },
]

// ✅ This must have "export" keyword
export const categories = [
  { id: "all",       label: "All Projects" },
  { id: "frontend",  label: "Frontend"     },
  { id: "backend",   label: "Backend"      },
  { id: "fullstack", label: "Full Stack"   },
]

export default projects