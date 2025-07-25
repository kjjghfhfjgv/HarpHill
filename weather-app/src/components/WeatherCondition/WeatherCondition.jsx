import React, { useContext } from "react";
import { WeatherDataContext } from "../../context/WeatherDataProvider";

const WeatherCondition = () => {
  const { weatherData } = useContext(WeatherDataContext);

  return (
    <div className="weather-condition">
      <h2>Weather Condition</h2>
      {weatherData ? (
        <>
          <p>
            <strong>Temperature:</strong>{" "}
            {Math.ceil(weatherData.main.temp - KELVIN)}°C
          </p>
          <p>
            <strong>Condition:</strong> {weatherData.weather[0]?.description}
          </p>
          <p>
            <strong>Wind Speed:</strong> {weatherData.wind.speed} km/h
          </p>
          <p>
            <strong>Humidity:</strong> {weatherData.main.humidity}%
          </p>
        </>
      ) : (
        "No data available"
      )}
    </div>
  );
};

const KELVIN = 273;

export default WeatherCondition;
