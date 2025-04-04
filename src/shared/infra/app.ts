import 'reflect-metadata';
import 'dotenv/config';

import express, { RequestHandler } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../swagger.json';

import '@shared/container';

import upload from '@config/upload';

import { router } from '@shared/infra/http/routes';

import createConnection from './typeorm';
import { verifyError } from './http/middlewares/verifyError';

createConnection();

const app = express();
app.use(express.json());

const swaggerServe: RequestHandler =
  swaggerUi.serve as unknown as RequestHandler;
const swaggerSetup: RequestHandler = (req, res, next) => {
  swaggerUi.setup(swaggerFile)(req, res, next);
};

app.use('/api-docs', swaggerServe, swaggerSetup);
app.use(
  '/avatar',
  express.static(`${upload.tempFolder}/${upload.avatarFolder}`)
);
app.use('/cars', express.static(`${upload.tempFolder}/${upload.carsFolder}`));

app.use(router);

app.use(verifyError);

export { app };
