import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import 'express-async-errors';

import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../swagger.json';

import '@shared/container';

import upload from '@config/upload';

import { router } from '@shared/infra/http/routes';

import createConnection from './typeorm';
import { verifyError } from './http/middlewares/verifyError';

import rateLimiterMiddleware from './http/middlewares/rateLimiter';

createConnection();

const app = express();
app.use(express.json());

app.use(rateLimiterMiddleware);

// @ts-ignore
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(
  '/avatar',
  express.static(`${upload.tempFolder}/${upload.avatarFolder}`)
);
app.use('/cars', express.static(`${upload.tempFolder}/${upload.carsFolder}`));

app.use(cors());

app.use(router);

app.use(verifyError);

export { app };
