import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const AllTask = () => {
  const [userData, setUserData] = useContext(AuthContext);

  return (
    <div className='mt-10'>
      <div className='bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 shadow-xl'>
        <h2 className='text-2xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
          All Tasks Overview
        </h2>
        
        <div className='max-h-96 overflow-auto custom-scrollbar'>
          <div className='bg-gray-700/30 mb-4 py-3 px-6 flex justify-between rounded-xl border border-gray-600/50'>
            <h3 className='font-semibold text-gray-300 text-sm'>EMPLOYEE</h3>
            <h3 className='font-semibold text-gray-300 text-sm'>TASK TITLE</h3>
            <h3 className='font-semibold text-gray-300 text-sm'>STATUS</h3>
          </div>
          
          {userData.employees.map(function(elem, idx) {
            return elem.tasks.map(function(task, taskIdx) {
              return (
                <div key={`${idx}-${taskIdx}`} className='bg-gradient-to-r from-gray-700/50 to-gray-600/50 mb-3 py-4 px-6 flex justify-between rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-colors'>
                  <h2 className='text-white font-medium'>{elem.firstName}</h2>
                  <h3 className='text-gray-200 truncate max-w-xs'>{task.title}</h3>
                  <h5 className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    task.completed ? 'bg-green-500 text-white' :
                    task.active ? 'bg-yellow-500 text-black' :
                    task.newTask ? 'bg-blue-500 text-white' :
                    task.failed ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'
                  }`}>
                    {task.completed ? 'Completed' :
                     task.active ? 'Active' :
                     task.newTask ? 'New' :
                     task.failed ? 'Failed' : 'Pending'}
                  </h5>
                </div>
              );
            });
          })}
        </div>
      </div>
    </div>
  );
};

export default AllTask;