import axios from 'axios';

/**
 * Create the weather api axios instance. Receives a default env value
 * as OPENWEATHER_API_KEY
 */

export const axiosInstance = axios.create({
  baseURL: process.env.OPENWEATHER_API_URL,
  timeout: 10000,
  params: {
    appid: process.env.OPENWEATHER_API_KEY,
    units: 'metric',
  },
});
