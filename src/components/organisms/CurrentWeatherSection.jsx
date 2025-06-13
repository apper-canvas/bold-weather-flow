import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import WeatherInfoCard from '@/components/molecules/WeatherInfoCard';
import { format } from 'date-fns';

const CurrentWeatherSection = ({ 
  currentWeather, 
  units, 
  getWeatherIcon, 
  getTemperatureColor, 
  formatTemperature,
  weatherTheme
}) => {
  if (!currentWeather) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-8"
    >
      <div className="text-center">
        {/* Location and Time */}
        <h2 className="text-2xl font-bold text-white mb-2">
          {currentWeather.location}
        </h2>
        <p className="text-white/80 mb-6">
          {format(new Date(), 'EEEE, MMMM d, yyyy')}
        </p>

        {/* Weather Icon and Temperature */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <motion.div
            animate={{ rotate: weatherTheme === 'sunny' ? 360 : 0 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="weather-icon"
          >
            <ApperIcon 
              name={getWeatherIcon(currentWeather.condition)} 
              className="w-24 h-24 text-white drop-shadow-lg" 
            />
          </motion.div>
          
          <div>
            <div className={`text-6xl md:text-7xl font-bold text-white drop-shadow-lg ${getTemperatureColor(currentWeather.temp)}`}>
              {formatTemperature(currentWeather.temp)}°
            </div>
            <div className="text-white/80 text-lg">
              Feels like {formatTemperature(currentWeather.feelsLike)}°
            </div>
          </div>
        </div>

        {/* Weather Description */}
        <p className="text-xl text-white/90 mb-8 capitalize">
          {currentWeather.description}
        </p>

        {/* Weather Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <WeatherInfoCard 
            iconName="Droplets" 
            label="Humidity" 
            value={currentWeather.humidity} 
            unit="%" 
          />
          <WeatherInfoCard 
            iconName="Wind" 
            label="Wind Speed" 
            value={currentWeather.windSpeed} 
            unit={units === 'metric' ? 'km/h' : 'mph'} 
          />
          <WeatherInfoCard 
            iconName="Eye" 
            label="Visibility" 
            value={currentWeather.visibility || 'N/A'} 
            unit={currentWeather.visibility ? (units === 'metric' ? 'km' : 'mi') : ''} 
          />
          <WeatherInfoCard 
            iconName="Gauge" 
            label="Pressure" 
            value={currentWeather.pressure || 'N/A'} 
            unit={currentWeather.pressure ? 'hPa' : ''} 
          />
        </div>
      </div>
    </motion.div>
  );
};

export default CurrentWeatherSection;