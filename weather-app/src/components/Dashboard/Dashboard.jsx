import React, { useState } from "react";
import CityFinder from "../CityFinder/CityFinder";
import WeatherCondition from "../WeatherCondition/WeatherCondition";
import OutfitRecommender from "../OutfitRecommender/OutfitRecommender";
import History from "../History/History";
import { WeatherDataProvider } from "../../context/WeatherDataProvider";

import style from "./styles.module.css";

const Dashboard = () => {
  const [lastUpdatedLS, setLastUpdatedLS] = useState();

  const handleSearch = (city) => {
    const prevCities = JSON.parse(localStorage.getItem(cityStorageKey)) || [];
    const updatedCities = [
      city.toLowerCase(),
      ...prevCities.filter((c) => c !== city),
    ];
    if (updatedCities.length > maxHistoryLength) {
      updatedCities.pop();
    }
    localStorage.setItem(cityStorageKey, JSON.stringify(updatedCities));
    setLastUpdatedLS(new Date().getTime());
  };

  return (
    <WeatherDataProvider>
      <div className={style.dashboard}>
        <div className="city-search">
          <h2>Search City</h2>
          <CityFinder onSearch={handleSearch} />
        </div>
        <div className="dashboard-content">
          <div className="weather-summary">
            <WeatherCondition />
          </div>
        </div>
        <OutfitRecommender />

        <History key={lastUpdatedLS} />
      </div>
    </WeatherDataProvider>
  );
};

const cityStorageKey = "CITIES";
const maxHistoryLength = 5;

export default Dashboard;
