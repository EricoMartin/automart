import chai from 'chai';
import usersData from './mock_db/users';
import User from '../models/user';

const { expect } = chai;

describe('user Endpoint', () => {
  describe('user can signup', () => {
    it('should create user account', () => {
      const data = {
        id: 1,
        first_name: 'Jason',
        last_name: 'Trello',
        email: 'jason@gmail.com',
        password: '555SSS777',
        address: '321 upper crest park, New York, USA',
        isAdmin: true,
      };
      const user = User.createUser(data);
      expect(user).to.have.property('id');
      expect(user).to.have.property('email').eq(data.email);
      expect(user.first_name).to.equal(data.first_name);
      expect(user.last_name).to.equal(data.last_name);
    });
  });

  describe('Get all users', () => {
    it('should return all users', () => {
      User.users = usersData;
      const allUsers = User.getAllUsers();
      expect(allUsers).to.be.an('Array');
      expect(allUsers.length).to.eq(usersData.length);
    });
  });

  describe('Get user by first_name', () => {
    it('should return a user\'s first_name', () => {
      User.users = usersData;
      const user = User.findByFirstName('Jason');
      expect(user).to.have.property('first_name').to.eq('Jason');
    });
  });

  describe('Get user by email', () => {
    it('should return a user\'s email', () => {
      User.users = usersData;
      const user = User.findByEmail('jason@gmail.com');
      expect(user).to.have.property('email').to.equal('jason@gmail.com');
    });
  });

  describe('Get a User', () => {
    it('should return a user based on id', () => {
      User.users = usersData;

      const userId = usersData[0].id;
      const user = User.getUser(userId);
      expect(user).to.be.an('Object');
      expect(user).to.have.property('id').eq(usersData[0].id);
    });
  });

  describe('Get Admin User', () => {
    it('should check for an admin', () => {
      User.users = usersData;
      usersData[0].is_admin = true;

      const admin = usersData[0];
      expect(admin).to.be.a('object');
      expect(admin.is_admin).to.equal(true);
    });
  });

  describe('Delete User', () => {
    it('should delete a user', () => {
      usersData[0].status = 'registered';
      User.users = usersData;

      const deletedUser = User.deleteUser(usersData[0]);
      expect(deletedUser.status).to.eq(undefined);
    });
  });

  describe('Log in User', () => {
    it('should login a user', () => {
      usersData[1].status = 'registered';
      User.users = usersData;

      const loggedUser = User.loginUser(usersData[1].id);
      expect(loggedUser[0].id).to.eq(usersData[1].id);
      expect(loggedUser.status).to.eq('loggedIn');
    });
  });
});
