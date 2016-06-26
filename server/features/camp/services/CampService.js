import IntervalSearchService from './IntervalSearchService';
import LinearSearchService from './LinearSearchService';

export default class CampService {
	/**
	 * search for campgrounds available
	 * @param reservations
	 * @param search
	 * @param campsites
	 * @param gapRules
	 * @param interval
	 * @returns {{}}
	 */
	static search(reservations, search, campsites, gapRules, interval) {
		// roll through gapRules and search
		for (const offset of gapRules) {
			const searchService = interval ?
				new IntervalSearchService(reservations, search, campsites, offset) :
				new LinearSearchService(reservations, search, campsites, offset);

			offset.result = searchService.search;
		}

		return gapRules;
	}
}
