const employees = [
  {
    id: 1,
    email: "employee1@example.com",
    password: "1234",
    tasks: [
      {
        title: "Fix login bug",
        description: "Resolve issue with user authentication timing out.",
        date: "2025-05-20",
        category: "Bug Fixing",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      },
      {
        title: "Create dashboard UI",
        description: "Design the admin dashboard layout using Tailwind CSS.",
        date: "2025-05-18",
        category: "UI/UX",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      },
      {
        title: "Write test cases",
        description: "Implement unit tests for login module.",
        date: "2025-05-17",
        category: "Testing",
        active: false,
        newTask: false,
        completed: false,
        failed: true
      }
    ]
  },
  {
    id: 2,
    email: "employee2@example.com",
    password: "1234",
    tasks: [
      {
        title: "Setup database",
        description: "Initialize PostgreSQL and set up user tables.",
        date: "2025-05-15",
        category: "Backend",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      },
      {
        title: "Create API routes",
        description: "Develop routes for user management.",
        date: "2025-05-20",
        category: "Backend",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      },
      {
        title: "Optimize queries",
        description: "Improve performance of DB queries for reports.",
        date: "2025-05-19",
        category: "Optimization",
        active: true,
        newTask: false,
        completed: false,
        failed: false
      },
      {
        title: "Research Redis",
        description: "Investigate using Redis for caching sessions.",
        date: "2025-05-21",
        category: "Research",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      }
    ]
  },
  {
    id: 3,
    email: "employee3@example.com",
    password: "1234",
    tasks: [
      {
        title: "Update user profile page",
        description: "Add new fields and responsive design.",
        date: "2025-05-17",
        category: "Frontend",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      },
      {
        title: "Add dark mode toggle",
        description: "Implement dark mode using Tailwind CSS.",
        date: "2025-05-18",
        category: "Frontend",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      },
      {
        title: "Fix navbar issue",
        description: "Resolve sticky navbar overlapping content.",
        date: "2025-05-16",
        category: "Bug Fixing",
        active: false,
        newTask: false,
        completed: false,
        failed: true
      },
      {
        title: "Accessibility audit",
        description: "Ensure WCAG 2.1 compliance for all components.",
        date: "2025-05-21",
        category: "Testing",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      }
    ]
  },
  {
    id: 4,
    email: "employee4@example.com",
    password: "1234",
    tasks: [
      {
        title: "Implement logout feature",
        description: "Ensure token is cleared and user is redirected.",
        date: "2025-05-15",
        category: "Authentication",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      },
      {
        title: "Set up GitHub Actions",
        description: "Add CI/CD workflow for testing and build.",
        date: "2025-05-19",
        category: "DevOps",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      },
      {
        title: "Add loader animation",
        description: "Create a loader for async content using Framer Motion.",
        date: "2025-05-18",
        category: "Frontend",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      }
    ]
  },
  {
    id: 5,
    email: "employee5@example.com",
    password: "1234",
    tasks: [
      {
        title: "Integrate payment gateway",
        description: "Set up Razorpay integration for premium plans.",
        date: "2025-05-20",
        category: "Integration",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      },
      {
        title: "Write user guide",
        description: "Draft documentation for onboarding new users.",
        date: "2025-05-17",
        category: "Documentation",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      },
      {
        title: "Conduct feedback survey",
        description: "Send out and analyze feedback form.",
        date: "2025-05-16",
        category: "Product Management",
        active: false,
        newTask: false,
        completed: false,
        failed: true
      },
      {
        title: "Refactor codebase",
        description: "Organize file structure and remove unused imports.",
        date: "2025-05-19",
        category: "Refactoring",
        active: true,
        newTask: false,
        completed: false,
        failed: false
      },
      {
        title: "Deploy to Netlify",
        description: "Build and deploy frontend to Netlify.",
        date: "2025-05-21",
        category: "Deployment",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      }
    ]
  }
];

  const admin =  [{
    "id": 101,
    "email": "admin@example.com",
    "password": "1234"
  }]


export const setLocalStorage = ()=> {
    localStorage.setItem("employees", JSON.stringify(employees));
    localStorage.setItem("admin", JSON.stringify(admin))
}
export const getLocalStorage = () => {
    const employees = JSON.parse(localStorage.getItem('employees'))
    const admin = JSON.parse(localStorage.getItem('admin'))

    return { employees, admin } 
}
