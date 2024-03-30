import './WeatherList.css';

const WeatherList = ({list}) => {
  if (!list || !list.data) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Lowest Temperature</th>
            <th>Highest Temperature</th>
            <th>Average Temperature</th>
            <th>Weather</th>
          </tr>
        </thead>

        <tbody>
          {list.data.map((weatherData, index) => (
            <tr key={index}>
              <td>{weatherData.datetime}</td>
              <td>{weatherData.low_temp}°C</td>
              <td>{weatherData.high_temp}°C</td>
              <td>{weatherData.temp}°C</td>
              <td>{weatherData.weather.description}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}

export default WeatherList;