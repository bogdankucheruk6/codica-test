import {Router} from 'express';
import categoryRouter from './category';
import transactionRouter from './transaction';
import bankRouter from './bank';
import statisticsRouter from './statistics';

const router = Router();

router.use('/category', categoryRouter);
router.use('/transaction', transactionRouter);
router.use('/bank', bankRouter);
router.use('/statistics', statisticsRouter);

export = router;