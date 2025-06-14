import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentLocation,
  setError,
  setLoading,
  setCityName,
  setLastUpdate
} from './store/weatherSlice';
import './App.css';
import Layout from './components/Layout/Layout';
import Error from './components/common/Error';
import Spinner from './components/common/Spinner/Spinner';
import WeatherData from './components/WeatherData/WeatherData';

function App() {

  const dispatch = useDispatch();
  const {
    currentLocation,
    cityName,
    lastUpdate,
    loading,
    error
  } = useSelector((state) => state.weather);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            dispatch(setCurrentLocation(`${latitude},${longitude}`));
          },

          (error) => {
            dispatch(setError('Twoja przeglądarka nie obsługuje geolokalizacji'));
            console.error(error);
          }
        );
      } else {
        dispatch(setError('Twoja przeglądarka nie obsługuje geolokalizacji'));
        console.error("Your browser don't show location");
      }
    }
    getLocation();
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
            <Route index element={<WeatherData
              location={currentLocation}
              setError={(v) => dispatch(setError)}
              setCityName={(v) => dispatch(setCityName)}
              setLastUpdate={(v) => dispatch(setLastUpdate)} />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
