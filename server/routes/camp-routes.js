import express from 'express';
import campCtrl from '../features/camp/controllers/camp-controller';

const router = express.Router();	// eslint-disable-line new-cap

router.route('/search').post(campCtrl.search);
router.route('/interval').post(campCtrl.interval);

export default router;
