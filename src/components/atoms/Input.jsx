import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const Input = ({ className = '', iconName, ...props }) => {
  const { type = 'text', ...restProps } = props;

  return (
    <div className="relative">
      {iconName && (
        <ApperIcon 
          name={iconName} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" 
        />
      )}
      <input
        type={type}
        className={`w-full py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all ${iconName ? 'pl-12 pr-4' : 'px-4'} ${className}`}
        {...restProps}
      />
    </div>
  );
};

export default Input;