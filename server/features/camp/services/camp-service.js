import _ from 'lodash';

/**
 * Add Days to a given date
 * @param date
 * @param days
 * @returns {*}
 */
function addDays(date, days) {
	date.setDate(date.getDate() + parseInt(days, 10));
	return date;
}

/**
 * get sites available based on request startDate and endDate given an offset
 * @param reservations
 * @param startDate
 * @param endDate
 * @param offset
 */
function _getSitesAvailable(reservations, startDate, endDate, offset) {
    // create search tolerance
	const search = {
		begin: (new Date(startDate)).getTime(),
		beginOffset: addDays(new Date(startDate), -offset).getTime(),
		end: (new Date(endDate)).getTime(),
		endOffset: addDays(new Date(endDate), offset).getTime()
	};

	const after = [];

    // get sites within range before the start date of search
	const inRangeBefore = reservations.filter((val) => {
		const resEndDate = new Date(val.endDate).getTime();
		// is the reservation end date within the range
		return (resEndDate >= search.beginOffset) && (resEndDate <= search.begin);
	});

    // get sites within range after search, as well as all after
	const inRangeAfter = reservations.filter((val) => {
		const resStartDate = new Date(val.startDate).getTime();

		// add to collection of reservations starting
		// after our search - saves a filter call or loop
		if (resStartDate >= search.end) {
			after.push(val);
		}

		// is the reservation start date within the range
		return (resStartDate >= search.end) && (resStartDate <= search.endOffset);
	});

    // get all within tolerance and sites with no corresponding bookings after search date
	const noFutureReservations = _.differenceBy(inRangeBefore, after, 'campsiteId');
	const viable = _.intersectionBy(inRangeBefore, inRangeAfter, 'campsiteId');

	// union the two sets found
	const available = _.union(viable, noFutureReservations);

	// return campsiteIds only to caller
	return _.map(_.uniq(available), 'campsiteId');
}


function searchGrounds(reservations, search, campsites, gapRules) {
	// result object will be filled per gap rule
	const result = {};

    // get availability based on each gap rule
	for (const offset of gapRules) {
        // get sites for the
		const available = _getSitesAvailable(
			reservations,
			search.startDate,
			search.endDate,
			offset.gapSize
		);

        // get sites that are included in available
		result[offset.gapSize] = _.filter(campsites, (site) => {
			return _.includes(available, site.id);
		});
	}

	// return list of availability to caller
	return result;
}

export default { searchGrounds };
