import React, { createContext, useState } from "react";

const WeatherDataContext = createContext({
  setWeatherData: () => {
    //
  },
  setSearchedCity: () => {
    //
  },
  weatherData: null,
  city: null,
});

const WeatherDataProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setSearchedCity] = useState(null);

  return (
    <WeatherDataContext.Provider
      value={{ weatherData, setWeatherData, city, setSearchedCity }}
    >
      {children}
    </WeatherDataContext.Provider>
  );
};

export { WeatherDataProvider, WeatherDataContext };
