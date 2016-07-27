import UserService from '../services/user-service';
import User from '../model/user'
import Container from '../model/container';

	function create(req, res) {

		const user = User.fromObject(req.body);


        const cont = new Container('balls', '/tits', 8080, 9090, 'test');

		// call service to create the user
		const available = UserService.create(user, cont);

		// return as JSON to caller
		return res.json({});
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
