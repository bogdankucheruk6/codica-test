import {Router} from 'express';
import categoryController from '../controllers/categoryController';

const router = Router();

router.post('/', categoryController.createCategory);
router.delete('/:id', categoryController.deleteCategory);
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategory);
router.patch('/:id', categoryController.updateCategory);

export = router;