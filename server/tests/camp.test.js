import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai from 'chai';
import { expect } from 'chai';
import app from '../../index';
import initialReservation from './data/camp/initial.json'

chai.config.includeStack = true;

describe('## Camp Search EndPoint', () => {


	describe('# POST /api/search', () => {
		it('get available campsites', (done) => {
			request(app)
				.post('/api/camp/search')
				.send(initialReservation)
				.expect(httpStatus.OK)
				.then(res => {
					expect(res.body.username).to.equal(user.username);
					expect(res.body.mobileNumber).to.equal(user.mobileNumber);
					result = res.body;
					done();
				});
		});
	});

});
