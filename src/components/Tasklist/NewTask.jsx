import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const NewTask = ({ data, onTaskUpdate }) => {
  const [userData, setUserData] = useContext(AuthContext);
  const [isAccepting, setIsAccepting] = useState(false);

  const acceptTask = async () => {
    if (isAccepting) return;
    
    setIsAccepting(true);
    
    try {
      const updatedUserData = { ...userData };
      let taskUpdated = false;

      updatedUserData.employees = updatedUserData.employees.map(employee => {
        const updatedEmployee = { ...employee };
        updatedEmployee.tasks = employee.tasks.map(task => {
          if (task.title === data.title && task.date === data.date && task.category === data.category) {
            taskUpdated = true;
            return {
              ...task,
              newTask: false,
              active: true
            };
          }
          return task;
        });
        return updatedEmployee;
      });

      if (taskUpdated) {
        // Update context
        setUserData(updatedUserData);
        
        // Update localStorage  
        localStorage.setItem('employees', JSON.stringify(updatedUserData.employees));
        
        // Update logged in user data if this task belongs to current user
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
          const userInfo = JSON.parse(loggedInUser);
          if (userInfo.role === 'employee' && userInfo.data) {
            const updatedEmployee = updatedUserData.employees.find(emp => emp.id === userInfo.data.id);
            if (updatedEmployee) {
              userInfo.data = updatedEmployee;
              localStorage.setItem('loggedInUser', JSON.stringify(userInfo));
            }
          }
        }
        
        // Notify parent component
        if (onTaskUpdate) {
          onTaskUpdate();
        }
      }
    } catch (error) {
      console.error('Error accepting task:', error);
      alert('Failed to accept task. Please try again.');
    } finally {
      setIsAccepting(false);
    }
  };

  return (
    <div className="flex-shrink-0 h-full w-[300px] bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 shadow-lg border border-blue-400/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      <div className="flex justify-between items-center mb-4">
        <h3 className="bg-red-500 px-3 py-1 rounded-lg text-white text-xs font-semibold shadow-sm">
          {data.category}
        </h3>
        <h4 className="text-xs text-blue-50 font-medium">{data.date}</h4>
      </div>
      
      <h2 className="text-xl font-bold text-white mb-3 leading-tight">
        {data.title}
      </h2>
      
      <p className="text-sm text-blue-100 mb-6 leading-relaxed h-20 overflow-y-auto custom-scrollbar">
        {data.description}
      </p>
      
      <div className="flex gap-2">
        <button 
          onClick={acceptTask}
          disabled={isAccepting}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md btn-hover ${
            isAccepting 
              ? 'bg-gray-500 cursor-not-allowed' 
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isAccepting ? 'Accepting...' : 'Accept Task'}
        </button>
      </div>
    </div>
  );
};

export default NewTask; 