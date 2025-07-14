import request from 'supertest';
import express from 'express';
import weatherRouter from '../../routes/weather';

jest.mock('../../services/nwsService', () => ({
  getForecastForCoordinates: jest.fn(),
}));

jest.mock('../../utils/temperatureUtils', () => ({
  categorizeTemperature: jest.fn(),
}));

import { getForecastForCoordinates } from '../../services/nwsService';
import { categorizeTemperature } from '../../utils/temperatureUtils';

describe('GET /weather', () => {
  const app = express();
  app.use('/weather', weatherRouter);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 400 if lat or lon is missing', async () => {
    const res = await request(app).get('/weather');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Missing lat or lon query parameters.' });
  });

  it('returns weather data correctly', async () => {
    (getForecastForCoordinates as jest.Mock).mockResolvedValue({
      forecast: 'Partly Cloudy',
      temperature: 75,
    });
    (categorizeTemperature as jest.Mock).mockReturnValue('moderate');

    const lat = '39.7456';
    const lon = '-97.0892';

    const res = await request(app).get('/weather').query({ lat, lon });

    expect(getForecastForCoordinates).toHaveBeenCalledWith(lat, lon);
    expect(categorizeTemperature).toHaveBeenCalledWith(75);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      forecast: 'Partly Cloudy',
      category: 'moderate',
    });
  });

  it('handles service errors gracefully', async () => {
    (getForecastForCoordinates as jest.Mock).mockRejectedValue(new Error('API failure'));

    const lat = '39.7456';
    const lon = '-97.0892';

    const res = await request(app).get('/weather').query({ lat, lon });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Failed to fetch weather data' });
  });
});
