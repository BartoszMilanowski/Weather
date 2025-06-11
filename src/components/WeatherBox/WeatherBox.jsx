import './WeatherBox.scss';

const WeatherBox = ({ weatherConditions, location }) => {

    return (
        <div className='weather-box'>

            <div className='top'>
                <img src={`${weatherConditions?.current.condition.icon}`} alt={`${weatherConditions?.current.condition.text}`} />
                <h3 className='temp'>{weatherConditions?.current.temp_c}&deg;C</h3>
            </div>
            <div className='details'>
                <span className='press'>Ciśnienie: {weatherConditions?.current.pressure_mb} hPa</span>
                <span className='wind'>Wiatr: {weatherConditions?.current.wind_kph} km/h</span>
            </div>
        </div>
    )
}

export default WeatherBox;