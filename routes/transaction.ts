import Router from 'express';
import transactionController from '../controllers/transactionController';

const router = Router();

router.post('/', transactionController.createTransaction);
router.get('/:id', transactionController.getTransactions);
router.delete('/:id', transactionController.deleteTransaction);

export = router;