import _ from 'lodash';
import IntervalTree from 'interval-tree2';

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
 * Add days to time in miliseconds
 * @param time
 * @param days
 * @returns {*}
 */
function addDaysToTime(time, days) {
	return time + (days * 86400000);
}

/**
 * Prepare search intervals according to offset
 * @param startDate
 * @param endDate
 * @param offset
 * @returns search interval
 */
function getIntervals(startDate, endDate, offset) {
	// get time from dates searched
	const startTime = (new Date(startDate)).getTime();
	const endTime = (new Date(endDate)).getTime();

	// get intervals with offset and midpoint
	return {
		search: {
			start: startTime,
			stop: endTime
		},
		begin: {
			start: addDaysToTime(startTime, -offset),
			stop: startTime
		},
		end: {
			start: endTime,
			stop: addDaysToTime(endTime, offset)
		},
		mid: (startTime + endTime) / 2
	};
}

/**
 * Add nodes to the given Interval Tree, and
 * mark nodes as left only if they are below given min.
 * @param itree
 * @param res
 * @param start
 * @param stop
 */
function addTreeNodes(itree, res, start, stop) {
	// track intervals that do not have future
	// reservations
	const exception = { left: [], overlap: [] };

	// add reservations to tree
	for (let idx = 0; idx < res.length; idx++) {
		// get start and end, add 1 milisecond if times match - data not specific
		const resStart = new Date(res[idx].startDate).getTime();
		const resStop = ((time) => // eslint-disable-line no-confusing-arrow
				time === resStart ? time + 1 : time
		)(new Date(res[idx].endDate).getTime());

		// skip any reservations that may overlap into our current search
		if ((resStart <= start && resStop >= start) ||
			(resStart <= stop && resStop >= stop) ||
			(resStart >= start && resStop <= stop)) {
			// add the overlap to exceptions and skip the insertion into the tree
			exception.overlap.push(res[idx].campsiteId);
			continue;
		}

		// store left only collection
		exception.left[res[idx].campsiteId] = (resStart < start && resStop < start) ?
			res[idx].campsiteId :
			false;

		// add tree node for the reservation, id: index in array
		itree.add(resStart, resStop, idx);
	}

	// left only w/o overlap
	return exception;
}

/**
 * performs a linear search to find available
 * sites O(n) complexity
 * @param reservations
 * @param startDate
 * @param endDate
 * @param offset
 */
function linearSearch(reservations, startDate, endDate, offset) {
    // create search tolerance
	const search = {
		begin: (new Date(startDate)).getTime(),
		beginOffset: addDays(new Date(startDate), -offset).getTime(),
		end: (new Date(endDate)).getTime(),
		endOffset: addDays(new Date(endDate), offset).getTime()
	};

	// collection of items in range
	const inRange = { left: [], right: [], after: [], overlap: [] };

	// loop through reservations and split to LEFT, RIGHT, ALL RIGHT
	for (const res of reservations) {
		// get start and end dates for the reservation
		const resEndDate = new Date(res.endDate).getTime();
		const resStartDate = new Date(res.startDate).getTime();

		// aggregatge reservations that overlap into our current search
		if ((resEndDate >= search.begin && resStartDate <= search.begin) ||
			(resStartDate <= search.end && resEndDate >= search.end) ||
			(resStartDate >= search.begin && resEndDate <= search.end)) {
			inRange.overlap.push(res.campsiteId);
		}

		// get sites within range before the start date of search
		if ((resEndDate >= search.beginOffset) && (resEndDate <= search.begin)) {
			inRange.left.push(res.campsiteId);
		}

		// is the reservation end date within the range
		if (resStartDate >= search.end && resStartDate <= search.endOffset) {
			inRange.right.push(res.campsiteId);
		}

		if (resStartDate >= search.end) {
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
 * performs an Interval Search, first loads an Interval Tree and then
 * performs the search. Loading the tree is O(n LogN), use this search
 * when we have lots of reservations to search since that will be much
 * faster O(logN + m), otherwise linear search is more performant
 * @param reservations
 * @param startDate
 * @param endDate
 * @param offset
 */
function intervalSearch(reservations, startDate, endDate, offset) {
	// create collection for search values
	const sites = { before: [], after: [], valid: [] };

	// calculate intervals for the search
	const intervals = getIntervals(startDate, endDate, offset);

	// interval tree : use search range midpoint
	const itree = new IntervalTree(intervals.mid);

	// add nodes to the tree
	const exception = addTreeNodes(
		itree,
		reservations,
		intervals.search.start,
		intervals.search.stop
	);

	// get reservations from overlapping nodes for begin and end
	_.forEach(itree.search(intervals.begin.start, intervals.begin.stop),
		(n) => { sites.before.push(reservations[n.id].campsiteId); });
	_.forEach(itree.search(intervals.end.start, intervals.end.stop),
		(n) => { sites.after.push(reservations[n.id].campsiteId); });

	// get intersection of start and left only
	sites.leftAndRight = _.intersection(sites.before, sites.after);
	sites.candidates = _.concat(sites.leftAndRight, _.filter(exception.left));

	sites.valid = _.difference(sites.candidates, exception.overlap);

	// return sites with valid start & end, and sites with no future reservations
	return sites.valid;
}

/**
 * search for campgrounds available
 * @param reservations
 * @param search
 * @param campsites
 * @param gapRules
 * @param useInterval
 * @returns {{}}
 */
function searchCampSites(reservations, search, campsites, gapRules, useInterval) {
	// result object will be filled per gap rule
	const result = {};

	// verify search dates
	if ((new Date(search.startDate)).getTime() <= (new Date(search.endDate).getTime())) {
		// get availability based on each gap rule
		for (const offset of gapRules) {
			const available = {};

			// no reservations otherwise means everything is available
			if (reservations.length === 0) {
				available.campsiteIdList = _.map(campsites, 'id');
			} else {
				// for search intense payloads perform interval search
				if (useInterval) {
					// interval search for larger payloads
					available.campsiteIdList = intervalSearch(
						reservations,
						search.startDate,
						search.endDate,
						offset.gapSize
					);
				} else {
					// use a linear search for smaller payloads
					available.campsiteIdList = linearSearch(
						reservations,
						search.startDate,
						search.endDate,
						offset.gapSize
					);
				}
			}

			// get sites that are included in available
			result[offset.gapSize] = _.filter(campsites,
				(site) => _.includes(available.campsiteIdList, site.id));
		}
	}

	// return list of availability to caller
	return result;
}

export default { searchCampSites };
