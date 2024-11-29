import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      alert("City not found. Please enter a valid city.");
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Weather Tracker</h1>
        <p className="app-subtitle">Get real-time weather updates worldwide</p>
      </header>

      <div className="search-section">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="search-input"
        />
        <button onClick={fetchWeather} className="search-button">
          Search
        </button>
      </div>

      {weather && (
        <div className="weather-card">
          <h2 className="weather-city">{weather.name}</h2>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt="Weather icon"
            className="weather-icon"
          />
          <p className="weather-description">
            {weather.weather[0].description.toUpperCase()}
          </p>
          <div className="weather-details">
            <p>🌡️ Temperature: {weather.main.temp}°C</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>🌬️ Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
