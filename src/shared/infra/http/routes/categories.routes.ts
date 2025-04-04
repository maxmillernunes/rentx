import { Router, type RequestHandler } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';

import uploadConfig from '@config/upload';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

const categoriesRoutes = Router();

const uploadFile = multer(uploadConfig.multer);

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);
categoriesRoutes.post(
  '/import',
  ensureAuthenticated,
  ensureAdmin,
  uploadFile.single('file') as unknown as RequestHandler,
  importCategoryController.handle
);
categoriesRoutes.get('/', listCategoriesController.handle);

export { categoriesRoutes };
