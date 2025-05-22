import React from 'react';

const FailedTask = ({ data }) => {
  return (
    <div className="flex-shrink-0 h-full w-[300px] bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-5 shadow-lg border border-red-400/20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="bg-red-700 px-3 py-1 rounded-lg text-white text-xs font-semibold shadow-sm">
          {data.category}
        </h3>
        <h4 className="text-xs text-red-50 font-medium">{data.date}</h4>
      </div>
      
      <h2 className="text-xl font-bold text-white mb-3 leading-tight">
        {data.title}
      </h2>
      
      <p className="text-sm text-red-100 mb-6 leading-relaxed h-20 overflow-y-auto">
        {data.description}
      </p>
      
      <div className="flex justify-center">
        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
          <span className="text-white font-medium text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Failed
          </span>
        </div>
      </div>
    </div>
  );
};

export default FailedTask;