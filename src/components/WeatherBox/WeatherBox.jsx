import { useEffect, useState } from 'react';
import './WeatherBox.css';

const WeatherBox = () => {

    const [location, setLocation] = useState(null);
    const [weatherConditions, setWeatherConditions] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiUrl = process.env.REACT_APP_API_URL;
    const apiKey = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocation(`${latitude},${longitude}`)
                    },

                    (error) => {
                        setError('Nie udało się pobrać lokalizacji')
                        console.error(error);
                    }
                );
            } else {
                setError('Twoja przeglądarka nie obsługuje geolokalizacji')
                console.error("Your browser don't show location");
            }
        }
        getLocation();
    },[])


    useEffect(() => {
        if (!location) return;

        const getCurrentWeather = async () => {
            setLoading(true);
            setError(null);
            try {
                const resp = await fetch(`${apiUrl}/current.json?key=${apiKey}&q=${location}&aqi=no`);
                const data = await resp.json();
                setWeatherConditions(data);
            } catch (error) {
                setError(error.message);
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        }

        getCurrentWeather();

    }, [location, apiKey, apiUrl])

    console.log(weatherConditions);

    return (
        <div className='weather-box'>

            {loading && <h3>Ładowanie danych o pogodzie...</h3>}
            {error && <h3>{error}</h3>}

            <div className='top'>
                <img src={`${weatherConditions?.current.condition.icon}`} alt='' />
                <h2>{weatherConditions?.location.name}</h2>
            </div>
            <div className='details'>
                <span className='temp'>Temperatura: {weatherConditions?.current.temp_c}&deg;C</span>
                <span className='press'>Ciśnienie: {weatherConditions?.current.pressure_mb} hPa</span>
                <span className='wind'>Wiatr: {weatherConditions?.current.wind_kph} km/h</span>
            </div>
        </div>
    )
}

export default WeatherBox;