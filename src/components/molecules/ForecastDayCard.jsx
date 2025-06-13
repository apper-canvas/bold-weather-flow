import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import { format } from 'date-fns';

const ForecastDayCard = ({ day, conditionIcon, highTemp, lowTemp, precipitation, units, formatTemperature }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      whileHover={{ 
        scale: 1.05,
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-4 text-center hover:bg-white/30 transition-all cursor-pointer"
    >
      <div className="text-white/80 font-medium mb-2">
        {format(new Date(day), 'EEE')}
      </div>
      
      <div className="weather-icon mb-3">
        <ApperIcon 
          name={conditionIcon} 
          className="w-12 h-12 text-white mx-auto drop-shadow-md" 
        />
      </div>
      
      <div className="space-y-1">
        <div className="text-white font-semibold text-lg">
          {formatTemperature(highTemp)}°
        </div>
        <div className="text-white/70 text-sm">
          {formatTemperature(lowTemp)}°
        </div>
      </div>
      
      {precipitation > 0 && (
        <div className="flex items-center justify-center gap-1 mt-2 text-white/60 text-xs">
          <ApperIcon name="Droplets" className="w-3 h-3" />
          <span>{precipitation}%</span>
        </div>
      )}
    </motion.div>
  );
};

export default ForecastDayCard;