

export async function getTodaysWeather() {
 
// const openWeatherApiKey = process.env.WEATHER_KEY;
const openWeatherApiKey = import.meta.env.VITE_WEATHER_KEY;
if (!openWeatherApiKey) {
  throw new Error('VITE_WEATHER_KEY is not defined');
}
const lat = 40.1533114942667;
  const lon = -75.48946578396848;
  console.log('test')
  console.log(import.meta.env.VITE_WEATHER_KEY);
  // console.log(process.env.WEATHER_KEY);
  const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=$2e1b1808400c0b4f18f88d853977d29c&units=imperial`;
  // https://api.openweathermap.org/data/2.5/weather?lat=40.1533114942667&lon=-75.48946578396848&appid=2e1b1808400c0b4f18f88d853977d29c
  const response = await fetch(openWeatherUrl);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  // console.log(data);
  return data;
}
