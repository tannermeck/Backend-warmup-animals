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
async function getReviews(lat, lon){
  let url = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}`;
  let bearer = 'Bearer ' + process.env.YELP_KEY;
  const data = await fetch(url, {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Authorization': bearer,
      'Content-Type': 'application/json'
    }
  });
  const newData = await data.json();
  return newData.businesses.map((item) => {
    return {
      name: item.name,
      image_url: item.image_url,
      price: item.price,
      rating: item.rating,
      url: item.url
    };
  });
}

module.exports = {
  getCity, getWeather, getReviews
};