import { NextFunction, Request, Response } from 'express';
import Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';

import { AppError } from '@shared/errors/AppError';
import redisConfig from '@config/redis';

const redisClient = new Redis({
  enableOfflineQueue: false,
  host: redisConfig.redis.host,
  port: redisConfig.redis.port,
});

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'middleware',
  points: 10, // 10 requests
  duration: 5, // per 1 second by IP
  blockDuration: 10,

  // useRedisPackage: true, -> Use this flag for the `redis` package
});

export default async function rateLimiterMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    await rateLimiter.consume(request.ip);

    return next();
  } catch (error) {
    throw new AppError('Too Many Requests', 429);
  }
}
