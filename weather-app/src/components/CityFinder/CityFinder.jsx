import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Search } from "lucide-react";

import { WeatherDataContext } from "../../context/WeatherDataProvider";
import useDebounce from "../../hooks/useDebounce";
import useQuery from "../../hooks/useQuery";

import CitySuggestions from "./CitySuggestions";

import styles from "./styles.module.css";

const CityFinder = ({ onSearch }) => {
  const { setWeatherData, setSearchedCity, city } =
    useContext(WeatherDataContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const successWeatherData = (result) => {
    setWeatherData(result);
    setSearchedCity(searchTerm);
    onSearch(searchTerm, result);
  };

  const failureWeatherData = (error) => {
    toast(error.message, {
      className: styles.error,
      hideProgressBar: true,
    });
  };

  const failureCityData = (error) => {
    toast(error.message, {
      className: styles.error,
      hideProgressBar: true,
    });
  };

  const successCityData = (result) => {
    console.log({ result });
    setCityOptions(result.cities);
  };

  const { executeQuery: fetchWeatherData } = useQuery(
    `${WEATHER_API}?q=${searchTerm}&appid=${API_KEY}`,
    {
      successCallback: successWeatherData,
      failureCallback: failureWeatherData,
    }
  );
  const debouncedCity = useDebounce(searchTerm, DEBOUNCE_DELAY);

  const { executeQuery: fetchCityData, loading } = useQuery(
    `${CITY_API}?search=${debouncedCity}`,
    {
      successCallback: successCityData,
      failureCallback: failureCityData,
    }
  );

  const handleInputChange = (event) => {
    setIsOpen(true);
    setSearchTerm(event.target.value);
  };

  const handleSelectSuggestion = (selectedCity) => {
    setIsOpen(false);
    setSearchTerm(selectedCity);
  };

  useEffect(() => {
    fetchCityData(debouncedCity);
  }, [debouncedCity]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.cityFinder}>
          <input
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
          isLoading={loading}
          onSelect={handleSelectSuggestion}
          onHide={() => setIsOpen(false)}
        />
      </div>
      <h3 className={styles.cityName}>Location: {city || "--------"}</h3>
    </>
  );
};

const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather";
const CITY_API = "https://api.thecompaniesapi.com/v2/locations/cities";

const API_KEY = "4304f69aeaddb3c9f979ccf8f2dbc432";

const DEBOUNCE_DELAY = 1000;

export default CityFinder;
