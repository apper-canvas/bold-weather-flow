import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from './ApperIcon';
import { format } from 'date-fns';

const MainFeature = ({
  currentWeather,
  forecast,
  loading,
  error,
  searchQuery,
  setSearchQuery,
  searchResults,
  showResults,
  onSearch,
  onLocationSelect,
  onGetCurrentLocation,
  units,
  onUnitsToggle,
  weatherTheme
}) => {
  const [searchInputFocused, setSearchInputFocused] = useState(false);
  const searchRef = useRef(null);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchInputFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleLocationClick = (location) => {
    onLocationSelect(location);
    setSearchInputFocused(false);
  };

  const getWeatherIcon = (condition) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sun') || conditionLower.includes('clear')) {
      return 'Sun';
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return 'CloudRain';
    } else if (conditionLower.includes('snow') || conditionLower.includes('blizzard')) {
      return 'Snowflake';
    } else if (conditionLower.includes('storm') || conditionLower.includes('thunder')) {
      return 'Zap';
    } else if (conditionLower.includes('cloud')) {
      return 'Cloud';
    } else {
      return 'Cloud';
    }
  };

  const getTemperatureColor = (temp) => {
    if (temp < 0) return 'temp-cold';
    if (temp < 10) return 'temp-cool';
    if (temp < 20) return 'temp-mild';
    if (temp < 30) return 'temp-warm';
    return 'temp-hot';
  };

  const formatTemperature = (temp) => {
    return Math.round(temp);
  };

  const LoadingSkeleton = () => (
    <div className="space-y-6">
      {/* Search skeleton */}
      <div className="animate-pulse">
        <div className="h-14 bg-white/20 rounded-xl"></div>
      </div>
      
      {/* Current weather skeleton */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 animate-pulse"
      >
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-white/30 rounded-full mx-auto"></div>
          <div className="h-16 bg-white/30 rounded w-48 mx-auto"></div>
          <div className="h-6 bg-white/30 rounded w-32 mx-auto"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-white/30 rounded-lg"></div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Forecast skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/20 backdrop-blur-sm rounded-xl p-4 animate-pulse"
          >
            <div className="h-4 bg-white/30 rounded mb-3"></div>
            <div className="w-12 h-12 bg-white/30 rounded-full mx-auto mb-3"></div>
            <div className="h-6 bg-white/30 rounded mb-2"></div>
            <div className="h-4 bg-white/30 rounded"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const ErrorState = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 text-center"
    >
      <ApperIcon name="AlertCircle" className="w-16 h-16 text-red-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">Unable to Load Weather</h3>
      <p className="text-white/80 mb-6">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
      >
        Try Again
      </button>
    </motion.div>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error && !currentWeather) {
    return <ErrorState />;
  }

  return (
    <div className="space-y-6">
      {/* Search and Controls */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col md:flex-row gap-4 items-center justify-between"
      >
        {/* Search */}
        <div className="relative flex-1 max-w-md" ref={searchRef}>
          <div className="relative">
            <ApperIcon 
              name="Search" 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" 
            />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInput}
              onFocus={() => setSearchInputFocused(true)}
              placeholder="Search for a city..."
              className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
            />
          </div>
          
          {/* Search Results */}
          <AnimatePresence>
            {showResults && searchResults.length > 0 && searchInputFocused && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 search-dropdown bg-white/95 backdrop-blur-sm z-50"
              >
                {searchResults.map((result, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleLocationClick(result)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-b-0"
                  >
                    <ApperIcon name="MapPin" className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-800">{result}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Geolocation Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGetCurrentLocation}
            className="p-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white hover:bg-white/30 transition-all"
            title="Use current location"
          >
            <ApperIcon name="MapPin" className="w-5 h-5" />
          </motion.button>

          {/* Units Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onUnitsToggle}
            className="px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white hover:bg-white/30 transition-all font-medium"
          >
            °{units === 'metric' ? 'C' : 'F'}
          </motion.button>
        </div>
      </motion.div>

      {/* Current Weather */}
      {currentWeather && (
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              >
                <ApperIcon name="Droplets" className="w-6 h-6 text-white/80 mx-auto mb-2" />
                <div className="text-sm text-white/80">Humidity</div>
                <div className="text-lg font-semibold text-white">{currentWeather.humidity}%</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              >
                <ApperIcon name="Wind" className="w-6 h-6 text-white/80 mx-auto mb-2" />
                <div className="text-sm text-white/80">Wind Speed</div>
                <div className="text-lg font-semibold text-white">
                  {currentWeather.windSpeed} {units === 'metric' ? 'km/h' : 'mph'}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              >
                <ApperIcon name="Eye" className="w-6 h-6 text-white/80 mx-auto mb-2" />
                <div className="text-sm text-white/80">Visibility</div>
                <div className="text-lg font-semibold text-white">
                  {currentWeather.visibility || 'N/A'} {units === 'metric' ? 'km' : 'mi'}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              >
                <ApperIcon name="Gauge" className="w-6 h-6 text-white/80 mx-auto mb-2" />
                <div className="text-sm text-white/80">Pressure</div>
                <div className="text-lg font-semibold text-white">
                  {currentWeather.pressure || 'N/A'} hPa
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 5-Day Forecast */}
      {forecast.length > 0 && (
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-4 text-center hover:bg-white/30 transition-all cursor-pointer"
              >
                <div className="text-white/80 font-medium mb-2">
                  {format(new Date(day.date), 'EEE')}
                </div>
                
                <div className="weather-icon mb-3">
                  <ApperIcon 
                    name={getWeatherIcon(day.condition)} 
                    className="w-12 h-12 text-white mx-auto drop-shadow-md" 
                  />
                </div>
                
                <div className="space-y-1">
                  <div className="text-white font-semibold text-lg">
                    {formatTemperature(day.high)}°
                  </div>
                  <div className="text-white/70 text-sm">
                    {formatTemperature(day.low)}°
                  </div>
                </div>
                
                {day.precipitation > 0 && (
                  <div className="flex items-center justify-center gap-1 mt-2 text-white/60 text-xs">
                    <ApperIcon name="Droplets" className="w-3 h-3" />
                    <span>{day.precipitation}%</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MainFeature;