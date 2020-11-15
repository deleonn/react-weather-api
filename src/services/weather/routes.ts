import { Router } from 'express';
import { getForecastByCity, getWeatherDataByCity } from './controller';

const router = Router();

router.get('/current', getWeatherDataByCity);
router.get('/forecast', getForecastByCity);

export default router;
