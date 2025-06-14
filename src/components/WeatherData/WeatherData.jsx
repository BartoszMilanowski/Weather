import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setError,
    setCityName,
    setLastUpdate
} from '../../store/weatherSlice';
import WeatherBox from '../WeatherBox/WeatherBox';
import fetchCurrentWeather from "../../api/weather";
import './WeatherData.scss';
import Spinner from '../common/Spinner/Spinner';


const WeatherData = ({ location }) => {

    const [weatherConditions, setWeatherConditions] = useState(null);
    const [currentConditions, setCurrentConditions] = useState(null);
    const [secondDayForecast, setSecondDayForecast] = useState(null);
    const [thirdDayForecast, setThirdDayForecast] = useState(null);
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.weather);

    useEffect(() => {

        if (!location) return;

        const controller = new AbortController();

        const fetchData = async () => {
            try {
                setLoading(true);
                const resp = await fetchCurrentWeather({ location, signal: controller.signal });

                setWeatherConditions(resp);
                setCurrentConditions(resp.current);
                setSecondDayForecast(resp.forecast?.forecastday[1]);
                setThirdDayForecast(resp.forecast?.forecastday[2]);

                dispatch(setCityName(resp.location.name));
                dispatch(setLastUpdate(resp.current.last_updated));
            } catch (error) {
                if (error.name !== 'AbortError') {
                    dispatch(setError(error.message));
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            controller.abort()
        }

    }, [location, dispatch])

    const todayDate = new Date().toLocaleDateString('pl-Pl');
    let tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    tomorrowDate = tomorrowDate.toLocaleDateString('pl-Pl');
    let dayAfterDate = new Date();
    dayAfterDate.setDate(dayAfterDate.getDate() + 2);
    dayAfterDate = dayAfterDate.toLocaleDateString('pl-Pl');

    return (
        <>
        {loading && <Spinner />}
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