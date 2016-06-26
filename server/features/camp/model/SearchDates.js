/**
 * Search Dates
 */
export default class SearchDates {
	/**
	 * Model Contructor instantiates the
	 * search, begin, and end ranges
	 * @param startDate
	 * @param endDate
	 * @param offset
	 */
	constructor(startDate, endDate, offset) {
		/**
		 * Begining of search range
		 */
		this.start = (new Date(startDate)).getTime();

		/**
		 * Ending of search range
		 */
		this.stop = (new Date(endDate)).getTime();

		/**
		 * Offset(gaprule) of search range
		 */
		this.offset = offset;
	}
}
