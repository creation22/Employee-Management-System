import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const AllTask = () => {
  const [userData, setUserData] = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  if (!userData || !userData.employees) {
    return (
      <div className='mt-10'>
        <div className='bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 shadow-xl'>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading tasks...</p>
          </div>
        </div>
      </div>
    );
  }

  // Flatten all tasks with employee info
  const allTasks = userData.employees.flatMap(employee => 
    employee.tasks.map(task => ({
      ...task,
      employeeName: employee.firstName,
      employeeEmail: employee.email,
      employeeId: employee.id
    }))
  );

  // Filter tasks
  const filteredTasks = allTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'new' && task.newTask) ||
                         (statusFilter === 'active' && task.active) ||
                         (statusFilter === 'completed' && task.completed) ||
                         (statusFilter === 'failed' && task.failed);
    
    return matchesSearch && matchesStatus;
  });

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date) - new Date(a.date);
      case 'employee':
        return a.employeeName.localeCompare(b.employeeName);
      case 'title':
        return a.title.localeCompare(b.title);
      case 'category':
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });

  const getStatusBadge = (task) => {
    if (task.completed) return { text: 'Completed', class: 'bg-green-500 text-white' };
    if (task.active) return { text: 'Active', class: 'bg-yellow-500 text-black' };
    if (task.newTask) return { text: 'New', class: 'bg-blue-500 text-white' };
    if (task.failed) return { text: 'Failed', class: 'bg-red-500 text-white' };
    return { text: 'Pending', class: 'bg-gray-500 text-white' };
  };

  const getTaskStats = () => {
    return {
      total: allTasks.length,
      new: allTasks.filter(t => t.newTask).length,
      active: allTasks.filter(t => t.active).length,
      completed: allTasks.filter(t => t.completed).length,
      failed: allTasks.filter(t => t.failed).length
    };
  };

  const stats = getTaskStats();

  return (
    <div className='mt-10'>
      <div className='bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 shadow-xl'>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <h2 className='text-2xl font-bold text-white mb-4 lg:mb-0 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
            All Tasks Overview
          </h2>
          
          {/* Statistics */}
          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            <div className="bg-gray-700/50 p-2 rounded-lg">
              <div className="font-bold text-gray-300">{stats.total}</div>
              <div className="text-gray-400">Total</div>
            </div>
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <div className="font-bold text-blue-400">{stats.new}</div>
              <div className="text-gray-400">New</div>
            </div>
            <div className="bg-yellow-500/20 p-2 rounded-lg">
              <div className="font-bold text-yellow-400">{stats.active}</div>
              <div className="text-gray-400">Active</div>
            </div>
            <div className="bg-green-500/20 p-2 rounded-lg">
              <div className="font-bold text-green-400">{stats.completed}</div>
              <div className="text-gray-400">Done</div>
            </div>
            <div className="bg-red-500/20 p-2 rounded-lg">
              <div className="font-bold text-red-400">{stats.failed}</div>
              <div className="text-gray-400">Failed</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search tasks, employees, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 text-white text-sm py-2 px-4 rounded-lg placeholder:text-gray-400 outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-700/50 border border-gray-600 text-white text-sm py-2 px-3 rounded-lg outline-none focus:border-blue-500 transition-colors"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-700/50 border border-gray-600 text-white text-sm py-2 px-3 rounded-lg outline-none focus:border-blue-500 transition-colors"
            >
              <option value="date">Sort by Date</option>
              <option value="employee">Sort by Employee</option>
              <option value="title">Sort by Title</option>
              <option value="category">Sort by Category</option>
            </select>
          </div>
        </div>
        
        <div className='max-h-96 overflow-auto custom-scrollbar'>
          {/* Header */}
          <div className='bg-gray-700/30 mb-4 py-3 px-6 flex justify-between items-center rounded-xl border border-gray-600/50'>
            <h3 className='font-semibold text-gray-300 text-sm flex-1'>EMPLOYEE</h3>
            <h3 className='font-semibold text-gray-300 text-sm flex-1 text-center'>TASK TITLE</h3>
            <h3 className='font-semibold text-gray-300 text-sm flex-1 text-center'>CATEGORY</h3>
            <h3 className='font-semibold text-gray-300 text-sm flex-1 text-center'>DATE</h3>
            <h3 className='font-semibold text-gray-300 text-sm flex-1 text-center'>STATUS</h3>
          </div>
          
          {sortedTasks.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📋</div>
              <p className="text-gray-400 text-lg mb-2">No tasks found</p>
              <p className="text-gray-500 text-sm">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'Create some tasks to see them here'}
              </p>
            </div>
          ) : (
            sortedTasks.map((task, idx) => {
              const status = getStatusBadge(task);
              return (
                <div 
                  key={`${task.employeeId}-${task.title}-${idx}`} 
                  className='bg-gradient-to-r from-gray-700/50 to-gray-600/50 mb-3 py-4 px-6 flex justify-between items-center rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-colors'
                >
                  <div className="flex-1">
                    <h2 className='text-white font-medium'>{task.employeeName}</h2>
                    <p className='text-gray-400 text-xs'>{task.employeeEmail}</p>
                  </div>
                  <div className="flex-1 text-center">
                    <h3 className='text-gray-200 font-medium truncate' title={task.title}>
                      {task.title}
                    </h3>
                    <p className='text-gray-400 text-xs truncate' title={task.description}>
                      {task.description}
                    </p>
                  </div>
                  <div className="flex-1 text-center">
                    <span className='bg-gray-600 px-2 py-1 rounded text-xs text-gray-200'>
                      {task.category}
                    </span>
                  </div>
                  <div className="flex-1 text-center">
                    <span className='text-gray-300 text-sm'>{task.date}</span>
                  </div>
                  <div className="flex-1 text-center">
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${status.class}`}>
                      {status.text}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTask;