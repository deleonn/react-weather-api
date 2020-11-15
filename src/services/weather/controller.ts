import { NextFunction, Request, Response } from 'express';
import { axiosInstance } from '../../util/axios';
import { EnhancedError } from '../../util/errors';

/**
 * Get the current weather data by city.
 *
 * @param req
 * @param res
 */
export const getWeatherDataByCity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { lat, lon } = req.body;

  try {
    if (!lat || !lon) {
      throw new EnhancedError(409, 'Lat or lon not provided', 'VALIDATION');
    }

    const weather = await axiosInstance.get('/weather', {
      params: {
        lat,
        lon,
      },
    });

    return res.json(weather.data);
  } catch (error) {
    next(error);
  }
};

/**
 * Get 7 day forecast data by city.
 *
 * @param req
 * @param res
 */
export const getForecastByCity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { lat, lon } = req.query;

  console.log(req.query);

  try {
    if (!lat || !lon) {
      throw new EnhancedError(409, 'Lat or lon not provided', 'VALIDATION');
    }

    const weather = await axiosInstance.get('/onecall', {
      params: {
        lat,
        lon,
        exclude: 'minutely,hourly,alerts',
      },
    });

    return res.json(weather.data);
  } catch (error) {
    next(error);
  }
};
