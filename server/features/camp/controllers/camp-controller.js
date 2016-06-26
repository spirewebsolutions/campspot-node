import CampService from '../services/CampService';

function searchDemo(req, res) {
	const file = JSON.parse(req.body.content);

	// call service to get available campgrounds
	const available = CampService.search(
		file.reservations,
		file.search,
		file.campsites,
		file.gapRules,
		false
	);

	// return as JSON to caller
	return res.json(available);
}

/**
 * Actual Search Endpoint
 * @param req
 * @param res
 * @returns {*}
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

export default { search, searchDemo };
