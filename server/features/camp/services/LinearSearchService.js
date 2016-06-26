import _ from 'lodash';
import SearchDates from '../model/SearchDates';
import SearchInterval from '../model/SearchInterval';
import Reservation from '../model/Reservation';

export default class LinearSearchService {

	constructor(reservations, search, campsites, offset) {
		// instantiate class variables
		this.reservations = reservations;
		this.searchDates = new SearchDates(search.startDate, search.endDate, offset);
		this.campsites = campsites;
		this.offset = offset;

		// create the search interval
		this.interval = new SearchInterval(this.searchDates.start, this.searchDates.stop, this.offset)
	}

	/**
	 * linear search to find sites: O(n) complexity
	 */
	 linearSearch() {

		// collection of items in range
		const inRange = { left: [], right: [], after: [], overlap: [] };

		// loop through reservations and split to LEFT, RIGHT, ALL RIGHT
		for (const resObj of this.reservations) {
			const res = Reservation.fromObject(resObj);

			// aggregatge reservations that overlap into our current search
			if ((res.endTime >= this.searchDates.start && res.startTime <= this.searchDates.start) ||
				(res.startTime <= this.searchDates.stop && res.endTime >= this.searchDates.stop) ||
				(res.startTime >= this.searchDates.start && res.endTime <= this.searchDates.stop)) {
				inRange.overlap.push(res.campsiteId);
			}

			// get sites within range before the start date of search
			if ((res.endTime >= this.interval.end.stop) && (res.endTime <= this.searchDates.start)) {
				inRange.left.push(res.campsiteId);
			}

			// is the reservation end date within the range
			if (res.startTime >= this.searchDates.stop && res.startTime <= this.interval.end.stop) {
				inRange.right.push(res.campsiteId);
			}

			if (res.startTime >= this.searchDates.stop) {
				// add to collection of ALL after the search parameters
				inRange.after.push(res.campsiteId);
			}
		}

		// get all within tolerance and sites with no corresponding bookings after search date
		inRange.leftAndRight = _.intersection(inRange.left, inRange.right);
		inRange.leftOnly = _.difference(inRange.left, inRange.after);
		inRange.candidates = _.union(inRange.leftOnly, inRange.leftAndRight);

		// get valid list - candidates without any overlaps
		inRange.valid = _.difference(inRange.candidates, inRange.overlap);

		// return campsiteIds only to caller
		return _.uniq(inRange.valid);
	}

	/**
	 * Performs an Interval Tree Search based on the
	 * parameters passed in during contruction
	 */
	search() {
		// check that we have good search dates
		if (this.searchDates.start > this.searchDates.stop) {
			return {};
		}

		// no reservations otherwise means everything is available
		if (this.reservations.length === 0) {
			return this.campsites;
		}

		// perform search if we have valid input
		return this.linearSearch();
	}
}
