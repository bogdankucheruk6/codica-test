import Router from 'express';
import statisticsController from '../controllers/statisticsController';

const router = Router();

router.get('/', statisticsController.getStatistics);

export = router;
