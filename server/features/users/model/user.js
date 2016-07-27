/**
 * Reservation model
 */
export default class User {
	/**
	 * Construtor for Reservation model
	 * @param userToken
	 * @param cardToken
	 * @param txnDate
	 */
	constructor(userToken, cardToken, txnDate) {
		/**
		 * The campsite Id
		 * @type {number}
		 */
		this.userToken = userToken;

		/**
		 * The start date of the reservation
		 * @type {Date}
		 */
		this.cardToken = cardToken;

		/**
		 * The end date of the reservation
		 * @type {Date}
		 */
		this.txnDate = new Date(txnDate);
	}

	/**
	 * Construts a new
	 * @param reservation
	 * @returns {Reservation}
	 */
	static fromObject(user) {
		return new User(
			user.userToken,
			user.cardToken,
			user.txnDate
		);
	}
}
