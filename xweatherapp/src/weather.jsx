import React, { useState } from 'react';
import axios from 'axios';
import './weather.css';

function XWeather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = '32372f7f65d34ed0b05165415253005'; 

  const handleSearch = async () => {
    if (!city) return;
    setLoading(true);
    setWeather(null);

    try {
      const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
        params: {
          key: API_KEY,
          q: city,
        },
      });
      console.log(response)
      setWeather(response.data);
    } catch (error) {
      alert('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="xweather-container">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading data…</p>}

      {weather && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weather.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weather.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weather.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weather.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default XWeather;
