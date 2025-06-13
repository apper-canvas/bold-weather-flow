import currentWeatherData from '../mockData/currentWeather.json';
import forecastData from '../mockData/forecast.json';
import locationsData from '../mockData/locations.json';
import preferencesData from '../mockData/userPreferences.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class WeatherService {
  constructor() {
    this.currentWeatherData = [...currentWeatherData];
    this.forecastData = [...forecastData];
    this.locationsData = [...locationsData];
    this.preferencesData = { ...preferencesData };
  }

  async getCurrentWeather(location, units = 'metric') {
    await delay(300);
    
    // Simulate API call - find weather for location
    let weather = this.currentWeatherData.find(w => 
      w.location.toLowerCase().includes(location.toLowerCase())
    );
    
    if (!weather) {
      // Default to first weather data if location not found
      weather = this.currentWeatherData[0];
      weather = { ...weather, location: location };
    }
    
    // Convert units if needed
    if (units === 'imperial') {
      return {
        ...weather,
        temp: Math.round(weather.temp * 9/5 + 32),
        feelsLike: Math.round(weather.feelsLike * 9/5 + 32),
        windSpeed: Math.round(weather.windSpeed * 0.621371)
      };
    }
    
    return { ...weather };
  }

  async getCurrentWeatherByCoords(lat, lon, units = 'metric') {
    await delay(400);
    
    // Simulate reverse geocoding and weather fetch
    const weather = {
      ...this.currentWeatherData[0],
      location: 'Current Location'
    };
    
    // Convert units if needed
    if (units === 'imperial') {
      return {
        ...weather,
        temp: Math.round(weather.temp * 9/5 + 32),
        feelsLike: Math.round(weather.feelsLike * 9/5 + 32),
        windSpeed: Math.round(weather.windSpeed * 0.621371)
      };
    }
    
    return { ...weather };
  }

  async getForecast(location, units = 'metric') {
    await delay(350);
    
    let forecast = [...this.forecastData];
    
    // Convert units if needed
    if (units === 'imperial') {
      forecast = forecast.map(day => ({
        ...day,
        high: Math.round(day.high * 9/5 + 32),
        low: Math.round(day.low * 9/5 + 32)
      }));
    }
    
    return forecast;
  }

  async getForecastByCoords(lat, lon, units = 'metric') {
    await delay(350);
    
    let forecast = [...this.forecastData];
    
    // Convert units if needed
    if (units === 'imperial') {
      forecast = forecast.map(day => ({
        ...day,
        high: Math.round(day.high * 9/5 + 32),
        low: Math.round(day.low * 9/5 + 32)
      }));
    }
    
    return forecast;
  }

  async searchLocations(query) {
    await delay(200);
    
    if (query.length < 3) {
      return [];
    }
    
    const filtered = this.locationsData.filter(location =>
      location.toLowerCase().includes(query.toLowerCase())
    );
    
    return filtered.slice(0, 5);
  }

  async getUserPreferences() {
    await delay(100);
    
    // Check localStorage first
    const stored = localStorage.getItem('weatherPreferences');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing stored preferences:', e);
      }
    }
    
    return { ...this.preferencesData };
  }

  async updateUserPreferences(updates) {
    await delay(150);
    
    const current = await this.getUserPreferences();
    const updated = { ...current, ...updates };
    
    // Save to localStorage
    localStorage.setItem('weatherPreferences', JSON.stringify(updated));
    
    this.preferencesData = { ...updated };
    return { ...updated };
  }
}

export default new WeatherService();