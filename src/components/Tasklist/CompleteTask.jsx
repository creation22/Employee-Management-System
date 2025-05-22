import React from 'react';

const CompleteTask = ({ data }) => {
  return (
    <div className="flex-shrink-0 h-full w-[300px] bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 shadow-lg border border-green-400/20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="bg-emerald-600 px-3 py-1 rounded-lg text-white text-xs font-semibold shadow-sm">
          {data.category}
        </h3>
        <h4 className="text-xs text-green-50 font-medium">{data.date}</h4>
      </div>
      
      <h2 className="text-xl font-bold text-white mb-3 leading-tight">
        {data.title}
      </h2>
      
      <p className="text-sm text-green-100 mb-6 leading-relaxed h-20 overflow-y-auto">
        {data.description}
      </p>
      
      <div className="flex justify-center">
        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
          <span className="text-white font-medium text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Completed
          </span>
        </div>
      </div>
    </div>
  );
};

export default CompleteTask;