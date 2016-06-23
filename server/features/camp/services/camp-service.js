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
 * get sites available based on request startDate and endDate given an offset
 * @param reservations
 * @param startDate
 * @param endDate
 * @param offset
 */
function getSitesAvailable(reservations, startDate, endDate, offset) {
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

/**
 *
 * @param reservations
 * @param search
 * @param campsites
 * @param gapRules
 * @returns {{}}
 */
function searchGrounds(reservations, search, campsites, gapRules) {
	// result object will be filled per gap rule
	const result = {};

    // get availability based on each gap rule
	for (const offset of gapRules) {
        // get sites for the
		const available = getSitesAvailable(
			reservations,
			search.startDate,
			search.endDate,
			offset.gapSize
		);

        // get sites that are included in available
		result[offset.gapSize] = _.filter(campsites, (site) => _.includes(available, site.id));
	}

	// return list of availability to caller
	return result;
}

/**
 * Prepare search intervals according to offset
 * @param startTime
 * @param endTime
 * @param offset
 * @returns {{search: {start: *, stop: *}, begin: {start: *, stop: *}, end: {start: *, stop: *}, mid: number}}
 */
function getIntervals(startTime, endTime, offset){
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
 * @param campsites
 * @param min
 */
function addNodes(itree, res,  left, min) {
	// add reservations to tree
	for (let idx = 0; idx < res.length; idx++) {
		// get start and end, add 1 milisecond if times match - data not specific
		const start = new Date(res[idx].startDate).getTime();
		const end = ((t) => t === start ? t + 1 : t)(new Date(res[idx].endDate).getTime());

		// mark node as left only
		left[res[idx].campsiteId] = {left: (start < min && end < min), id: res[idx].campsiteId} ;

		// add tree node for the reservation, id: index in array
		itree.add(start, end, idx);
	}
}

/**
 *
 * @param reservations
 * @param search
 * @param campsites
 * @param gapRules
 */
function searchCampSites(reservations, search, campsites, gapRules) {
	// set offset manually
	const offset = gapRules[0].gapSize;

	// key campsite information on id
	const left = {};

	// calculate intervals for the search
	const intervals = getIntervals(
		(new Date(search.startDate)).getTime(),
		(new Date(search.endDate)).getTime(),
		offset);

	// interval tree : use search range midpoint
	const itree = new IntervalTree(intervals.mid);

	// add nodes to the tree
	addNodes(itree, reservations, left, intervals.search.start);

	// remove any nodes that overlap search times
	_.forEach(itree.search(intervals.search.start, intervals.search.stop), (node) => itree.remove(node.id));

	// get reservations within our start and end range
	const nodes = {
		before: itree.search(intervals.begin.start, intervals.begin.stop),
		after: itree.search(intervals.end.start, intervals.end.stop)
	};

	const sites = { before: [], after: [], valid: [] };

	// get reservations from overlapping nodes and left only
	//_.forEach(nodes.before, (n) => { if(n) sites.before.push(reservations[parseInt(n.id)].campsiteId) });
	//_.forEach(nodes.after, (n) => { if(n) sites.after.push(reservations[parseInt(n.id)].campsiteId) });

	// get all that match both criteria for start and end
	sites.matches = _.intersection(sites.before, sites.after);


	//sites.matches.push(_.map(_.filter(left, 'left'), 'campsiteId'));

	// _.forEach(sites.matches , (m) => validSites.push(campsites[m.campsiteId]));
	// sites.valid.push(_.filter(campsites, sites.matches, 'campsiteId'));
	// validSites.push(_.filter(campsites, 'leftOnly'));


	return validSites;

	// add any campsites that do not have a future reservations
	//sites.matches.push(_.intersectionBy(sites.before, sites.leftOnly));

	//
	// let overlapGap = itree.search(interval.begin.start, interval.end.stop);
	//
	// let matchGapOnly = _.differenceBy(overlapGap, overlapSearch, 'id');
	//
	// let reservationsOverlapping = _.pullAt(reservations, _.map(matchGapOnly, 'id'));

	// console.log(reservationsOverlapping);


	// // get sites based on the tree nodes
	// const sites = {
	// 	before: _.map(_.pullAt(reservations, _.differenceBy(nodes.before, overlapSearch,'id')), 'campsiteId'),
	// 	after: _.map(_.pullAt(reservations, _.differenceBy(nodes.after, overlapSearch, 'id')), 'campsiteId')
	// };

	//
	//sites.noUpcoming = ;sites
}

export default { searchGrounds, searchCampSites };
