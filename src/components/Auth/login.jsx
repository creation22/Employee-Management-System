import React, { useState } from 'react';

const Login = ({ handlelogin }) => {

  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');  
  const submitHandler = (e) => {
    e.preventDefault();
    handlelogin(email , password)
    setEmail('');
    setPassword('');
  }
  return (
    <div className='flex items-center justify-center h-screen w-screen'>
      <div className='border-2 border-emerald-600 p-10 rounded-2xl'> 
        <form 
        onSubmit={(e) => {
          submitHandler(e);

        }}
        className='flex flex-col gap-6 w-80'>
          <input 
            className='border-2 border-emerald-600 text-lg py-3 px-5 rounded-full placeholder:text-gray-400 bg-transparent outline-none' 
            type="email" 
            placeholder='Enter your email' 
            required 
            value = {email} 
            onChange = {(e)=> {
              setEmail(e.target.value)
            }}
          />
          <input 
            className='border-2 border-emerald-600 text-lg py-3 px-5 rounded-full placeholder:text-gray-400 bg-transparent outline-none' 
            type="password" 
            placeholder='Enter your password' 
            value={password}
            onChange = {(e) => {
              setPassword(e.target.value)
            }}
            required 
          />
          <button 
            className='text-white bg-emerald-600 hover:bg-emerald-700 transition duration-200 text-lg py-3 px-5 rounded-full'
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
