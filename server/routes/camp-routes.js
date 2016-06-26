import express from 'express';
import campCtrl from '../features/camp/controllers/camp-controller';
const router = express.Router();	// eslint-disable-line new-cap

router.route('/search-demo').post(campCtrl.searchDemo);
router.route('/search').post(campCtrl.search);

export default router;
