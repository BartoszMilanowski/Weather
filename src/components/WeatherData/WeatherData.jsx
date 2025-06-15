
import { useSelector } from 'react-redux';
import WeatherBox from '../WeatherBox/WeatherBox';
import './WeatherData.scss';
import { useEffect, useState } from 'react';


const WeatherData = () => {

    const [currentConditions, setCurrentConditions] = useState(null);
    const [secondDayForecast, setSecondDayForecast] = useState(null);
    const [thirdDayForecast, setThirdDayForecast] = useState(null);

    const { weatherConditions } = useSelector((state) => state.weather);

    console.log('weatherCondition', weatherConditions);

    useEffect(() => {
        setCurrentConditions(weatherConditions?.current);
        setSecondDayForecast(weatherConditions?.forecast?.forecastday[1]);
        setThirdDayForecast(weatherConditions?.forecast?.forecastday[2]);
    },[weatherConditions])


    console.log('current', currentConditions)

    const todayDate = new Date().toLocaleDateString('pl-Pl');
    let tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    tomorrowDate = tomorrowDate.toLocaleDateString('pl-Pl');
    let dayAfterDate = new Date();
    dayAfterDate.setDate(dayAfterDate.getDate() + 2);
    dayAfterDate = dayAfterDate.toLocaleDateString('pl-Pl');

    return (
        <>
            <div className="day-data">
                <h4>Teraz ({todayDate})</h4>
                <WeatherBox weatherConditions={currentConditions} current={true} />
            </div>
            <div className="day-data">
                <h4>Jutro ({tomorrowDate})</h4>
                <WeatherBox weatherConditions={secondDayForecast} current={false} />
            </div>
            <div className="day-data">
                <h4>Pojutrze ({dayAfterDate})</h4>
                <WeatherBox weatherConditions={thirdDayForecast} current={false} />
            </div>

        </>
    )
}



export default WeatherData;