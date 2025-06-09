const API_KEY = '1b8e21ce1a4da92983197943df7dfc69'; 

const CITY = 'Bursa,tr';

export const fetchWeather = async () => {
  try {
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&lang=tr&appid=${API_KEY}`
    );
    if (!weatherResponse.ok) {
      throw new Error('Hava durumu verisi alınamadı.');
    }
    const weatherData = await weatherResponse.json();

    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=metric&lang=tr&appid=${API_KEY}`
    );
    if (!forecastResponse.ok) {
      throw new Error('Tahmin verisi alınamadı.');
    }
    const forecastData = await forecastResponse.json();

    return {
      ...weatherData,
      forecast: forecastData,
    };
  } catch (error) {
    throw error;
  }
};
