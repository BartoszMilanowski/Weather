import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import WeatherBox from './components/WeatherBox/WeatherBox';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<WeatherBox />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
