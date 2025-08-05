import React, { useEffect, useState } from "react";
import "./css/style.css";

const TempApp = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Mumbai");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_KEY = "859a0637a556499ba3373830250508"; //  WeatherAPI key

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError("");

        const query = `${search},India`; // ✅ more accurate
        const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}&aqi=no`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
          setCity(null);
          setError(data.error.message);
        } else {
          setCity(data);
        }
      } catch (err) {
        setError("Failed to fetch weather data.");
        setCity(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [search]);

  return (
    <>
      <br />
      <br />
      <br />
      <div className="box">
        <div className="inputData">
          <input
            type="search"
            value={search}
            className="inputField"
            placeholder="Enter City Name"
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : city ? (
          <div style={{padding: "10px"}}>
            <div className="info">
              <h2 className="location">
                <i className="fas fa-street-view"></i> {city.location.name},{" "}
                {city.location.region}
              </h2>
              <h1 className="temp">{city.current.temp_c}°C</h1>
              <h3 className="tempmin_max">
                Condition: {city.current.condition.text}
              </h3>
              <h4 style={{ marginTop: "10px" }}>
                Humidity: {city.current.humidity}% | Wind:{" "}
                {city.current.wind_kph} kph
              </h4>
            </div>

            <div className="wave1"></div>
            <div className="wave2"></div>
            <div className="wave3"></div>
          </div>
        ) : (
          <p>Data not found</p>
        )}
      </div>
    </>
  );
};

export default TempApp;
