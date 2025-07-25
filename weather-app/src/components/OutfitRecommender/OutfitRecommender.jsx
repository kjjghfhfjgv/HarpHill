import React, { useContext } from "react";
import { WeatherDataContext } from "../../context/WeatherDataProvider";

const OutfitRecommender = () => {
  const { weatherData } = useContext(WeatherDataContext);

  return (
    <div>
      <h2>Outfit</h2>
      <p>{getRecommendation(weatherData)}</p>
    </div>
  );
};

const getRecommendation = (weather) => {
  if (!weather) return "No weather data available.";
  const temp = weather.main.feels_like - KELVIN;

  if (temp < 10) {
    return "Wear a warm jacket, scarf, and gloves.";
  } else if (temp >= 10 && temp < 20) {
    return "Wear a light jacket or sweater.";
  } else if (temp >= 20) {
    return "Wear light clothing.";
  } else {
    return "Dress comfortably for the current weather.";
  }
};
const KELVIN = 273;

export default OutfitRecommender;
