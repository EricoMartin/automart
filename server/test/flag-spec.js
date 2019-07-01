import { expect, assert } from 'chai';
import flag from './mock_db/flags';
import Flag from '../models/flag.js';

describe('Test Flag Endpoint', () => {
    describe('Create Flag Endpoint', () => {
	    it('should create a flag', () => {
          const flagData = {
          	 id: 1,
             car_id: 2, 
             created_on: '10/10/2018',
             reason: 'fraudulent',
             description: 'fake advert'
          };
          const newFlag = Flag.createFlag(flagData);
          expect(newFlag).to.have.property('id');
          expect(newFlag).to.have.property('car_id');
          expect(newFlag).to.have.property('reason');
          expect(newFlag).to.have.property('description');
          expect(flag.id).to.equal(flagData.id);
          expect(newFlag.car_id).to.be.a('number');
          expect(newFlag.reason).to.be.a('string');
          expect(newFlag.description).to.be.a('string');
          assert.isNumber(newFlag.id, 'ID is not a number');
          assert.isNumber(newFlag.car_id, 'Car ID is not a number');
          assert.isString(newFlag.reason, 'Reason is not a string');
          assert.isString(newFlag.description, 'Description is not a string');
	    });
	});

	describe('car_id must be  a number', () => {
	    it('should return error if a car_id is not a number', () => {
	    	const badFlag = {
	    		id:8,
	    		car_id: 'abc',
	    		created_on: '10/10/2018',
                reason: 'fraudulent',
                description: 'fake advert'
	    	}
	    	const wrongFlag = Flag.createFlag(badFlag);
	    	assert.isNumber(wrongFlag.car_id, 'Car Id must be a number');
	    });
	    it('should return error if a car_id is empty', () => {
	    	assert.isNotEmpty(wrongFlag.car_id, 'Car Id must not be empty')
	    });
	});
    describe('reason must not be empty', () => {
	    it('Should return an error message if reason is empty', () => {
	    	const flagData = {
          	 id: 1,
             car_id: 2, 
             created_on: '10/10/2018',
             reason: '',
             description: 'fake advert'
          };
          assert.isNotEmpty(flagData.reason, 'Reason must not be empty');
	    });
	});
	describe('description must not be empty', () => {
	    it('Should return an error message if description is empty', () => {
	    	const flagData = {
          	 id: 1,
             car_id: 2, 
             created_on: '10/10/2018',
             reason: 'fraudulent',
             description: ''
          };
          assert.isNotEmpty(flagData.description, 'description must not be empty');

	    });
	});
});