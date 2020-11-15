import { NextFunction, Request, Response } from 'express';

type ErrorTypes = 'VALIDATION' | 'API' | undefined;

class EnhancedError extends Error {
  statusCode: number;
  type: Partial<ErrorTypes>;

  constructor(
    statusCode: number,
    message: string,
    type: Partial<ErrorTypes> = 'API'
  ) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.type = type;
  }
}

const handleErrorMiddleware = (err: any, _: Request, res: Response) => {
  const { message, statusCode, type } = err;

  res.status(statusCode || 500).json({
    status: 'error',
    statusCode,
    message,
    type,
  });
};

const logger = (err: Error, next: NextFunction) => {
  console.log('logging error');
  console.error(err);
  next(err);
};

export { EnhancedError, handleErrorMiddleware, logger };
