import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai from 'chai';
import app from '../../index';
import mocha from 'mocha';

// grab expect and assert
const expect = chai.expect;
const assert = chai.assert;

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
					assert.isObject(res.body);
					// defined in initial requirement example
					expect(res.body['2']).to.include({ id: 5, name: 'Daniel Boone Bungalow' });
					expect(res.body['2']).to.include({ id: 6, name: 'Teddy Rosevelt Tent Site' });
					expect(res.body['2']).to.include({ id: 8, name: 'Bear Grylls Cozy Cave' });
					expect(res.body['2']).to.include({ id: 9, name: 'Wyatt Earp Corral' });

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
					// defined in initial requirement example
					expect(res.body['2']).to.include({ id: 5, name: 'Daniel Boone Bungalow' });
					expect(res.body['2']).to.include({ id: 6, name: 'Teddy Rosevelt Tent Site' });
					expect(res.body['2']).to.include({ id: 8, name: 'Bear Grylls Cozy Cave' });
					expect(res.body['2']).to.include({ id: 9, name: 'Wyatt Earp Corral' });

					done();
				});
		});

		it('get available campsites with backward start == end search date - linear', (done) => {
			request(app)
				.post('/api/camp/search')
				.send(samedatessearched)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isObject(res.body);
					assert.lengthOf(res.body['2'], 1);
					assert.lengthOf(res.body['3'], 1);

					done();
				});
		});

		it('get available campsites with backward start == end search date - interval', (done) => {
			request(app)
				.post('/api/camp/search?interval=1')
				.send(samedatessearched)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isObject(res.body);
					assert.lengthOf(res.body['2'], 1);
					assert.lengthOf(res.body['3'], 1);

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
					expect(res.body).to.eql({});

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
					expect(res.body).to.eql({});

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
					assert.lengthOf(res.body['2'], 0);
					assert.lengthOf(res.body['3'], 2);

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
					assert.lengthOf(res.body['2'], 0);
					assert.lengthOf(res.body['3'], 2);

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
					assert.lengthOf(res.body['2'], 1);
					assert.lengthOf(res.body['3'], 3);

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
					assert.lengthOf(res.body['2'], 1);
					assert.lengthOf(res.body['3'], 3);

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
					assert.lengthOf(res.body[noReservations.gapRules[0].gapSize], 0);
					assert.lengthOf(res.body[noReservations.gapRules[1].gapSize], 0);
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
					assert.lengthOf(res.body[noReservations.gapRules[0].gapSize], 0);
					assert.lengthOf(res.body[noReservations.gapRules[1].gapSize], 0);
					done();
				});
		});

		it('get when we have no sites in the collection', (done) => {
			request(app)
				.post('/api/camp/search')
				.send(nocampsites)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isObject(res.body);
					expect(res.body).to.eql({});
					done();
				});
		});

		it('get when we have no sites in the collection', (done) => {
			request(app)
				.post('/api/camp/search?interval=1')
				.send(nocampsites)
				.expect(httpStatus.OK)
				.then(res => {
					assert.isObject(res.body);
					expect(res.body).to.eql({});
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
					assert.lengthOf(
						res.body[noReservations.gapRules[0].gapSize],
						noReservations.campsites.length
					);
					assert.lengthOf(
						res.body[noReservations.gapRules[1].gapSize],
						noReservations.campsites.length
					);
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
					assert.lengthOf(
						res.body[noReservations.gapRules[0].gapSize],
						noReservations.campsites.length
					);
					assert.lengthOf(
						res.body[noReservations.gapRules[1].gapSize],
						noReservations.campsites.length
					);
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
					expect(res.body).to.eql({});

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
					expect(res.body).to.eql({});

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

		it('gets an invalid response when a date NaN', (done) => {
			request(app)
				.post('/api/camp/search')
				.expect(httpStatus.OK)
				.send(zeroOffset)
				.then(res => {
					assert.isObject(res.body);
					expect(res.body).to.have.property(zeroOffset.gapRules[0].gapSize);
					expect(res.body).to.have.property(zeroOffset.gapRules[1].gapSize);

					done();
				});
		});

		it('gets an exception when offset is 0', (done) => {
			request(app)
				.post('/api/camp/search?interval=1')
				.send(zeroOffset)
				.expect(httpStatus.INTERNAL_SERVER_ERROR)
				.then(res => {
					expect(res.body.message).to.equal('Internal Server Error');
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
