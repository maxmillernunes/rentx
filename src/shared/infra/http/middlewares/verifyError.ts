import { AppError } from '@shared/errors/AppError';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export const verifyError: ErrorRequestHandler = async (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (err instanceof AppError) {
    const { statusCode, message } = err;
    res.status(statusCode).json({ message });
    return;
  }

  const { message } = err;
  console.error(message, {
    userIp: req.ip,
    status: 500,
    timestamp: new Date().toISOString(),
  });
  res.status(500).json({ message });
};
