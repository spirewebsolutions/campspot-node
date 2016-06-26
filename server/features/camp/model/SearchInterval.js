/**
 * Search Interval
 */
export default class SearchInterval {

	/**
	 * Actual start and end of the users search
	 * @type {{start: number, stop: number}}
	 */
	const search = { start: 0, stop: 0 };

	/**
	 * Begining Range with gap rule calculated
	 * @type {{start: number, stop: number}}
	 */
	const begin = { start: 0, stop: 0 };

	/**
	 * End Range with gap rule calculated
	 * @type {{start: number, stop: number}}
	 */
	const end = { start: 0, stop: 0 };

	/**
	 * midpoint property for seach parameters
	 * @returns {number}
	 */
	get mid() {
		return (this.search.start + this.search.stop) / 2
	}

	/**
	 * Add days to time in miliseconds
	 * @param time
	 * @param days
	 * @returns {*}
	 */
	static addDaysToTime = function addDaysToTime(time, days) {
		return time + (days * 86400000);
	};

	/**
	 * Model Contructor instantiates the
	 * search, begin, and end ranges
	 * @param startTime
	 * @param endTime
	 * @param offset
	 */
	constructor(startTime, endTime, offset) {
		// set seart start and end
		this.search.start = startTime;
		this.search.stop = endTime;

		// set begin range with offset
		this.begin.start = SearchInterval.addDaysToTime(this.search.start, -offset);
		this.begin.stop = this.search.start;
		
		// set end range with offset
		this.end.start = this.search.stop;
		this.end.stop = SearchInterval.addDaysToTime(this.search.stop, offset)
	}
}