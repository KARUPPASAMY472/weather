import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "92d899358e674a939a5fd8e611fe0391";

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError("City not found. Please try again.");
      setWeather(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-200 to-slate-400 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Weather App</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter city name"
          className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white text-black"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && fetchWeather()}
        />
        <button
          className="bg-white text-blue-600 font-bold px-4 py-2 rounded-md hover:bg-gray-200 transition"
          onClick={fetchWeather}
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-600 mb-4 font-semibold">{error}</p>}

      {weather && (
        <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-2xl shadow-lg p-6 w-full max-w-md text-center">
          <h2 className="text-3xl font-bold mb-2">{weather.name}, {weather.sys.country}</h2>
          
          {/* Weather Icon */}
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt={weather.weather[0].description}
            className="mx-auto"
          />
          <p className="text-xl font-semibold">{weather.weather[0].main}</p>
          <p className="text-lg">Temperature: {weather.main.temp}°C</p>
          <p className="text-lg">Humidity: {weather.main.humidity}%</p>
          <p className="text-lg">Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
