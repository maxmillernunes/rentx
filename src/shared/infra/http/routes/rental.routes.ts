import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateRentalController } from '@modules/rental/useCases/createRental/createRentalController';
import { DevolutionRentalController } from '@modules/rental/useCases/devolutionRental/DevolutionRentalController';

const rentalRouter = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalRouter.post('/', ensureAuthenticated, createRentalController.handle);
rentalRouter.patch(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle
);

export { rentalRouter };
