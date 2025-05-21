import React from 'react';

const TaskList = () => {
  return (
    <div
      id="tasklist"
      className="h-[55%] overflow-x-auto w-full mt-10 flex items-center justify-start gap-6 flex-nowrap"
    >
      <div className="flex-shrink-0 h-full w-[300px] bg-yellow-500 rounded-xl">
        <div className="flex justify-between items-center p-5 text-sm ">
          <h3 className="bg-red-600 px-3 py-1 rounded text-white">High</h3>
          <h4 className="text-sm">20 Feb 2024</h4>
        </div>
        <h2 className="mt-5 p-3 text-xl font-semibold">Make a Portfolio Website</h2>
        <p className="text-sm m-3 p-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque qui cum ratione expedita non numquam!
        </p>
      </div>

      <div className="flex-shrink-0 h-full w-[300px] bg-green-500 rounded-xl">
        <div className="flex justify-between items-center p-5 text-sm">
          <h3 className="bg-red-600 px-3 py-1 rounded text-white">High</h3>
          <h4 className="text-sm">20 Feb 2024</h4>
        </div>
        <h2 className="mt-5 p-3 text-xl font-semibold">Make a Portfolio Website</h2>
        <p className="text-sm m-3 p-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque qui cum ratione expedita non numquam!
        </p>
      </div>

      <div className="flex-shrink-0 h-full w-[300px] bg-blue-500 rounded-xl">
        <div className="flex justify-between items-center p-5 text-sm">
          <h3 className="bg-red-600 px-3 py-1 rounded text-white">High</h3>
          <h4 className="text-sm">20 Feb 2024</h4>
        </div>
        <h2 className="mt-5 p-3 text-xl font-semibold">Make a Portfolio Website</h2>
        <p className="text-sm m-3 p-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque qui cum ratione expedita non numquam!
        </p>
      </div>

      <div className="flex-shrink-0 h-full w-[300px] bg-purple-500 rounded-xl">
        <div className="flex justify-between items-center p-5 text-sm">
          <h3 className="bg-red-600 px-3 py-1 rounded text-white">High</h3>
          <h4 className="text-sm">20 Feb 2024</h4>
        </div>
        <h2 className="mt-5 p-3 text-xl font-semibold">Make a Portfolio Website</h2>
        <p className="text-sm m-3 p-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque qui cum ratione expedita non numquam!
        </p>
      </div>
    </div>
  );
};

export default TaskList;
