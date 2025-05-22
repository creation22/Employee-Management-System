import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { addTaskToEmployee } from "../../utils/localStorage";

const CreateTask = () => {
  const [userData, setUserData] = useContext(AuthContext);
  
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!taskTitle.trim() || !taskDescription.trim() || !taskDate || !assignTo.trim() || !category.trim()) {
      showMessage('Please fill in all fields', 'error');
      setIsSubmitting(false);
      return;
    }

    // Check if employee exists
    const employeeExists = userData?.employees?.find(emp => 
      emp.firstName.toLowerCase() === assignTo.toLowerCase()
    );

    if (!employeeExists) {
      showMessage(`Employee "${assignTo}" not found`, 'error');
      setIsSubmitting(false);
      return;
    }

    try {
      const newTask = {
        title: taskTitle.trim(),
        description: taskDescription.trim(),
        date: taskDate,
        category: category.trim(),
        active: false,
        newTask: true,
        completed: false,
        failed: false
      };

      // Update local state
      const updatedUserData = { ...userData };
      updatedUserData.employees = updatedUserData.employees.map(emp => {
        if (emp.firstName.toLowerCase() === assignTo.toLowerCase()) {
          return {
            ...emp,
            tasks: [...emp.tasks, newTask]
          };
        }
        return emp;
      });

      // Update localStorage
      const updatedEmployees = addTaskToEmployee(employeeExists.firstName, newTask);
      
      if (updatedEmployees) {
        // Update context
        setUserData({
          ...userData,
          employees: updatedEmployees
        });

        // Reset form
        setTaskTitle('');
        setTaskDescription('');
        setTaskDate('');  
        setAssignTo('');
        setCategory('');

        showMessage('Task created successfully!', 'success');
      } else {
        throw new Error('Failed to save task');
      }
    } catch (error) {
      console.error('Error creating task:', error);
      showMessage('Failed to create task. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!userData || !userData.employees) {
    return (
      <div className="mt-10 bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50">
        <p className="text-gray-400 text-center">Loading employees data...</p>
      </div>
    );
  }

  return (
    <div className="mt-10">
      {message.text && (
        <div className={`mb-4 p-4 rounded-xl ${
          message.type === 'success' 
            ? 'bg-green-500/20 border border-green-500/50 text-green-400' 
            : 'bg-red-500/20 border border-red-500/50 text-red-400'
        }`}>
          {message.text}
        </div>
      )}

      <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Create New Task
        </h2>

        <form onSubmit={submitHandler} className="flex flex-wrap w-full items-start justify-between">
          <div className="w-1/2 pr-8">
            <div className="mb-6">
              <h3 className="text-sm text-gray-300 mb-2 font-medium">Task Title *</h3>
              <input  
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className='text-sm py-3 px-4 w-full rounded-xl outline-none bg-gray-700/50 border border-gray-600 focus:border-blue-500 transition-colors text-white placeholder-gray-400'
                type="text" 
                placeholder="Design a modern dashboard UI"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm text-gray-300 mb-2 font-medium">Date *</h3>
              <input 
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                className='text-sm py-3 px-4 w-full rounded-xl outline-none bg-gray-700/50 border border-gray-600 focus:border-blue-500 transition-colors text-white'
                type="date"
                min={new Date().toISOString().split('T')[0]}
                disabled={isSubmitting}
              />
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm text-gray-300 mb-2 font-medium">Assign to *</h3>
              <select 
                value={assignTo}
                onChange={(e) => setAssignTo(e.target.value)}
                className='text-sm py-3 px-4 w-full rounded-xl outline-none bg-gray-700/50 border border-gray-600 focus:border-blue-500 transition-colors text-white'
                disabled={isSubmitting}
              >
                <option value="">Select Employee</option>
                {userData.employees.map(emp => (
                  <option key={emp.id} value={emp.firstName}>
                    {emp.firstName} ({emp.email})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm text-gray-300 mb-2 font-medium">Category *</h3>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='text-sm py-3 px-4 w-full rounded-xl outline-none bg-gray-700/50 border border-gray-600 focus:border-blue-500 transition-colors text-white'
                disabled={isSubmitting}
              >
                <option value="">Select Category</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Design">Design</option>
                <option value="Testing">Testing</option>
                <option value="DevOps">DevOps</option>
                <option value="Documentation">Documentation</option>
                <option value="Research">Research</option>
                <option value="Bug Fixing">Bug Fixing</option>
                <option value="Optimization">Optimization</option>
                <option value="Security">Security</option>
                <option value="Analysis">Analysis</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="w-2/5 flex flex-col items-start">
            <h3 className="text-sm text-gray-300 mb-2 font-medium">Description *</h3>
            <textarea 
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              cols="30" 
              rows="10" 
              className="w-full h-44 text-sm py-3 px-4 rounded-xl outline-none bg-gray-700/50 border border-gray-600 focus:border-blue-500 transition-colors text-white placeholder-gray-400 resize-none custom-scrollbar"
              placeholder="Provide detailed description of the task..."
              disabled={isSubmitting}
            ></textarea>
            
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`py-3 px-6 rounded-xl text-sm font-medium mt-6 w-full text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                isSubmitting 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700'
              }`}
            >
              {isSubmitting ? 'Creating...' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;