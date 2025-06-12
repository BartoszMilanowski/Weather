import './WeatherBox.scss';

const WeatherBox = ({ weatherConditions, current }) => {

    const icon = {
        src: current ? weatherConditions?.condition.icon : weatherConditions?.day?.condition.icon,
        alt: current ? weatherConditions?.condition.text : weatherConditions?.day?.condition.text
    }
    const temp = current ? weatherConditions?.temp_c : weatherConditions?.day?.avgtemp_c;
    const wind = current ? weatherConditions?.wind_kph : weatherConditions?.day?.maxwind_kph;

    return (
        <div className='weather-box'>
            <div className='top'>
                <img src={icon.src} alt= {icon.alt}/>
                <h3 className='temp'>{current ? '' : 'średnio '}{temp}&deg;C</h3>
            </div>
            <div className='details'>
                {current ? (<span className='press'>Ciśnienie: {weatherConditions?.pressure_mb} hPa</span>) : <span></span>}
                <span className='wind'>Wiatr{current ? '' : ' maksymalny'}: {wind} km/h</span>
                <span><a href={`/forecast/hourly`}>Prognoza godzinowa</a></span>
            </div>
        </div>
    )
}

export default WeatherBox;