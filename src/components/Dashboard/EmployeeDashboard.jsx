import React, { useContext } from 'react';
import Header from '../others/Header';
import TaskListNumber from '../others/TaskListNumber';
import TaskList from '../Tasklist/TaskList';
import { AuthContext } from '../../context/AuthProvider';

const EmployeeDashboard = ({ data }) => {
  return (
    <div className='p-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen'>
      <Header data={data} />
      <TaskListNumber data={data} />
      <TaskList data={data} />
    </div>
  );
};

export default EmployeeDashboard;