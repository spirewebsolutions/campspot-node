/**
 * Search Dates
 */
export default class SearchDates {

	/**
	 * Begining of search range
	 */
	var start = 0;

	/**
	 * Ending of search range
	 */
	var stop = 0;

	/**
	 * Offset(gaprule) of search range
	 */
	var offset = 0;

	/**
	 * Model Contructor instantiates the
	 * search, begin, and end ranges
	 * @param startDate
	 * @param endDate
	 * @param offset
	 */
	constructor(startDate, endDate, offset) {
		this.start = (new Date(startDate)).getTime();
		this.stop = (new Date(endDate)).getTime();
		this.offset = offset;
	}
}