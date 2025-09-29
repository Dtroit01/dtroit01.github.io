const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city');
const result = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  result.textContent = 'Loading...';
  try {
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
    const geo = await res.json();
    if(!geo.results || geo.results.length === 0) throw new Error('City not found');
    const { latitude, longitude, name } = geo.results[0];
    const w = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    const data = await w.json();
    result.innerHTML = `<h3>${name}</h3><p>Temp: ${data.current_weather.temperature} °C</p><p>Wind: ${data.current_weather.windspeed} m/s</p>`;
  } catch (err) {
    result.textContent = 'Error: ' + err.message;
  }
});
