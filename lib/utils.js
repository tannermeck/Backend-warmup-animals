const fetch = require('node-fetch');

async function getCity(search){
  const url = await fetch(`https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODING_KEY}&q=${search}&format=json`);
  const data = await url.json();
  const newData = {
    formatted_query: data[0].display_name,
    latitude: data[0].lat,
    longitude: data[0].lon,
  };
  return newData;
}
async function getWeather(lat, lon){
  const url = await fetch(`http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_KEY}&lat=${lat}&lon=${lon}`);
  const { data } = await url.json();
  return data.map((item) => {
    return {
      forecast: item.weather.description,
      time: new Date(item.ts * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    };
  });
}

module.exports = {
  getCity, getWeather
};