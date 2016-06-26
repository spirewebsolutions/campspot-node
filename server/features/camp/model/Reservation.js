/**
 * Reservation model
 */
export default class Reservation {
	/**
	 * Construtor for Reservation model
	 * @param campsiteId
	 * @param startDate
	 * @param endDate
	 */
	constructor(campsiteId, startDate, endDate) {
		/**
		 * The campsite Id
		 * @type {number}
		 */
		this.campsiteId = campsiteId;

		/**
		 * The start date of the reservation
		 * @type {Date}
		 */
		this.startDate = new Date(startDate);

		/**
		 * The end date of the reservation
		 * @type {Date}
		 */
		this.endDate = new Date(endDate);

		/**
		 * Start Date as Time in miliseconds
		 * @type {number}
		 */
		this.startTime = this.startDate.getTime();

		/**
		 * End Date as Time in miliseconds
		 * @type {number}
		 */
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
