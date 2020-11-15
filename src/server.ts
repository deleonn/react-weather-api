import express, { Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

dotenv.config();

import { weather } from './services';
import { handleErrorMiddleware, logger } from './util/errors';

const port = process.env.port || 4000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/health', (_, res: Response) => {
  res.send('Hello World!');
});

app.use('/api/weather', weather);

if (process.env.NODE_ENV === 'development') {
  app.use((error: any, req: any, res: any, next: any) => {
    logger(error, next);
  });
}

app.use((error: any, req: any, res: any, next: any) => {
  handleErrorMiddleware(error, req, res);
});

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
