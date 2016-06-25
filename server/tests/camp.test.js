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
import noneAvailable from './data/camp/noneavailable.json';
import nosearchdates from './data/camp/nosearchdates.json';
import nogaprules from './data/camp/nogaprules.json';

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
					//expect(res.body['2']).to.equal(user.username);

					assert.isObject(res.body);

//					result = res.body;
					done();
				});
		});

		it('get available campsites with initial data set and Interval Tree Search', (done) => {
			request(app)
				.post('/api/camp/search?interval=1')
				.send(initialReservation)
				.expect(httpStatus.OK)
				.then(res => {
					//expect(res.body['2']).to.equal(user.username);

					assert.isObject(res.body);

//					result = res.body;
					done();
				});
		});

		it('get no campsites when none are available', () => {
			request(app)
				.post('/api/camp/search')
				.send(noneAvailable)
				.expect(httpStatus.OK);
		});

		it('get all campsites when none are reserved', () => {
			request(app)
				.post('/api/camp/search')
				.send(noReservations)
				.expect(httpStatus.OK);
		});

		it('get all error out when we have no search dates', () => {
			request(app)
				.post('/api/camp/search')
				.send(nosearchdates)
				.expect(httpStatus.OK);
		});

		it('gets nothing when we specify no gap rules', () => {
			request(app)
				.post('/api/camp/search')
				.send(nogaprules)
				.expect(httpStatus.OK);
		});

		it('gets an exception when nothing is sent in', () => {
			request(app)
				.post('/api/camp/search')
				.expect(httpStatus.INTERNAL_SERVER_ERROR)
				.raises();
		});
	});
});

