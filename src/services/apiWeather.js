export async function getTodaysWeather() {
  const openWeatherApiKey = "2e1b1808400c0b4f18f88d853977d29c";
  const lat = 40.1533114942667;
  const lon = -75.48946578396848;
  const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=imperial`;
  // https://api.openweathermap.org/data/2.5/weather?lat=40.1533114942667&lon=-75.48946578396848&appid=2e1b1808400c0b4f18f88d853977d29c
  const response = await fetch(openWeatherUrl);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  console.log(data);
  return data;
}
