import { useEffect, useState } from "react";
import WeatherBox from '../WeatherBox/WeatherBox';
import fetchCurrentWeather from "../../api/weather";
import './WeatherData.scss'

const WeatherData = ({ location, setLoading, setError, setCityName }) => {

    const [weatherConditions, setWeatherConditions] = useState(null);
    const [currentConditions, setCurrentConditions] = useState(null);
    const [secondDayForecast, setSecondDayForecast] = useState(null);
    const [thirdDayForecast, setThirdDayForecast] = useState(null);

    useEffect(() => {

        if (!location) return;

        setLoading(true);
        setError(null);

        fetchCurrentWeather({ location })
            .then((resp) => {
                setWeatherConditions(resp)
                setCityName(resp.location.name)
            })
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));

    }, [location, setLoading, setError, setCityName])

    useEffect(() => {
        setCurrentConditions(weatherConditions?.current);
        setSecondDayForecast(weatherConditions?.forecast?.forecastday[1]);
        setThirdDayForecast(weatherConditions?.forecast?.forecastday[2]);
    }, [weatherConditions]);

    return (
        <>
            <div className="day-data">
                <h4>Teraz</h4>
                <WeatherBox weatherConditions={currentConditions} current={true}/>
            </div>
              <div className="day-data">
                <h4>Jutro</h4>
                <WeatherBox weatherConditions={secondDayForecast} current={false}/>
            </div>
              <div className="day-data">
                <h4>Pojutrze</h4>
                <WeatherBox weatherConditions={thirdDayForecast} current={false}/>
            </div>
        </>
    )
}


export default WeatherData;