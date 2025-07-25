import React, { useContext, useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { Search } from "lucide-react";

import { WeatherDataContext } from "../../context/WeatherDataProvider";
import useDebounce from "../../hooks/useDebounce";

import CitySuggestions from "./CitySuggestions";

import styles from "./styles.module.css";

const CityFinder = ({ onSearch }) => {
  const { setWeatherData, setSearchedCity, city } =
    useContext(WeatherDataContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();

  const debouncedCity = useDebounce(searchTerm, DEBOUNCE_DELAY);

  const handleInputChange = (event) => {
    setIsLoading(true);
    setIsOpen(true);
    setSearchTerm(event.target.value);
  };

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `${WEATHER_API}?q=${searchTerm}&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();

      setWeatherData(data);
      setSearchedCity(searchTerm);
      onSearch(searchTerm, data);
      return data;
    } catch (error) {
      toast(error.message, {
        className: styles.error,
        hideProgressBar: true,
      });
    }
  };

  const handleSelectSuggestion = (selectedCity) => {
    setIsOpen(false);
    setSearchTerm(selectedCity);
    inputRef.current.focus();
  };

  useEffect(() => {
    fetch(
      `https://api.thecompaniesapi.com/v2/locations/cities?search=${debouncedCity}`
    )
      .then((res) => res.json())
      .then((res) => {
        setCityOptions(res.cities);
      })
      .catch((e) => {
        toast(e.message, {
          className: styles.error,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [debouncedCity]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.cityFinder}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search city"
            value={searchTerm}
            onChange={handleInputChange}
            className={styles.citySearchInput}
          />
          <button
            disabled={!searchTerm}
            onClick={fetchWeatherData}
            className={styles.search}
          >
            <Search width={20} height={20} />
          </button>
        </div>

        <CitySuggestions
          open={isOpen}
          suggestions={cityOptions}
          isLoading={isLoading}
          onSelect={handleSelectSuggestion}
          onHide={() => setIsOpen(false)}
        />
      </div>
      <h3 className={styles.cityName}>{city}</h3>
    </>
  );
};

const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather";

const API_KEY = "4304f69aeaddb3c9f979ccf8f2dbc432";

const DEBOUNCE_DELAY = 1000;

export default CityFinder;
