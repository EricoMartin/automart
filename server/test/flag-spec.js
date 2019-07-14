import { expect, assert } from 'chai';
import flag from './mock_db/flags';
import Flag from '../models/flag';

describe('Test Flag Endpoint', () => {
  describe('Create Flag Endpoint', () => {
    it('should create a flag', () => {
      const flagData = {
        id: 1,
        car_id: 2,
        created_on: '10/10/2018',
        reason: 'fraudulent',
        description: 'fake advert',
        status: 'pending',
      };
      const newFlag = Flag.createdFlag(flagData);
      expect(newFlag).to.have.property('id');
      expect(newFlag).to.have.property('car_id');
      expect(newFlag).to.have.property('reason');
      expect(newFlag).to.have.property('description');
      expect(flag[0].id).to.equal(flagData.id);
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
        id: 8,
        car_id: 60,
        created_on: '10/10/2018',
        reason: 'fraudulent',
        description: 'fake advert',
        status: 'pending',
      };
      const wrongFlag = Flag.createdFlag(badFlag);
      assert.isNumber(wrongFlag.car_id, 'Car Id must be a number');
    });
    it('should return error if a car_id is empty', () => {
      const badFlag = {
        id: 8,
        car_id: '7',
        created_on: '10/10/2018',
        reason: 'fraudulent',
        description: 'fake advert',
        status: 'pending',
      };
      const wrongFlag = Flag.createdFlag(badFlag);
      assert.isNotEmpty(wrongFlag.car_id, 'Car Id must not be empty');
    });
  });
  describe('reason must not be empty', () => {
    it('Should return an error message if reason is empty', () => {
      const flagData = {
        id: 1,
        car_id: 2,
        created_on: '10/10/2018',
        reason: 'fraudulent',
        description: 'fake advert',
        status: 'pending',
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
        description: 'fake',
        status: 'pending',
      };
      assert.isNotEmpty(flagData.description, 'description must not be empty');
    });
  });

  describe('Update a flag status', () => {
    it('should update a given flag status to resolved', () => {
      flag[0].status = 'pending';
      Flag.flags = flag;
      const flagId = flag[0].id;

      const flagstatus = Flag.updateFlagStatus(flagId);
      expect(flagstatus).to.have.property('id').eq(flag[0].id);
      expect(flagstatus).to.have.property('car_id').eq(flag[0].car_id);
      expect(flagstatus).to.have.property('status').eq('resolved');
    });
  });
  describe('Deletes a flag', () => {
    it('should delete a given flag', () => {
      Flag.flags = flag;
      const { length } = flag;
      const flagdata = flag[0];

      Flag.deleteFlag(flagdata);
      const res = Flag.findFlag(flag.id);
      expect(res).to.eq(undefined);
      expect(flag.length).to.eq(length - 1);
    });
  });
});
