const employees = [
  {
    id: 1,
    firstName: "Arjun",
    email: "employee1@example.com",
    password: "1234",
    tasks: [
      {
        title: "Fix login bug",
        description: "Resolve issue with user authentication timing out after 10 minutes of inactivity.",
        date: "2025-05-20",
        category: "Bug Fixing",
        active: true,
        newTask: false,
        completed: false,
        failed: false
      },
      {
        title: "Create dashboard UI",
        description: "Design the admin dashboard layout using Tailwind CSS with modern gradients and animations.",
        date: "2025-05-18",
        category: "UI/UX",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      },
      {
        title: "Write test cases",
        description: "Implement comprehensive unit tests for login module including edge cases.",
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
    firstName: "Priya",
    email: "employee2@example.com",
    password: "1234",
    tasks: [
      {
        title: "Setup database",
        description: "Initialize PostgreSQL database and set up user tables with proper relationships.",
        date: "2025-05-15",
        category: "Backend",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      },
      {
        title: "Create API routes",
        description: "Develop RESTful API routes for comprehensive user management system.",
        date: "2025-05-20",
        category: "Backend",
        active: false,
        newTask: true,
        completed: false,
        failed: false
      },
      {
        title: "Optimize queries",
        description: "Improve performance of database queries for generating detailed reports.",
        date: "2025-05-19",
        category: "Optimization",
        active: true,
        newTask: false,
        completed: false,
        failed: false
      },
      {
        title: "Research Redis",
        description: "Investigate implementing Redis for caching user sessions and improving performance.",
        date: "2025-