import React from "react";
import { WEEKDAYS } from "../utils/constants";
import "./Card.css";

function Card({ data }) {
  const date = new Date(data.dt * 1000);
  return (
    <div className="card" data-testid='card-component'>
      <div>
        <p>
          Day: <span>{data && WEEKDAYS[date.getDay()]}</span>
        </p>
        <p>
          Time:{" "}
          <span>
            {date.toLocaleTimeString("en-IN", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </span>
        </p>
        <p>
          Wind: <span className="wind">{data.wind.speed}</span> meter/sec
        </p>
        <p>
          Date:{" "}
          <span className="date">
            {date.toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </p>
      </div>
      <div>
        <p>
          Temperature:{" "}
          <span className="current-temperature">{data.main.temp}</span>
          &deg;C
        </p>
        <p>
          Feels Like: <span className="feels-like">{data.main.feels_like}</span>
          &deg;C
        </p>
        <p>
          Humidity: <span className="humidity">{data.main.humidity}</span>%
        </p>
        <p>
          Pressure: <span className="pressure">{data.main.pressure}</span> inHg
        </p>
      </div>
    </div>
  );
}

export default Card;
