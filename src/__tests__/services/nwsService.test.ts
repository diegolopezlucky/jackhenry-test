import axios from 'axios';
import { getForecastForCoordinates } from '../../services/nwsService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getForecastForCoordinates', () => {
  const lat = '38.8977';
  const lon = '-77.0365';

  it('should fetch and return forecast and temperature', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({
        data: {
          properties: {
            forecast: 'https://api.weather.gov/gridpoints/XYZ/123,456/forecast',
          },
        },
      })
      .mockResolvedValueOnce({
        data: {
          properties: {
            periods: [
              {
                name: 'Today',
                shortForecast: 'Sunny',
                temperature: 72,
              },
            ],
          },
        },
      });

    const result = await getForecastForCoordinates(lat, lon);

    expect(result).toEqual({
      forecast: 'Sunny',
      temperature: 72,
    });
  });

  it('should fall back to first period if "Today" is not found', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({
        data: {
          properties: {
            forecast: 'https://api.weather.gov/gridpoints/XYZ/123,456/forecast',
          },
        },
      })
      .mockResolvedValueOnce({
        data: {
          properties: {
            periods: [
              {
                name: 'Monday',
                shortForecast: 'Cloudy',
                temperature: 65,
              },
            ],
          },
        },
      });

    const result = await getForecastForCoordinates(lat, lon);

    expect(result).toEqual({
      forecast: 'Cloudy',
      temperature: 65,
    });
  });
});
