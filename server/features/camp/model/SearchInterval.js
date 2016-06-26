/**
 * Search Interval
 */
export default class SearchInterval {
	/**
	 * midpoint property for seach parameters
	 * @returns {number}
	 */
	get mid() {
		return (this.search.start + this.search.stop) / 2;
	}

	/**
	 * Add days to time in miliseconds
	 * @param time
	 * @param days
	 * @returns {*}
	 */
	static addDaysToTime(time, days) {
		return time + (days * 86400000);
	}

	/**
	 * Model Contructor instantiates the
	 * search, begin, and end ranges
	 * @param startTime
	 * @param endTime
	 * @param offset
	 */
	constructor(startTime, endTime, offset) {
		/**
		 * Actual start and end of the users search
		 * @type {{start: number, stop: number}}
		 */
		this.search = { start: startTime, stop: endTime };

		/**
		 * Begining Range with gap rule calculated
		 * @type {{start: number, stop: number}}
		 */
		this.begin = {
			start: SearchInterval.addDaysToTime(this.search.start, -offset),
			stop: this.search.start
		};

		/**
		 * End Range with gap rule calculated
		 * @type {{start: number, stop: number}}
		 */
		this.end = {
			start: this.search.stop,
			stop: SearchInterval.addDaysToTime(this.search.stop, offset) };
	}
}
