import React, { useEffect, useState } from "react";
import Forecast from "./Forecast";
import CurrentConditions from "./CurrentConditions";
import Map from "./Map";
import { fetchData } from "../utils/api";

function Home() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState("");
  const [currentData, setCurrentData] = useState({});

  const updateLocation = async (city) => {
    if (city.length === 0) return;
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.REACT_APP_API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        setLatitude(lat);
        setLongitude(lon);
      } else {
        console.log("Location not found");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          function (error) {
            console.error("Error getting geolocation:", error);
          }
        );
      } catch (error) {
        console.error("Error getting geolocation:", error);
      }
    };

    fetchWeatherData();
  }, []);

  // code to fetch and update the current data
  useEffect(() => {
    const fetchWeatherAPI = async () => {
      if (latitude && longitude) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
        const result = await fetchData(apiUrl);
        if (result) {
          setCurrentData(result);
        }
      }
    };

    fetchWeatherAPI();
  }, [latitude, longitude]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateLocation(city);
  };

  return (
    <div className="weather-forecast">
      <h1>Weather Forecast</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Find</button>
      </form>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          columnGap: "10px",
        }}
      >
        {currentData.id && (
          <>
            <CurrentConditions data={currentData} />
            <div style={{ flex: 1 }}>
              <Map
                latitude={latitude}
                longitude={longitude}
                temperature={currentData.main.temp}
                precipitation={
                  <>
                    <img
                      src={`https://openweathermap.org/img/wn/${currentData.weather[0].icon}.png`}
                      alt={currentData.weather[0].description}
                    />
                    <span>{currentData.wind.speed} m/s</span>
                  </>
                }
              />
            </div>
          </>
        )}
      </div>
      <Forecast latitude={latitude} longitude={longitude} />
    </div>
  );
}

export default Home;
