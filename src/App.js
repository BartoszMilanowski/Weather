import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  setError,
  setWeatherConditions
} from './store/weatherSlice';
import './App.css';
import Layout from './components/Layout/Layout';
import Error from './components/common/Error';
import WeatherData from './components/WeatherData/WeatherData';
import getCurrentLocation from './api/currentLocation';
import Spinner from './components/common/Spinner/Spinner';
import fetchWeatherData from './api/weather';

function App() {

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { selectLocation, error, refresh } = useSelector((state) => state.weather);

  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true);
        dispatch(setError(null))
        let locationString;

        if (selectLocation) {
          locationString = selectLocation;
        } else {
          const { latitude, longitude } = await getCurrentLocation();
          locationString = `${latitude},${longitude}`;
        }

        const resp = await fetchWeatherData(locationString);
        dispatch(setWeatherConditions(resp));
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [dispatch, selectLocation, refresh]);


  return (
    <BrowserRouter>
      {loading && <Spinner />}
      {error && <Error message={error} />}
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<WeatherData />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
