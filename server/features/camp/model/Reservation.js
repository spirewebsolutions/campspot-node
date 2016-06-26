/**
 * Reservation model
 */
export default class Reservation {

	/**
	 * The campsite Id
	 * @type {number}
	 */
	var campsiteId = 0;

	/**
	 * The start date of the reservation
	 * @type {Date}
	 */
	var startDate = new Date(0);

	/**
	 * The end date of the reservation
	 * @type {Date}
	 */
	var endDate = new Date(0);

	/**
	 * Start Date as Time in miliseconds
	 * @type {number}
	 */
	var startTime = 0;

	/**
	 * End Date as Time in miliseconds
	 * @type {number}
	 */
	var endTime = 0;

	/**
	 * Construtor for Reservation model
	 * @param campsiteId
	 * @param startDate
	 * @param endDate
	 */
	constructor(campsiteId, startDate, endDate) {
		this.campsiteId = campsiteId;
		// set start and end date
		this.startDate = new Date(startDate);
		this.endDate = new Date(endDate);
		// calculate start and end time
		this.startTime = this.startDate.getTime();
		this.endTime = this.endDate.getTime();
	}

	/**
	 * Construts a new
	 * @param reservation
	 * @returns {Reservation}
	 */
	static fromObject(reservation) {
		return new Reservation(
			reservation.campsiteId,
			reservation.startDate,
			reservation.endDate
		);
	}
}