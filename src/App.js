import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Error from './components/common/Error';
import Spinner from './components/common/Spinner/Spinner';
import WeatherData from './components/WeatherData/WeatherData';

function App() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [shownLocation, setShownLocation] = useState(null);
  const [cityName, setCityName] = useState(null);

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
            setCurrentLocation(`${latitude},${longitude}`)
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
  }, []);

  useEffect(() => {
    setShownLocation(currentLocation);
  }, [currentLocation]);

  return (
    <BrowserRouter>
      {loading && <Spinner />}
      {error && <Error message={error} />}
      {!loading && !error && (
        <Routes>
          <Route path='/' element={<Layout location={cityName} />}>
            <Route index element={<WeatherData location={shownLocation} setLoading={setLoading} setError={setError} apiUrl={apiUrl} apiKey={apiKey} setCityName={setCityName} />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
