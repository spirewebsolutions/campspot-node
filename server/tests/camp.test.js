import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai from 'chai';
import { describe } from 'mocha/mocha';
import app from '../../index';
import initialReservation from './data/camp/initial.json';

// set chain/mocha config
chai.config.includeStack = true;
const expect = chai.expect;

// descript camp search endpoint
describe('## Camp Search EndPoint', () => {
	describe('# POST /api/search', () => {
		it('get available campsites', (done) => {
			request(app)
				.post('/api/camp/search')
				.send(initialReservation)
				.expect(httpStatus.OK)
				.then(res => {
					expect(res.body.username).to.equal('');
					expect(res.body.mobileNumber).to.equal('');
					done();
				});
		});
	});
});
