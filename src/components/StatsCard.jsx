import './StatsCard.css'

const StatsCard = ({list}) => {
    const highestTemp = () => {
        if (!list || !list.data) return null;
    
        const highest = list.data.reduce((max, current) => {
          return current.high_temp > max ? current.high_temp : max;
        }, -Infinity);
    
        return highest;
    };

    const lowestTemp = () => {
        if (!list || !list.data) return null;

        const lowest = list.data.reduce((min, current) => {
            return current.low_temp < min ? current.low_temp : min;
        }, Infinity);

        return lowest;
    }

    const averageTemp = () => {
        if (!list || !list.data) return null;

        const totalTemps = list.data.reduce((sum, current) => {
            return sum + current.temp; // Assuming temp is the temperature you want to average
        }, 0);
    
        const average = totalTemps / list.data.length;
    
        return average.toFixed(2);
    }

    return (
        <div className="card-container">
            <div className="card">
                <h5>Location</h5>
                <h5>Ho Chi Minh city</h5>
            </div>
            <div className="card">
                <h5>Highest Temp</h5>
                <h5>{highestTemp()}°C</h5>
            </div>
            <div className="card">
                <h5>Lowest Temp</h5>
                <h5>{lowestTemp()}°C</h5>
            </div>
            <div className="card">
                <h5>Average Temp</h5>
                <h5>{averageTemp()}°C</h5>
            </div>
        </div>
    )
}

export default StatsCard;