import UserService from '../services/user-service';
import User from '../model/user'


	function create(req, res) {
		console.log(req.body);
		const user = User.fromObject(req.body.content);

		console.log(user);

		// call service to create the user
		const available = UserService.create(user);

		// return as JSON to caller
		return res.json(available);
	}



//
//
///**
// * Actual Search Endpoint
// * @param req
// * @param res
// * @returns {*}
// */
//function search(req, res) {
//	// call service to get available campgrounds
//	const available = CampService.search(
//		req.body.reservations,
//		req.body.search,
//		req.body.campsites,
//		req.body.gapRules,
//		req.query.interval
//	);
//
//	// return as JSON to caller
//	return res.json(available);
//}
//
export default {  create };
