import _ from 'lodash';
import IntervalTree from 'interval-tree2';
import SearchDates from '../model/SearchDates';
import SearchInterval from '../model/SearchInterval';
import Reservation from '../model/Reservation';

export default class IntervalSearchService {
	/**
	 * constructor for Interval Search Service
	 * @param reservations
	 * @param search
	 * @param campsites
	 * @param offset
	 */
	constructor(reservations, search, campsites, offset){

		// instantiate class variables
		this.reservations = reservations;
		this.searchDates = new SearchDates(search.startDate, search.endDate, offset);
		this.campsites = campsites;
		this.offset = offset;

		// create the search interval
		this.interval = new SearchInterval(this.searchDates.start, this.searchDates.stop, this.offset)
	}

	/**
	 * Add nodes to the given Interval Tree
	 * @param itree
	 * @returns {{left: Array, overlap: Array}}
	 */
	static addTreeNodes(itree) {
		// track intervals w/o future reservations
		const exception = { left: [], overlap: [] };

		// add reservations to tree
		for (let idx = 0; idx < this.reservations.length; idx++) {
			const res = Reservation.fromObject(this.reservations[idx]);

			// add 1 millisecond to end time to avoid collisions
			res.endTime += 1;

			// skip any reservations that may overlap into our current search
			if ((res.startTime <= this.searchDates.start && res.endTime >= this.searchDates.start) ||
				(res.startTime <= this.searchDates.stop && res.endTime >= this.searchDates.stop) ||
				(res.startTime >= this.searchDates.start && res.endTime <= this.searchDates.stop)) {
				// add the overlap to exceptions and skip the insertion into the tree
				exception.overlap.push(res.campsiteId);
				continue;
			}

			// store left only collection
			if((res.startTime < this.searchDates.start &&
				this.searchDates.start < this.searchDates.start)){
				exception.left[res.campsiteId] = res.campsiteId;
			}

			// add tree node for the reservation, id: index in array
			itree.add(res.startTime, res.endTime, idx);
		}

		// left only and overlap
		return exception;
	}

	/**
	 * performs an Interval Search, first loads an Interval Tree and then
	 * performs the search. Loading the tree is O(n LogN), use this search
	 * when we have lots of reservations to search since that will be much
	 * faster O(logN + m), otherwise linear search is more performant
	 */
	intervalSearch() {
		// create collection for search values
		const sites = { before: [], after: [], valid: [] };

		// interval tree : use search range midpoint
		// get exceptions while adding nodes to the tree
		const itree = new IntervalTree(this.interval.mid);
		const exception = IntervalSearchService.addTreeNodes(itree);

		// get reservations from overlapping nodes for begin and end
		_.forEach(itree.search(this.interval.begin.start, this.interval.begin.stop),
			(n) => { sites.before.push(this.reservations[n.id].campsiteId); });
		_.forEach(itree.search(this.interval.end.start, this.interval.end.stop),
			(n) => { sites.after.push(this.reservations[n.id].campsiteId); });

		// get intersection of start and left only
		sites.leftAndRight = _.intersection(sites.before, sites.after);
		sites.candidates = _.concat(sites.leftAndRight, _.filter(exception.left));

		sites.valid = _.difference(sites.candidates, exception.overlap);

		// return sites with valid start & end, and sites with no future reservations
		return _.filter(this.campsites, (s) => _.includes(sites.valid, s.id));
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
		return this.intervalSearch();
	}
}


