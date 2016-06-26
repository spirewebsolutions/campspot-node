import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai from 'chai';
import app from '../../index';
import mocha from 'mocha';

chai.config.includeStack = true;

const expect = chai.expect;
const assert = chai.assert;
import initialReservation from './data/camp/initial.json';
import noReservations from './data/camp/noreservations.json';
import noneAvailable from './data/camp/noneavailablegaptwo.json';
import nosearchdates from './data/camp/nosearchdates.json';
import nogaprules from './data/camp/nogaprules.json';
import noneavailableleftoverlap from './data/camp/noneavailableleftoverlap.json';
import noneavailablealloverlap from './data/camp/noneavailablealloverlap.json';
import startandendbackwards from './data/camp/startandendbackwards.json';

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
					assert.isObject(res.body);
					done();
				});
		});

		it('get available campsites with initial data set and Interval Tree Search', (done) => {
			request(app)
				.post('/api/camp/search?interval=1')
				.send(initialReservation)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isObject(res.body);
					done();
				});
		});

		it('get available campsites with backward start/end search data - linear', (done) => {
			request(app)
				.post('/api/camp/search')
				.send(startandendbackwards)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isObject(res.body);
					done();
				});
		});

		it('get available campsites with backward start/end search data - interval', (done) => {
			request(app)
				.post('/api/camp/search?interval=1')
				.send(startandendbackwards)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isObject(res.body);
					done();
				});
		});

		it('get no campsites when none are available', (done) => {
			request(app)
				.post('/api/camp/search')
				.send(noneAvailable)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isObject(res.body);
					done();
				});
		});

		it('get no campsites when none are available', (done) => {
			request(app)
				.post('/api/camp/search?interval=1')
				.send(noneAvailable)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isObject(res.body);
					done();
				});
		});

		it('get no campsites because of left only overlap for linear', (done) => {
			request(app)
				.post('/api/camp/search')
				.send(noneavailableleftoverlap)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isObject(res.body);
					done();
				});
		});

		it('get no campsites because of left only overlap for interval', (done) => {
			request(app)
				.post('/api/camp/search?interval=1')
				.send(noneavailableleftoverlap)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isObject(res.body);
					done();
				});
		});

		it('get no campsites when none are available because of overlap for linear', (done) => {
			request(app)
				.post('/api/camp/search')
				.send(noneavailablealloverlap)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isObject(res.body);
					done();
				});
		});

		it('get no campsites when none are available because of overlap for interval', (done) => {
			request(app)
				.post('/api/camp/search?interval=1')
				.send(noneavailablealloverlap)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isObject(res.body);
					done();
				});
		});

		it('get all campsites when none are reserved', (done) => {
			request(app)
				.post('/api/camp/search')
				.send(noReservations)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isObject(res.body);
					done();
				});
		});

		it('get all campsites when none are reserved', (done) => {
			request(app)
				.post('/api/camp/search?interval=1')
				.send(noReservations)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isObject(res.body);
					done();
				});
		});

		it('get all error out when we have no search dates', (done) => {
			request(app)
				.post('/api/camp/search')
				.send(nosearchdates)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isObject(res.body);
					done();
				});
		});

		it('get all error out when we have no search dates', (done) => {
			request(app)
				.post('/api/camp/search?interval=1')
				.send(nosearchdates)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isObject(res.body);
					done();
				});
		});

		it('gets nothing when we specify no gap rules', (done) => {
			request(app)
				.post('/api/camp/search')
				.send(nogaprules)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isObject(res.body);
					expect(res.body).to.eql({});

					done();
				});
		});

		it('gets nothing when we specify no gap rules', (done) => {
			request(app)
				.post('/api/camp/search?interval=1')
				.send(nogaprules)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isObject(res.body);
					expect(res.body).to.eql({});

					done();
				});
		});

		it('gets an exception when nothing is sent into the linear search', (done) => {
			request(app)
				.post('/api/camp/search')
				.expect(httpStatus.INTERNAL_SERVER_ERROR)
				.then(res => {
					expect(res.body.message).to.equal('Internal Server Error');
					done();
				});
		});

		it('gets an exception when nothing is sent into the interval tree search', (done) => {
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

