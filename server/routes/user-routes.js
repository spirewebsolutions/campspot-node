import express from 'express';
import UserController from '../features/users/controllers/users-controller';
const router = express.Router();	// eslint-disable-line new-cap

router.route('/create').post(UserController.create);

//router.route('/update').put(UserController.update);
//router.route('/get/:userId').get(UserController.search);
//router.route('/get-all').get(UserController.search);
//
//router.route('/charge-success').post(UserController.searchDemo);
//router.route('/charge-fail').post(UserController.searchDemo);



export default router;
