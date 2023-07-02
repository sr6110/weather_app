import React, { useEffect, useState } from "react";
import "./Forecast.css";
import { fetchData } from "../utils/api";
import Card from "./Card";

function Forecast({ latitude, longitude }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchWeatherAPI = async () => {
      if (latitude && longitude) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
        const result = await fetchData(apiUrl);
        if (result) {
          setData(result);
        }
      }
    };

    fetchWeatherAPI();
  }, [latitude, longitude]);

  return (
    <div className="forecast">
      <h2>Forecast History</h2>
      <div className="forecast-cards" data-testid="card-component">
        {data.list &&
          data.list.map((weatherObject, i) => (
            <Card key={weatherObject.dt + i} data={weatherObject} />
          ))}
      </div>
    </div>
  );
}

export default Forecast;
