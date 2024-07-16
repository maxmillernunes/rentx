import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateRentalController } from '@modules/rentals/useCases/createRental/createRentalController';

const rentalRouter = Router();

const createRentalController = new CreateRentalController();

rentalRouter.post('/', ensureAuthenticated, createRentalController.handle);

export { rentalRouter };
