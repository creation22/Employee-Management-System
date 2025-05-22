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
        date: "2025-05-22",
        category: "Research",
        active: false,
        newTask: true,
        completed: false,
        failed: false
      }
    ]
  },
  {
    id: 3,
    firstName: "Ravi",
    email: "employee3@example.com",
    password: "1234",
    tasks: [
      {
        title: "Mobile app testing",
        description: "Test the mobile application on various devices and screen sizes.",
        date: "2025-05-21",
        category: "Testing",
        active: true,
        newTask: false,
        completed: false,
        failed: false
      },
      {
        title: "Update documentation",
        description: "Update API documentation with new endpoints and usage examples.",
        date: "2025-05-16",
        category: "Documentation",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      }
    ]
  },
  {
    id: 4,
    firstName: "Sneha",
    email: "employee4@example.com",
    password: "1234",
    tasks: [
      {
        title: "Design system audit",
        description: "Review and update the design system components for consistency.",
        date: "2025-05-23",
        category: "Design",
        active: false,
        newTask: true,
        completed: false,
        failed: false
      },
      {
        title: "User feedback analysis",
        description: "Analyze user feedback from the latest product release and create improvement plan.",
        date: "2025-05-14",
        category: "Analysis",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      }
    ]
  },
  {
    id: 5,
    firstName: "Amit",
    email: "employee5@example.com",
    password: "1234",
    tasks: [
      {
        title: "Security audit",
        description: "Conduct comprehensive security audit of the application infrastructure.",
        date: "2025-05-25",
        category: "Security",
        active: false,
        newTask: true,
        completed: false,
        failed: false
      },
      {
        title: "Performance monitoring",
        description: "Set up performance monitoring tools and create alerting system.",
        date: "2025-05-13",
        category: "DevOps",
        active: false,
        newTask: false,
        completed: false,
        failed: true
      }
    ]
  }
];

const admin = [
  {
    id: 1,
    firstName: "Admin",
    email: "admin@me.com",
    password: "1234"
  }
];

export const setLocalStorage = () => {
  try {
    // Check if data already exists in localStorage
    const existingEmployees = localStorage.getItem('employees');
    const existingAdmin = localStorage.getItem('admin');
    
    // Only set if data doesn't exist
    if (!existingEmployees) {
      localStorage.setItem('employees', JSON.stringify(employees));
    }
    if (!existingAdmin) {
      localStorage.setItem('admin', JSON.stringify(admin));
    }
  } catch (error) {
    console.error('Error setting localStorage:', error);
  }
};

export const getLocalStorage = () => {
  try {
    const employeesData = localStorage.getItem('employees');
    const adminData = localStorage.getItem('admin');
    
    return {
      employees: employeesData ? JSON.parse(employeesData) : employees,
      admin: adminData ? JSON.parse(adminData) : admin
    };
  } catch (error) {
    console.error('Error getting localStorage:', error);
    // Return default data if parsing fails
    return {
      employees: employees,
      admin: admin
    };
  }
};

export const updateEmployeeInStorage = (updatedEmployee) => {
  try {
    const { employees: currentEmployees } = getLocalStorage();
    const updatedEmployees = currentEmployees.map(emp => 
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    );
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    return updatedEmployees;
  } catch (error) {
    console.error('Error updating employee in storage:', error);
    return null;
  }
};

export const addTaskToEmployee = (employeeName, newTask) => {
  try {
    const { employees: currentEmployees } = getLocalStorage();
    const updatedEmployees = currentEmployees.map(emp => {
      if (emp.firstName === employeeName) {
        return {
          ...emp,
          tasks: [...emp.tasks, newTask]
        };
      }
      return emp;
    });
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    return updatedEmployees;
  } catch (error) {
    console.error('Error adding task to employee:', error);
    return null;
  }
};