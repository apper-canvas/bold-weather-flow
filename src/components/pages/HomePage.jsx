import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { weatherService } from '@/services';
import SearchAndControls from '@/components/organisms/SearchAndControls';
import CurrentWeatherSection from '@/components/organisms/CurrentWeatherSection';
import ForecastSection from '@/components/organisms/ForecastSection';
import LoadingSkeleton from '@/components/organisms/LoadingSkeleton';
import ErrorState from '@/components/organisms/ErrorState';

const HomePage = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [units, setUnits] = useState('metric');
  const [weatherTheme, setWeatherTheme] = useState('cloudy');

  // Helper functions
  const getWeatherTheme = (condition) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sun') || conditionLower.includes('clear')) {
      return 'sunny';
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return 'rainy';
    } else if (conditionLower.includes('snow') || conditionLower.includes('blizzard')) {
      return 'snowy';
    } else if (conditionLower.includes('storm') || conditionLower.includes('thunder')) {
      return 'stormy';
    } else {
      return 'cloudy';
    }
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

  // Load user preferences and default weather
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const preferences = await weatherService.getUserPreferences();
        setUnits(preferences.unit);
        
        const defaultLocation = preferences.lastLocation || 'New York';
        const weather = await weatherService.getCurrentWeather(defaultLocation, preferences.unit);
        const forecastData = await weatherService.getForecast(defaultLocation, preferences.unit);
        
        setCurrentWeather(weather);
        setForecast(forecastData);
        setWeatherTheme(getWeatherTheme(weather.condition));
        setSearchQuery(weather.location); // Set initial search query to loaded location
      } catch (err) {
        setError(err.message || 'Failed to load initial weather data');
        toast.error('Failed to load initial weather data');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleSearch = async (query) => {
    if (query.length < 3) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    try {
      const results = await weatherService.searchLocations(query);
      setSearchResults(results);
      setShowResults(true);
    } catch (err) {
      console.error('Search failed:', err);
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleLocationSelect = async (location) => {
    setLoading(true);
    setError(null);
    setShowResults(false);
    setSearchQuery(location);

    try {
      const weather = await weatherService.getCurrentWeather(location, units);
      const forecastData = await weatherService.getForecast(location, units);
      
      setCurrentWeather(weather);
      setForecast(forecastData);
      setWeatherTheme(getWeatherTheme(weather.condition));
      
      await weatherService.updateUserPreferences({ lastLocation: location });
      
      toast.success(`Weather updated for ${location}`);
    } catch (err) {
      setError(err.message || 'Failed to load weather for selected location');
      toast.error('Failed to load weather for selected location');
    } finally {
      setLoading(false);
    }
  };

  const handleGetCurrentLocation = async () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const weather = await weatherService.getCurrentWeatherByCoords(latitude, longitude, units);
          const forecastData = await weatherService.getForecastByCoords(latitude, longitude, units);
          
          setCurrentWeather(weather);
          setForecast(forecastData);
          setWeatherTheme(getWeatherTheme(weather.condition));
          setSearchQuery(weather.location);
          
          await weatherService.updateUserPreferences({ lastLocation: weather.location });
          
          toast.success('Weather updated for your location');
        } catch (err) {
          setError(err.message || 'Failed to get weather for your location');
          toast.error('Failed to get weather for your location');
        } finally {
          setLoading(false);
        }
      },
      (geoError) => {
        setLoading(false);
        setError(geoError.message || 'Unable to retrieve your location');
        toast.error('Unable to retrieve your location');
      }
    );
  };

  const handleUnitsToggle = async () => {
    const newUnits = units === 'metric' ? 'imperial' : 'metric';
    setUnits(newUnits);
    
    await weatherService.updateUserPreferences({ unit: newUnits });
    
    if (currentWeather) {
      try {
        setLoading(true);
        const weather = await weatherService.getCurrentWeather(currentWeather.location, newUnits);
        const forecastData = await weatherService.getForecast(currentWeather.location, newUnits);
        
        setCurrentWeather(weather);
        setForecast(forecastData);
      } catch (err) {
        toast.error('Failed to update units');
        setError(err.message || 'Failed to update units');
      } finally {
        setLoading(false);
      }
    }
  };

  const getBackgroundClass = () => {
    switch (weatherTheme) {
      case 'sunny':
        return 'weather-sunny';
      case 'rainy':
        return 'weather-rainy';
      case 'snowy':
        return 'weather-snowy';
      case 'stormy':
        return 'weather-stormy';
      default:
        return 'weather-cloudy';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen transition-all duration-500 ${getBackgroundClass()}`}
    >
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Weather Flow
          </h1>
          <p className="text-white/80 text-lg">
            Your beautiful weather companion
          </p>
        </motion.div>

        {loading ? (
          <LoadingSkeleton />
        ) : error && !currentWeather ? (
          <ErrorState error={error} onTryAgain={() => window.location.reload()} />
        ) : (
          <div className="space-y-6">
            <SearchAndControls
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchResults={searchResults}
              showResults={showResults}
              onSearch={handleSearch}
              onLocationSelect={handleLocationSelect}
              onGetCurrentLocation={handleGetCurrentLocation}
              units={units}
              onUnitsToggle={handleUnitsToggle}
            />

            <CurrentWeatherSection
              currentWeather={currentWeather}
              units={units}
              getWeatherIcon={getWeatherIcon}
              getTemperatureColor={getTemperatureColor}
              formatTemperature={formatTemperature}
              weatherTheme={weatherTheme}
            />

            <ForecastSection
              forecast={forecast}
              units={units}
              getWeatherIcon={getWeatherIcon}
              formatTemperature={formatTemperature}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default HomePage;