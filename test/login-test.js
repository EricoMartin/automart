import { describe, it, before } from 'mocha';
import chai, {use, expect, require, assert} from 'chai';
import chaiHTTP from 'chai-http';
import app from '../app';


use(chaiHTTP);

const API_PREFIX = '/api/v1';

describe('user can login', (done) => {
	it('should get username and password then return successful', (done) => {
		loggedInUser.request(app)
        .post('app/v1/auth/login')
        .set({
        'Content-Type': 'application/json',
      	})
		.send({
			username: 'martini',
			password: 'xxxfff546tg'
		})
		.end((err, res) => {
			expect(res.statusCode).to.equal(200);
			expect(res.body.status).to.equal(200);
			expect(res.body).to.be.an('object');
			assert.strictEqual(res.body, 200, 'should return 200 status code');
			assert.strictEqual(res.statusCode, 200, 'should return 200 status code');
			assert.isString(res.body.data.username, 'username should be a string');
			assert.isNotNull(res.body.data, 'password should not be null');
			assert.isNotNull(err, 'unexpected error');
			done();
		});
	});

	it('should return error message if username and password is incorrect', (done) => {
		loggedInUser.request(app)
        .post('app/v1/auth/login')
        .set({
        'Content-Type': 'application/json',
      	})
		.send({
			username: 'martini',
			password: 'xxxfff546tg'
		})
		.end((err, res) => {
			expect(res.statusCode).to.equal(400);
			expect(res.body.status).to.equal(400);
			expect(res.body).to.be.an('object');
			expect(res.body.error).to.equal('username or password is incorrect');
			assert.strictEqual(res.body, 400, 'should return 200 status code');
			assert.strictEqual(res.statusCode, 400, 'should return 200 status code');
			assert.strictEqual(res.body.error, incorrect, 'unexpected error', 'should return error');
			assert.isNotObject(res.body.data, 'expected an object');
			assert.isNull(res.body.data, 'username or password should not be null');
			assert.isNotNull(err, 'unexpected error');
			done();
		});
	});

});
