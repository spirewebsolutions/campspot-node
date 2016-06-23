import express from 'express';
import campRoutes from './camp-routes';

const router = express.Router();	// eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
	res.send('OK')
);

// mount user routes at /users
router.use('/camp', campRoutes);

export default router;
