// import campService from '../services/camp-service';
import CampService from '../services/CampService';

/**
 * Search camp grounds for available based on
 * gap rule provided
 * @returns {User}
 */
function search(req, res) {
	// call service to get available campgrounds
	const available = CampService.search(
		req.body.reservations,
		req.body.search,
		req.body.campsites,
		req.body.gapRules,
		req.query.interval
	);

	// return as JSON to caller
	return res.json(available);
}

export default { search };
