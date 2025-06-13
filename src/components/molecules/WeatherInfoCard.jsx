import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const WeatherInfoCard = ({ iconName, label, value, unit = '' }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-center"
    >
      <ApperIcon name={iconName} className="w-6 h-6 text-white/80 mx-auto mb-2" />
      <div className="text-sm text-white/80">{label}</div>
      <div className="text-lg font-semibold text-white">
        {value} {unit}
      </div>
    </motion.div>
  );
};

export default WeatherInfoCard;