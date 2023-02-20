import Router from 'express';
import bankController from '../controllers/bankController';

const router = Router();

router.get('/', bankController.getBanks);
router.get('/:id', bankController.getBank);
router.post('/', bankController.createBank);
router.delete('/:id', bankController.deleteBank);
router.patch('/:id', bankController.updateBank);

export = router;