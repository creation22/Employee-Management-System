import React from 'react';

const TaskListNumber = ({ data }) => {
  return (
    <div className="flex mt-10 justify-between gap-5 screen">
      <div className="rounded-xl w-[45%] bg-gradient-to-br from-blue-500 to-blue-600 py-6 px-9 shadow-lg border border-blue-400/20 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-3xl font-bold text-white mb-2">
          {data.tasks.filter(task => task.newTask).length}
        </h2>
        <h3 className="text-xl font-medium text-blue-100">New Tasks</h3>
      </div>
      
      <div className="rounded-xl w-[45%] bg-gradient-to-br from-yellow-500 to-yellow-600 py-6 px-9 shadow-lg border border-yellow-400/20 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-3xl font-bold text-white mb-2">
          {data.tasks.filter(task => task.active).length}
        </h2>
        <h3 className="text-xl font-medium text-yellow-100">Active Tasks</h3>
      </div>
      
      <div className="rounded-xl w-[45%] bg-gradient-to-br from-green-500 to-green-600 py-6 px-9 shadow-lg border border-green-400/20 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-3xl font-bold text-white mb-2">
          {data.tasks.filter(task => task.completed).length}
        </h2>
        <h3 className="text-xl font-medium text-green-100">Completed</h3>
      </div>
      
      <div className="rounded-xl w-[45%] bg-gradient-to-br from-red-500 to-red-600 py-6 px-9 shadow-lg border border-red-400/20 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-3xl font-bold text-white mb-2">
          {data.tasks.filter(task => task.failed).length}
        </h2>
        <h3 className="text-xl font-medium text-red-100">Failed</h3>
      </div>
    </div>
  );
};

export default TaskListNumber;