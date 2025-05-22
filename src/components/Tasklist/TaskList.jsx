import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import NewTask from './NewTask';
import AcceptTask from './AcceptTask';
import CompleteTask from './CompleteTask';
import FailedTask from './FailedTask';

const TaskList = ({ data }) => {
  const [userData, setUserData] = useContext(AuthContext);
  const [currentUserData, setCurrentUserData] = useState(data);

  useEffect(() => {
    // Update current user data when context changes
    if (userData && data) {
      const updatedUser = userData.employees.find(emp => emp.id === data.id);
      if (updatedUser) {
        setCurrentUserData(updatedUser);
      }
    }
  }, [userData, data]);

  const handleTaskUpdate = () => {
    // Force re-render by updating the current user data
    if (userData && data) {
      const updatedUser = userData.employees.find(emp => emp.id === data.id);
      if (updatedUser) {
        setCurrentUserData(updatedUser);
      }
    }
  };

  if (!currentUserData || !currentUserData.tasks) {
    return (
      <div className="h-[55%] flex items-center justify-center mt-10">
        <p className="text-gray-400 text-lg">Loading tasks...</p>
      </div>
    );
  }

  return (
    <div
      id="tasklist"
      className="h-[55%] overflow-x-auto w-full mt-10 flex items-center justify-start gap-6 flex-nowrap py-4"
    >
      {currentUserData.tasks.map((task, idx) => {
        if (task.active) {
          return <AcceptTask key={`${task.title}-${idx}`} data={task} onTaskUpdate={handleTaskUpdate} />;
        }
        if (task.newTask) {
          return <NewTask key={`${task.title}-${idx}`} data={task} onTaskUpdate={handleTaskUpdate} />;
        }
        if (task.completed) {
          return <CompleteTask key={`${task.title}-${idx}`} data={task} />;
        }
        if (task.failed) {
          return <FailedTask key={`${task.title}-${idx}`} data={task} />;
        }
        return null;
      })}
      
      {currentUserData.tasks.length === 0 && (
        <div className="flex-shrink-0 h-full w-[300px] bg-gray-700/30 rounded-xl p-5 flex items-center justify-center border border-gray-600/50">
          <p className="text-gray-400 text-center">No tasks assigned yet</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;