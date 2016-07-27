import express from 'express';
import userCtrl from '../features/users/controllers/user-controller';
const router = express.Router();	// eslint-disable-line new-cap


router.route('/create').post(userCtrl.create);


export default router;


//router.route('/update').put(UserController.update);
//router.route('/get/:userId').get(UserController.search);
//router.route('/get-all').get(UserController.search);
//
//router.route('/charge-success').post(UserController.searchDemo);
//router.route('/charge-fail').post(UserController.searchDemo);




