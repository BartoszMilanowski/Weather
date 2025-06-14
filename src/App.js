import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentLocation,
  setError,
  setCityName,
  setLastUpdate
} from './store/weatherSlice';
import './App.css';
import Layout from './components/Layout/Layout';
import Error from './components/common/Error';
import WeatherData from './components/WeatherData/WeatherData';
import getCurrentLocation from './api/currentLoacation';
import Spinner from './components/common/Spinner/Spinner';

function App() {

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const {
    currentLocation,
    cityName,
    lastUpdate,
    error
  } = useSelector((state) => state.weather);



  useEffect(() => {
    const fetchLocation = async () => {

      if (!navigator.geolocation) {
        dispatch(setError('Twoja przeglądarka nie obsługuje geolokalizacji'));
        return;
      }

      try {
        setLoading(true);
        const { latitude, longitude } = await getCurrentLocation();
        dispatch(setCurrentLocation(`${latitude},${longitude}`));
      } catch (error) {
        dispatch(setError('Twoja przeglądarka nie obsługuje geolokalizacji'))
      } finally {
        setLoading(false);
      }
    }
    fetchLocation();
  }, [dispatch]);


  return (
    <BrowserRouter>
      {loading && <Spinner />}
      {error && <Error message={error} />}
      <Routes>
        <Route path='/' element={<Layout
          location={cityName}
          lastUpdate={lastUpdate}
        />}>
          <Route index element={
            currentLocation ? (
            <WeatherData
            location={currentLocation}
            setError={(v) => dispatch(setError)}
            setCityName={(v) => dispatch(setCityName)}
            setLastUpdate={(v) => dispatch(setLastUpdate)} />
          ) : !error ? (
            <Spinner />
          ) : null } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
