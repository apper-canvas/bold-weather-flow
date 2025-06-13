import React from 'react';
import { motion } from 'framer-motion';
import ForecastDayCard from '@/components/molecules/ForecastDayCard';

const ForecastSection = ({ forecast, units, getWeatherIcon, formatTemperature }) => {
  if (!forecast || forecast.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="space-y-4"
    >
      <h3 className="text-2xl font-bold text-white text-center">
        5-Day Forecast
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <ForecastDayCard
            key={index}
            day={day.date}
            conditionIcon={getWeatherIcon(day.condition)}
            highTemp={day.high}
            lowTemp={day.low}
            precipitation={day.precipitation}
            units={units}
            formatTemperature={formatTemperature}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ForecastSection;