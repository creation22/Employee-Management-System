import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const NewTask = ({ data, onTaskUpdate }) => {
  const [userData, setUserData] = useContext(AuthContext);

  const acceptTask = () => {
    const updatedUserData = { ...userData };
    updatedUserData.employees.forEach(employee => {
      employee.tasks.forEach(task => {
        if (task.title === data.title && task.date === data.date) {
          task.newTask = false;
          task.active = true;
        }
      });
    });
    setUserData(updatedUserData);
    localStorage.setItem('employees', JSON.stringify(updatedUserData.employees));
    if (onTaskUpdate) onTaskUpdate();
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
          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md btn-hover"
        >
          Accept Task
        </button>
      </div>
    </div>
  );
};

export default NewTask;