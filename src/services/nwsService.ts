import axios from 'axios';

export async function getForecastForCoordinates(
  lat: string,
  lon: string
): Promise<{
  forecast: string;
  temperature: number;
}> {
  const pointUrl = `https://api.weather.gov/points/${lat},${lon}`;

  const pointResponse = await axios.get(pointUrl);
  const forecastUrl = pointResponse.data.properties.forecast;

  const forecastResponse = await axios.get(forecastUrl);
  const periods = forecastResponse.data.properties.periods;

  const today = periods.find((p: any) => p.name === 'Today') || periods[0];

  return {
    forecast: today.shortForecast,
    temperature: today.temperature,
  };
}
