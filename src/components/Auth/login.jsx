import React, { useState } from 'react';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    setEmail('');
    setPassword('');
  };

  return (
    <div className='flex items-center justify-center min-h-screen w-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4'>
      <div className='bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 p-12 rounded-3xl shadow-2xl w-full max-w-md'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2'>
            Welcome Back
          </h1>
          <p className='text-gray-400 text-sm'>Sign in to your account to continue</p>
        </div>

        <form onSubmit={submitHandler} className='flex flex-col gap-6'>
          <div>
            <label className='block text-sm font-medium text-gray-300 mb-2'>Email Address</label>
            <input 
              className='w-full bg-gray-700/50 border border-gray-600 text-white text-lg py-4 px-6 rounded-xl placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300' 
              type="email" 
              placeholder='Enter your email' 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-300 mb-2'>Password</label>
            <input 
              className='w-full bg-gray-700/50 border border-gray-600 text-white text-lg py-4 px-6 rounded-xl placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300' 
              type="password" 
              placeholder='Enter your password' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button 
            className='w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg py-4 px-6 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mt-4'
            type="submit"
          >
            Sign In
          </button>
        </form>

        <div className='mt-8 pt-6 border-t border-gray-700/50'>
          <div className='text-center'>
            <p className='text-gray-400 text-sm mb-4'>Demo Credentials:</p>
            <div className='space-y-2 text-xs'>
              <div className='bg-gray-700/30 p-3 rounded-lg'>
                <p className='text-gray-300'><span className='font-semibold'>Admin:</span> admin@me.com / 1234</p>
              </div>
              <div className='bg-gray-700/30 p-3 rounded-lg'>
                <p className='text-gray-300'><span className='font-semibold'>Employee:</span> employee1@example.com / 1234</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;