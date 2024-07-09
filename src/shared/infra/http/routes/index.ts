import { Router } from 'express';
import { authenticateRoutes } from './authenticate.routes';
import { carsRouter } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationRouter } from './specification.routes';
import { usersRoutes } from './users.routes';
import { rentalRouter } from './rental.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/sessions', authenticateRoutes);

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationRouter);
router.use('/cars', carsRouter);
router.use('/rentals', rentalRouter);

export { router };
