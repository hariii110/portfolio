const blogs = [
  {
    id: 1,
    title: "How I Built My Portfolio with Next.js",
    excerpt:
      "A deep dive into building a modern developer portfolio using Next.js, Tailwind CSS and WebGL effects.",
    longDescription:
      "Building a portfolio website is one of the most rewarding projects for any developer. In this post, I share my complete journey of building my portfolio using Next.js 14, Tailwind CSS, and WebGL effects. I cover the project structure, component architecture, animation techniques using CSS and JavaScript, the contact form setup with Nodemailer, and how I optimized performance with lazy loading, code splitting, and GPU-accelerated animations. I also discuss the design decisions behind the navy blue and red color scheme, the custom Panchang font integration, and how I created the laptop intro animation.",
    date: "2025-01-15",
    readTime: "5 min read",
    category: "Web Development",
    tags: ["Next.js", "React", "Portfolio"],
    image: "/images/blogs/portfolio.jpg",
    slug: "how-i-built-my-portfolio",
    featured: true,
  },
  {
    id: 2,
    title: "Understanding the MERN Stack",
    excerpt:
      "Everything you need to know about MongoDB, Express.js, React.js and Node.js to build full stack applications.",
    longDescription:
      "The MERN stack is one of the most popular technology stacks for building modern web applications. MERN stands for MongoDB, Express.js, React.js, and Node.js. In this comprehensive guide, I break down each technology, explain how they work together, and walk through building a complete full-stack application. I cover MongoDB schemas and CRUD operations, Express.js routing and middleware, React component architecture with hooks, and Node.js server setup. I also share tips on JWT authentication, RESTful API design, error handling, and deployment strategies.",
    date: "2025-01-10",
    readTime: "8 min read",
    category: "Full Stack",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    image: "/images/blogs/mern.jpg",
    slug: "understanding-mern-stack",
    featured: true,
  },
  {
    id: 3,
    title: "CSS Tips Every Developer Should Know",
    excerpt:
      "10 powerful CSS tips and tricks that will make your designs cleaner and your code more efficient.",
    longDescription:
      "CSS can be tricky, but mastering a few key techniques can dramatically improve your designs. In this post, I share 10 essential CSS tips: using CSS Grid for complex layouts, Flexbox alignment tricks, custom properties (CSS variables) for theming, the clamp() function for responsive typography, backdrop-filter for glassmorphism effects, scroll-snap for smooth scrolling sections, container queries for component-level responsiveness, animation performance with transform and opacity, the :has() selector for parent selection, and modern reset techniques. Each tip includes code examples and real-world use cases.",
    date: "2025-01-05",
    readTime: "4 min read",
    category: "CSS",
    tags: ["CSS", "Design", "Tips"],
    image: "/images/blogs/css-tips.jpg",
    slug: "css-tips-every-developer-should-know",
    featured: false,
  },
  {
    id: 4,
    title: "Getting Started with Tailwind CSS",
    excerpt:
      "A beginner-friendly guide to using Tailwind CSS for building beautiful, responsive user interfaces quickly.",
    longDescription:
      "Tailwind CSS has revolutionized the way developers build user interfaces. Instead of writing custom CSS, you use utility classes directly in your HTML/JSX. In this beginner-friendly guide, I cover installation and setup with Next.js, understanding the utility-first approach, responsive design with breakpoint prefixes, customizing your tailwind.config.js, building common components like cards, buttons, and navbars, dark mode implementation, and tips for keeping your code clean with @apply and component extraction. By the end, you will be able to build any UI design quickly and consistently.",
    date: "2024-12-28",
    readTime: "6 min read",
    category: "CSS",
    tags: ["Tailwind", "CSS", "Frontend"],
    image: "/images/blogs/tailwind.jpg",
    slug: "getting-started-with-tailwind",
    featured: false,
  },
  {
    id: 5,
    title: "REST API Best Practices",
    excerpt:
      "Learn the best practices for designing and building clean, scalable REST APIs with Node.js and Express.",
    longDescription:
      "Building a good REST API is about more than just making endpoints work. In this post, I cover the best practices I have learned: proper HTTP method usage (GET, POST, PUT, DELETE), consistent URL naming conventions, pagination and filtering for large datasets, proper error handling with status codes, input validation with Joi or Zod, authentication with JWT tokens, rate limiting to prevent abuse, API versioning strategies, documentation with Swagger, and testing with Postman. These practices will help you build APIs that are clean, scalable, and easy to maintain.",
    date: "2024-12-20",
    readTime: "7 min read",
    category: "Backend",
    tags: ["API", "Node.js", "Backend"],
    image: "/images/blogs/api.jpg",
    slug: "rest-api-best-practices",
    featured: true,
  },
  {
    id: 6,
    title: "Git & GitHub for Beginners",
    excerpt:
      "A complete beginner guide to version control with Git and collaborating with GitHub.",
    longDescription:
      "Git is the most important tool every developer must learn. In this complete beginner guide, I explain what version control is and why it matters, basic Git commands (init, add, commit, push, pull), branching and merging strategies, resolving merge conflicts, creating and managing GitHub repositories, pull requests and code reviews, GitHub Actions for CI/CD basics, writing good commit messages, using .gitignore properly, and collaborating with other developers. Whether you are a solo developer or working in a team, mastering Git will make your workflow much smoother.",
    date: "2024-12-15",
    readTime: "5 min read",
    category: "Tools",
    tags: ["Git", "GitHub", "Version Control"],
    image: "/images/blogs/git.jpg",
    slug: "git-github-for-beginners",
    featured: false,
  },
]

export const blogCategories = [
  { id: "all", label: "All Posts" },
  { id: "Web Development", label: "Web Dev" },
  { id: "Full Stack", label: "Full Stack" },
  { id: "CSS", label: "CSS" },
  { id: "Backend", label: "Backend" },
  { id: "Tools", label: "Tools" },
]

export default blogs