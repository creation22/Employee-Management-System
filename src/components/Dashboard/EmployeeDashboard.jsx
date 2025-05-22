import React, { useContext, useState, useEffect } from 'react';
import Header from '../others/Header';
import TaskListNumber from '../others/TaskListNumber';
import TaskList from '../Tasklist/TaskList';
import { AuthContext } from '../../context/AuthProvider';

const EmployeeDashboard = ({ data, changeUser }) => {
  const [userData, setUserData] = useContext(AuthContext);
  const [currentEmployeeData, setCurrentEmployeeData] = useState(data);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Update employee data when context changes or when tasks are updated
    if (userData && userData.employees && data) {
      const updatedEmployee = userData.employees.find(emp => emp.id === data.id);
      if (updatedEmployee) {
        setCurrentEmployeeData(updatedEmployee);
      }
    }
  }, [userData, data, refreshKey]);

  const handleDataRefresh = () => {
    // Force refresh by updating the key
    setRefreshKey(prev => prev + 1);
  };

  if (!currentEmployeeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading employee data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='p-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen'>
      <Header data={currentEmployeeData} changeUser={changeUser} />
      <TaskListNumber data={currentEmployeeData} />
      <TaskList 
        data={currentEmployeeData} 
        onDataRefresh={handleDataRefresh}
        key={refreshKey}
      />
    </div>
  );
};

export default EmployeeDashboard;