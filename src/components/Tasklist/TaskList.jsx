import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import NewTask from './NewTask';
import AcceptTask from './AcceptTask';
import CompleteTask from './CompleteTask';
import FailedTask from './FailedTask';

const TaskList = ({ data, onDataRefresh }) => {
  const [userData, setUserData] = useContext(AuthContext);
  const [currentUserData, setCurrentUserData] = useState(data);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Update current user data when context changes
    if (userData && userData.employees && data) {
      const updatedUser = userData.employees.find(emp => emp.id === data.id);
      if (updatedUser) {
        setCurrentUserData(updatedUser);
      }
    }
  }, [userData, data]);

  const handleTaskUpdate = async () => {
    setIsLoading(true);
    try {
      // Small delay to ensure localStorage is updated
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Refresh data from context
      if (userData && userData.employees && data) {
        const updatedUser = userData.employees.find(emp => emp.id === data.id);
        if (updatedUser) {
          setCurrentUserData(updatedUser);
        }
      }
      
      // Notify parent component
      if (onDataRefresh) {
        onDataRefresh();
      }
    } catch (error) {
      console.error('Error refreshing task data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUserData) {
    return (
      <div className="h-[55%] flex items-center justify-center mt-10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p className="text-gray-400 text-lg">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (!currentUserData.tasks || currentUserData.tasks.length === 0) {
    return (
      <div className="h-[55%] flex items-center justify-center mt-10">
        <div className="flex-shrink-0 h-64 w-[300px] bg-gray-700/30 rounded-xl p-8 flex flex-col items-center justify-center border border-gray-600/50">
          <div className="text-6xl mb-4">📋</div>
          <p className="text-gray-400 text-center text-lg mb-2">No tasks assigned yet</p>
          <p className="text-gray-500 text-center text-sm">New tasks will appear here when assigned by admin</p>
        </div>
      </div>
    );
  }

  const renderTask = (task, idx) => {
    const taskKey = `${task.title}-${task.date}-${task.category}-${idx}`;
    
    if (task.active) {
      return (
        <AcceptTask 
          key={taskKey} 
          data={task} 
          onTaskUpdate={handleTaskUpdate} 
        />
      );
    }
    if (task.newTask) {
      return (
        <NewTask 
          key={taskKey} 
          data={task} 
          onTaskUpdate={handleTaskUpdate} 
        />
      );
    }
    if (task.completed) {
      return <CompleteTask key={taskKey} data={task} />;
    }
    if (task.failed) {
      return <FailedTask key={taskKey} data={task} />;
    }
    return null;
  };

  return (
    <div className="mt-10">
      {isLoading && (
        <div className="mb-4 p-3 bg-blue-500/20 border border-blue-500/50 rounded-xl text-blue-400 text-sm text-center">
          Updating tasks...
        </div>
      )}
      
      <div
        id="tasklist"
        className="h-[55%] overflow-x-auto w-full flex items-center justify-start gap-6 flex-nowrap py-4"
        style={{ minHeight: '400px' }}
      >
        {currentUserData.tasks.map((task, idx) => renderTask(task, idx))}
      </div>

      {/* Task Statistics */}
      <div className="mt-8 bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Task Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-blue-500/20 p-3 rounded-lg">
            <div className="text-2xl font-bold text-blue-400">
              {currentUserData.tasks.filter(task => task.newTask).length}
            </div>
            <div className="text-sm text-gray-300">New</div>
          </div>
          <div className="bg-yellow-500/20 p-3 rounded-lg">
            <div className="text-2xl font-bold text-yellow-400">
              {currentUserData.tasks.filter(task => task.active).length}
            </div>
            <div className="text-sm text-gray-300">Active</div>
          </div>
          <div className="bg-green-500/20 p-3 rounded-lg">
            <div className="text-2xl font-bold text-green-400">
              {currentUserData.tasks.filter(task => task.completed).length}
            </div>
            <div className="text-sm text-gray-300">Completed</div>
          </div>
          <div className="bg-red-500/20 p-3 rounded-lg">
            <div className="text-2xl font-bold text-red-400">
              {currentUserData.tasks.filter(task => task.failed).length}
            </div>
            <div className="text-sm text-gray-300">Failed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;