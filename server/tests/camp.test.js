import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai from 'chai';
import app from '../../index';
import mocha from 'mocha';

// grab expect and assert
const expect = chai.expect;
const assert = chai.assert;
const it = mocha.it;

// include test data
import initialReservation from './data/camp/initial.json';
import noReservations from './data/camp/noreservations.json';
import noneAvailable from './data/camp/noneavailablegaptwo.json';
import nosearchdates from './data/camp/nosearchdates.json';
import nogaprules from './data/camp/nogaprules.json';
import noneavailableleftoverlap from './data/camp/noneavailableleftoverlap.json';
import noneavailablealloverlap from './data/camp/noneavailablealloverlap.json';
import startandendbackwards from './data/camp/startandendbackwards.json';
import nocampsites from './data/camp/nocampsites.json';
import samedatessearched from './data/camp/samedatessearched.json';
import zeroOffset from './data/camp/zeroOffset.json';


// set chain/mocha config
chai.config.includeStack = true;

// const expect = chai.expect;
// descript camp search endpoint
mocha.describe('## Camp Search EndPoint', () => {
	mocha.describe('# POST /api/search', () => {
		it('get available campsites with initial data set and a Linear', (done) => {
			request(app)
				.post('/api/camp/search')
				.send(initialReservation)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isArray(res.body);
					expect(res.body).to.eql(initialReservation.expected);

					done();
				});
		});

		it('get available campsites with initial data set and Interval Tree Search', (done) => {
			request(app)
				.post('/api/camp/search?interval=1')
				.send(initialReservation)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isArray(res.body);
					expect(res.body).to.eql(initialReservation.expected);

					done();
				});
		});

		it('get available campsites with backward start == end search date - linear', (done) => {
			request(app)
				.post('/api/camp/search')
				.send(samedatessearched)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isArray(res.body);
					expect(res.body).to.eql(samedatessearched.expected);

					done();
				});
		});

		it('get available campsites with backward start == end search date - interval', (done) => {
			request(app)
				.post('/api/camp/search?interval=1')
				.send(samedatessearched)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isArray(res.body);
					expect(res.body).to.eql(samedatessearched.expected);

					done();
				});
		});

		it('get available campsites with backward start/end search data - linear', (done) => {
			request(app)
				.post('/api/camp/search')
				.send(startandendbackwards)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isArray(res.body);
					expect(res.body).to.eql(startandendbackwards.expected);

					done();
				});
		});

		it('get available campsites with backward start/end search data - interval', (done) => {
			request(app)
				.post('/api/camp/search?interval=1')
				.send(startandendbackwards)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isArray(res.body);
					expect(res.body).to.eql(startandendbackwards.expected);

					done();
				});
		});

		it('get no campsites when none are available - linear', (done) => {
			request(app)
				.post('/api/camp/search')
				.send(noneAvailable)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isArray(res.body);
					expect(res.body).to.eql(noneAvailable.expected);

					done();
				});
		});

		it('get no campsites when none are available - interval', (done) => {
			request(app)
				.post('/api/camp/search?interval=1')
				.send(noneAvailable)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isArray(res.body);
					expect(res.body).to.eql(noneAvailable.expected);

					done();
				});
		});

		it('get no campsites because of left only overlap for linear - linear', (done) => {
			request(app)
				.post('/api/camp/search')
				.send(noneavailableleftoverlap)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isArray(res.body);
					expect(res.body).to.eql(noneavailableleftoverlap.expected);

					done();
				});
		});

		it('get no campsites because of left only overlap for - interval', (done) => {
			request(app)
				.post('/api/camp/search?interval=1')
				.send(noneavailableleftoverlap)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isArray(res.body);
					expect(res.body).to.eql(noneavailableleftoverlap.expected);

					done();
				});
		});

		it('get no campsites when none are available - linear', (done) => {
			request(app)
				.post('/api/camp/search')
				.send(noneavailablealloverlap)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isArray(res.body);
					expect(res.body).to.eql(noneavailablealloverlap.expected);

					done();
				});
		});

		it('get no campsites when none are available because of overlap for interval', (done) => {
			request(app)
				.post('/api/camp/search?interval=1')
				.send(noneavailablealloverlap)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isArray(res.body);
					expect(res.body).to.eql(noneavailablealloverlap.expected);

					done();
				});
		});

		it('get when we have no sites in the collection - linear', (done) => {
			request(app)
				.post('/api/camp/search')
				.send(nocampsites)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isArray(res.body);
					expect(res.body).to.eql(nocampsites.expected);

					done();
				});
		});

		it('get when we have no sites in the collection - interval', (done) => {
			request(app)
				.post('/api/camp/search?interval=1')
				.send(nocampsites)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isArray(res.body);
					expect(res.body).to.eql(nocampsites.expected);

					done();
				});
		});

		it('get all campsites when none are reserved - linear', (done) => {
			request(app)
				.post('/api/camp/search')
				.send(noReservations)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isArray(res.body);
					expect(res.body).to.eql(noReservations.expected);

					done();
				});
		});

		it('get all campsites when none are reserved - interval', (done) => {
			request(app)
				.post('/api/camp/search?interval=1')
				.send(noReservations)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isArray(res.body);
					expect(res.body).to.eql(noReservations.expected);

					done();
				});
		});

		it('get all error out when we have no search dates - linear', (done) => {
			request(app)
				.post('/api/camp/search')
				.send(nosearchdates)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isArray(res.body);
					expect(res.body).to.eql(nosearchdates.expected);

					done();
				});
		});

		it('get all error out when we have no search dates - interval', (done) => {
			request(app)
				.post('/api/camp/search?interval=1')
				.send(nosearchdates)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isArray(res.body);
					expect(res.body).to.eql(nosearchdates.expected);

					done();
				});
		});

		it('gets nothing when we specify no gap rules - linear', (done) => {
			request(app)
				.post('/api/camp/search')
				.send(nogaprules)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isArray(res.body);
					expect(res.body).to.eql(nogaprules.expected);

					done();
				});
		});

		it('gets nothing when we specify no gap rules - interval', (done) => {
			request(app)
				.post('/api/camp/search?interval=1')
				.send(nogaprules)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isArray(res.body);
					expect(res.body).to.eql(nogaprules.expected);

					done();
				});
		});

		it('gets an invalid response when a date NaN - linear', (done) => {
			request(app)
				.post('/api/camp/search')
				.expect(httpStatus.OK)
				.send(zeroOffset)
				.then(res => {
					assert.isArray(res.body);
					expect(res.body).to.eql(zeroOffset.expected);

					done();
				});
		});

		it('gets an exception when offset is 0 - interval', (done) => {
			request(app)
				.post('/api/camp/search?interval=1')
				.send(zeroOffset)
				.expect(httpStatus.INTERNAL_SERVER_ERROR)
				.then(res => {
					expect(res.body.message).to.equal('Internal Server Error');
					done();
				});
		});

		it('gets an exception when nothing is sent into the linear search - linear', (done) => {
			request(app)
				.post('/api/camp/search')
				.expect(httpStatus.INTERNAL_SERVER_ERROR)
				.then(res => {
					expect(res.body.message).to.equal('Internal Server Error');
					done();
				});
		});

		it('gets an exception when nothing is sent - interval', (done) => {
			request(app)
				.post('/api/camp/search?interval=1')
				.expect(httpStatus.INTERNAL_SERVER_ERROR)
				.then(res => {
					expect(res.body.message).to.equal('Internal Server Error');
					done();
				});
		});
	});
});
