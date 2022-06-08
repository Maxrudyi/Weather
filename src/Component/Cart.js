import React from "react";
import "./Cart.scss";
import { useState, useEffect } from "react";
import Sunny from "./Images/Sun.svg";
import Rainy from "./Images/Rainy.svg";
import Snowy from "./Images/Snowy.svg";
import Clouds from "./Images/Clouds.svg";

function Cart(props) {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [temp, setTemp] = useState("");
  const [search, setSearch] = useState("");

  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${props.coords.lat}&lon=${props.coords.lon}&appid=e88ef32e1821665e92806fa51852d3ed&units=metric`
      );
      const data = await response.json();
      console.log(data);
      setCountry(data.sys.country);
      setCity(data.name);
      setHumidity(data.main.humidity);
      setWindSpeed(data.wind.speed);
      setTemp(Math.round(data.main.temp));
      setWeather(data.weather[0]["main"]);
    }
    fetchMyAPI();
  });

  let onSearchSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=e88ef32e1821665e92806fa51852d3ed&units=metric`
    );
    const data = await response.json();
    setCountry(data.sys.country);
    setCity(data.name);
    setHumidity(data.main.humidity);
    setWindSpeed(data.wind.speed);
    setTemp(Math.round(data.main.temp));
    setWeather(data.weather[0]["main"]);
    setSearch("");
  };


  let img = "";
  let weatherForBackground = '';
  if (weather === "Clouds") {
    img = Clouds;
    weatherForBackground = 'sunny'
  } 
  if (weather === "Sunny" || "Clear") {
    img = Sunny;
    weatherForBackground = 'sunny'
  } 
  if (weather === "Snow") {
    img = Snowy;
    weatherForBackground = 'snowy'
  } 
  if (weather === "Rain") {
    img = Rainy;
    weatherForBackground = 'rainy'
  }

  return (
    <>
      <div className="container">
        <div className={`cart ${weatherForBackground}` }>
          <div className="cart__weather">
            <div className="inputBlock">
              <form onSubmit={onSearchSubmit}>
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </form>
            </div>
            <p className="place">
              {regionNames.of(country)}, {city}
            </p>
            <p className="temperature">{temp} °C</p>
            <div className="weather">
              <p className="weather-text">{weather}</p>
              <img className="weather-img" src={img} alt="img" />
            </div>
            <p className="humidity">Humidity: {humidity} %</p>
            <p className="windSpeed">Wind Speed: {windSpeed} km/h</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
