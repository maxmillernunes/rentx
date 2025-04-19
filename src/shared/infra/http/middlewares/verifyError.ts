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

  console.error('Internal Server Error:', err.message, {
    userIp: req.ip,
    status: 500,
    sentryEventId: (res as any).sentry || null,
    timestamp: new Date().toISOString(),
  });

  res.status(500).json({
    message: `Internal Server Error - ${err.message}`,
    status: 500,
    sentryEventId: (res as any).sentry || null,
  });
};
