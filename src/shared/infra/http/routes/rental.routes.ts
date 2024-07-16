import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';

const rentalRouter = Router();

const createRentalController = new CreateRentalController();
const listRentalsByUserController = new ListRentalsByUserController();
const devolutionRentalController = new DevolutionRentalController();

rentalRouter.post('/', ensureAuthenticated, createRentalController.handle);
rentalRouter.patch(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle
);
rentalRouter.get(
  '/user',
  ensureAuthenticated,
  listRentalsByUserController.handle
);

export { rentalRouter };
