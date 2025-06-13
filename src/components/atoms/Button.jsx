import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({ children, className = '', iconName, ...props }) => {
  const { whileHover = { scale: 1.05 }, whileTap = { scale: 0.95 }, ...restProps } = props;

  return (
    <motion.button
      whileHover={whileHover}
      whileTap={whileTap}
      className={`flex items-center justify-center transition-all ${className}`}
      {...restProps}
    >
      {iconName && <ApperIcon name={iconName} className="w-5 h-5 mr-2" />}
      {children}
    </motion.button>
  );
};

export default Button;