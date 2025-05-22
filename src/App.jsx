import React, { useContext, useEffect, useState } from 'react';
import Login from './components/Auth/login';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import { getLocalStorage } from './utils/localStorage';
import { AuthContext } from './context/AuthProvider';
import { Analytics } from "@vercel/analytics/next"

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [userData, setUserData] = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (loggedInUser) {
        const userData = JSON.parse(loggedInUser);
        setUser(userData.role);
        if (userData.data) {
          setLoggedInUserData(userData.data);
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      localStorage.removeItem('loggedInUser');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = (email, password) => {
    try {
      // Trim inputs
      const trimmedEmail = email.trim().toLowerCase();
      const trimmedPassword = password.trim();

      // Validate inputs
      if (!trimmedEmail || !trimmedPassword) {
        alert('Please enter both email and password');
        return;
      }

      // Admin login
      if (trimmedEmail === 'admin@me.com' && trimmedPassword === "1234") {
        setUser('admin');
        localStorage.setItem('loggedInUser', JSON.stringify({ 
          role: 'admin',
          timestamp: new Date().getTime()
        }));
        return;
      }

      // Employee login
      if (userData && userData.employees) {
        const employee = userData.employees.find((e) => 
          e.email.toLowerCase() === trimmedEmail && e.password === trimmedPassword
        );
        
        if (employee) {
          setUser('employee');
          setLoggedInUserData(employee);
          localStorage.setItem('loggedInUser', JSON.stringify({ 
            role: 'employee', 
            data: employee,
            timestamp: new Date().getTime()
          }));
          return;
        }
      }

      // Invalid credentials
      alert('Invalid email or password. Please check your credentials and try again.');
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  const changeUser = (newUser) => {
    setUser(newUser);
    setLoggedInUserData(null);
    localStorage.removeItem('loggedInUser');
  };

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <>
        <Analytics />
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      </>
    );
  }

  // Show loading if userData is not yet available
  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Initializing application...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {!user ? (
        <Login handleLogin={handleLogin} />
      ) : user === 'admin' ? (
        <AdminDashboard changeUser={changeUser} />
      ) : (
        <EmployeeDashboard data={loggedInUserData} changeUser={changeUser} />
      )}
    </div>
  );
};

export default App;