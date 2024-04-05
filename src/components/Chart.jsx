import React, { Component, useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Label, Legend, ResponsiveContainer } from 'recharts';
import "./Chart.css"
import NavigationBar from "./NavigationBar";

const Chart = () => {
    const API_KEY = import.meta.env.VITE_API_ACCESS_KEY;
    const [data, setData] = useState([]);
    const [dataType, setDataType] = useState("temp")
    useEffect(() => {
        const fetchWeatherData = async () => {
            const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=hochimin&country=VN&key=${API_KEY}`);
            const json = await response.json();
            setData(json.data);
        }
        fetchWeatherData().catch(console.error);
    }, []);

    const cleanData = (data) => {
        if (data) {
            return data.map(item => ({
                datetime: item.datetime,
                [dataType]: item[dataType],
            }));
        } else {
            return [];
        }
    };

    const handleDataTypeChange = (event) => {
        setDataType(event.target.value);
    };
    
    const getYAxisLabel = (dataType) => {
        switch (dataType) {
            case "temp":
                return "Temperature (°C)";
            case "rh":
                return "Humidity (%)";
            case "clouds":
                return "Cloud Coverage (%)";
            case "wind_spd":
                return "Wind Speed (m/s)";
            default:
                return "Unknown";
        }
    };

    return (
        <div>
            <NavigationBar />
            <h3>
                Chart of {getYAxisLabel(dataType)}
            </h3>
            <div>
                <input
                    type="radio"
                    id="temp"
                    value="temp"
                    checked={dataType === "temp"}
                    onChange={handleDataTypeChange}
                />
                <label>Temperature</label>
                <input
                    type="radio"
                    id="rh"
                    value="rh"
                    checked={dataType === "rh"}
                    onChange={handleDataTypeChange}
                />
                <label>Humidity</label>
                <input
                    type="radio"
                    id="clouds"
                    value="clouds"
                    checked={dataType === "clouds"}
                    onChange={handleDataTypeChange}
                />
                <label>Cloud Coverage</label>
                <input
                    type="radio"
                    id="wind_spd"
                    value="wind_spd"
                    checked={dataType === "wind_spd"}
                    onChange={handleDataTypeChange}
                />
                <label>Wind Speed</label>
            </div>

            <div>
                <LineChart
                    width={700}
                    height={300}
                    data={cleanData(data)}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 20,
                        bottom: 50,
                    }}
                >
                    <Line
                        type="monotone"
                        dataKey={dataType}
                        stroke="#8884d8"
                        activeDot={{ r: 5 }}
                    />
                    <CartesianGrid strokeDasharray="5 5" />
                    <XAxis dataKey="datetime" interval={1} angle={20} dx={0} dy={20} label={{ value: "Date and Time", offset: -50, position: 'insideBottom', y: 10, fontSize: 15}} tick={{fontSize: 12}} />

                    <YAxis dataKey={dataType} domain={["auto", "auto"]} label={{ value: getYAxisLabel(dataType), angle: -90, position: "inside", fontSize: 15, dx: -30}} tick={{fontSize: 12}}/>
                    <Tooltip />
                </LineChart>
            </div>
        </div>
    )
}
export default Chart;