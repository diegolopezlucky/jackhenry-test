import express, { Request, Response } from 'express';
import { getForecastForCoordinates } from '../services/nwsService';
import { categorizeTemperature } from '../utils/temperatureUtils';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Missing lat or lon query parameters.' });
  }

  try {
    const { forecast, temperature } = await getForecastForCoordinates(lat as string, lon as string);

    const category = categorizeTemperature(temperature);

    return res.json({
      forecast,
      category,
    });
  } catch (error: any) {
    console.error('Error fetching weather data:', error.message);
    return res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

export default router;
