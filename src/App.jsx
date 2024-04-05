import { useState , useEffect } from "react";
import "./App.css";
import WeatherList from "./components/WeatherList";
import StatsCard from "./components/StatsCard";
import NavigationBar from "./components/NavigationBar";

const App = () => {
  const API_KEY = import.meta.env.VITE_API_ACCESS_KEY;
  const [list, setList] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [avgTempRange, setAvgTempRange] = useState(0);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=hochimin&country=VN&key=${API_KEY}`);
      const json = await response.json();
      console.log(json);
      setList(json);
      setFilteredResults(json.data);
    }
    fetchWeatherData().catch(console.error);
  }, []);

  const searchItems = () => {
    if (searchInput !== "" || avgTempRange !== 0) {
      const filteredData = list.data.filter(item => {
        const matchesSearchInput = searchInput !== "" ? item.datetime.startsWith(searchInput) : true;
        const matchesTempRange = avgTempRange !== 0 ? item.temp > avgTempRange : true;
        return matchesSearchInput && matchesTempRange;
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(list.data);
    }
  };

  return (
    <div>
      <NavigationBar />
      {list && <StatsCard list={list} />}
      <input
        type="text"
        placeholder="Search Date"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
      />
      <label htmlFor="avgTempRange"> Average Temperature:</label>
      <input 
        type="range"
        value={avgTempRange}
        min={0}
        max={50} 
        onChange={(event) => setAvgTempRange(parseInt(event.target.value))}
      />
      <span>{avgTempRange}°C </span>
      <button onClick={searchItems}>Filter</button>
      {list && <WeatherList list={{ data: filteredResults }} />}
    </div>
  )
}

export default App;
