const fetchWeatherData = async (location) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const apiKey = process.env.REACT_APP_API_KEY;

  console.log('in weather.js ', location);

  const resp = await fetch(
    `${apiUrl}/forecast.json?key=${apiKey}&q=${location}&days=3&aqi=no`
  );
  
  if (!resp.ok) throw new Error('Błąd pobrania danych');
  return resp.json();
};

export default fetchWeatherData;
