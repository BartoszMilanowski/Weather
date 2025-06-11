import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import WeatherBox from './components/WeatherBox/WeatherBox';
import Error from './components/common/Error';
import Spinner from './components/common/Spinner/Spinner';

function App() {
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
  }, [])

  useEffect(() => {
    if (!location) return;

    const getCurrentWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const resp = await fetch(`${apiUrl}/current.json?key=${apiKey}&q=${location}&aqi=no`);
        const data = await resp.json();
        await new Promise(resolve => setTimeout(resolve, 2000));

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

  return (
    <BrowserRouter>
      {loading && <Spinner />}
      {error && <Error message={error} />}
      {!loading && !error && (
        <Routes>
          <Route path='/' element={<Layout location={weatherConditions?.location.name} />}>
            <Route index element={<WeatherBox weatherConditions={weatherConditions} location={location} />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
