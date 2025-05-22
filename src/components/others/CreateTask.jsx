import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const CreateTask = () => {
  const [userData, setUserData] = useContext(AuthContext);
  
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [category, setCategory] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    const newTask = {
      title: taskTitle,
      description: taskDescription,
      date: taskDate,
      category: category,
      active: false,
      newTask: true,
      completed: false,
      failed: false
    };

    const data = userData;
    
    data.employees.forEach(function(elem) {
      if (assignTo === elem.firstName) {
        elem.tasks.push(newTask);
      }
    });
    
    setUserData(data);
    console.log(data);

    setTaskTitle('');
    setTaskDescription('');
    setTaskDate('');  
    setAssignTo('');
    setCategory('');
  };

  return (
    <div className="mt-10">
      <form 
        onSubmit={(e) => {
          submitHandler(e);
        }}
        className="flex flex-wrap w-full items-start justify-between bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-2xl"
      >
        <div className="w-1/2 pr-8">
          <div className="mb-6">
            <h3 className="text-sm text-gray-300 mb-2 font-medium">Task Title</h3>
            <input  
              value={taskTitle}
              onChange={(e) => {
                setTaskTitle(e.target.value);
              }}
              className='text-sm py-3 px-4 w-full rounded-xl outline-none bg-gray-700/50 border border-gray-600 focus:border-blue-500 transition-colors text-white placeholder-gray-400'
              type="text" 
              placeholder="Design a modern dashboard UI"
            />
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm text-gray-300 mb-2 font-medium">Date</h3>
            <input 
              value={taskDate}
              onChange={(e) => {
                setTaskDate(e.target.value);
              }}
              className='text-sm py-3 px-4 w-full rounded-xl outline-none bg-gray-700/50 border border-gray-600 focus:border-blue-500 transition-colors text-white'
              type="date"
            />
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm text-gray-300 mb-2 font-medium">Assign to</h3>
            <input 
              value={assignTo}
              onChange={(e) => {
                setAssignTo(e.target.value);
              }}
              className='text-sm py-3 px-4 w-full rounded-xl outline-none bg-gray-700/50 border border-gray-600 focus:border-blue-500 transition-colors text-white placeholder-gray-400'
              type="text" 
              placeholder="Employee name"
            />
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm text-gray-300 mb-2 font-medium">Category</h3>
            <input 
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              className='text-sm py-3 px-4 w-full rounded-xl outline-none bg-gray-700/50 border border-gray-600 focus:border-blue-500 transition-colors text-white placeholder-gray-400'
              type="text" 
              placeholder="Frontend, Backend, Design, etc."
            />
          </div>
        </div>

        <div className="w-2/5 flex flex-col items-start">
          <h3 className="text-sm text-gray-300 mb-2 font-medium">Description</h3>
          <textarea 
            value={taskDescription}
            onChange={(e) => {
              setTaskDescription(e.target.value);
            }}
            cols="30" 
            rows="10" 
            className="w-full h-44 text-sm py-3 px-4 rounded-xl outline-none bg-gray-700/50 border border-gray-600 focus:border-blue-500 transition-colors text-white placeholder-gray-400 resize-none"
            placeholder="Provide detailed description of the task..."
          ></textarea>
          
          <button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 py-3 px-6 rounded-xl text-sm font-medium mt-6 w-full text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;