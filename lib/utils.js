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

module.exports = {
  getCity,
};