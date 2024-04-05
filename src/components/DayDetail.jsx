import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavigationBar from "./NavigationBar";

const DayDetail = () => {
  const API_KEY = import.meta.env.VITE_API_ACCESS_KEY;
  const { datetime } = useParams();
  const [fullDetails, setFullDetails] = useState(null);
  useEffect(() => {
    const getWeatherDetail = async () => {
      const details = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=hochimin&country=VN&key=${API_KEY}`);
  
      const detailsJson = await details.json();
      const dayDetails = detailsJson.data.find(day => day.datetime === datetime);
      setFullDetails(dayDetails);
    };
    
    getWeatherDetail().catch(console.error);
  }, [datetime]);

  return (
    <div>
      <NavigationBar />
      {fullDetails && (
        <div key={datetime}>
          <h2>{fullDetails.datetime}</h2>
          <p>Weather: {fullDetails.weather.description}</p>
          <p>Average Temperature: {fullDetails.temp}°C</p>
          <p>Humidity: {fullDetails.rh}%</p>
          <p>Cloud Coverage: {fullDetails.clouds}%</p>
          <p>Wind Direction: {fullDetails.wind_cdir_full}</p>
          <p>Wind Speed: {fullDetails.wind_spd}</p>
        </div>
      )}
    </div>        
  );
};

export default DayDetail;