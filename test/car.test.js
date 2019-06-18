import chai, { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import {carDetail, testMakeDetail, updatePrice} from './dummy-db';


chai.use(chaiHttp);


describe('Create a car AD', () => {
  it('should create a new car with all details', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-type': 'application/json',
      })
      .send(carDetail)
      .end((err, res) => {
       expect(res.statusCode).to.equal(201);
       expect(res.body.status).to.equal(201);
       expect(res.body).to.be.an('object');
       expect(res.body.data).to.be.an('object');
       expect(res.body.data).to.have.property('object');
       assert.strictEqual(res.statusCode, 201, 'Status code is not 201');
       assert.strictEqual(res.body.status, 201, 'Status is not 201');
       assert.isNumber(res.body.data.id, 'id', 'enter the car id');
       assert.isNumber(res.body.data.owner, 'owner', 'enter the owner id');
       assert.property(res.body.data.createdOn, 'createdOn', 'enter date of post ad');
       assert.isString(res.body.data.make, 'make' ,'enter make of car');       
       assert.isString(res.body.data.model, 'model', 'enter model of car');
       assert.isNumber(res.body.data.price, 'price', 'enter price of car');
       assert.isString(res.body.data.status, 'status', 'enter status of car');
       assert.isString(res.body.data.bodytype, 'bodytype', 'enter bodytype of car');
       assert.isNumber(res.body.data.year, 'year', 'enter the year of car');
   });
  }),
  it('should return an error if make is not provided', (done) => {
    chai
      .request(app)
      .post('/api/v1//car')
      .send(testMakeDetail[2])
      .set({
        'Content-type': 'application/json',
      })
      .end((err, res) => {
       expect(res.body).have.status(400);
   	   expect(res.statusCode).to.equal(400);
       expect(res.body.status).to.equal(300);
       expect(res.body).to.be.an('object');
       expect(res.body.data).to.be.an('object');
       expect(res.body.data.make).to.be.a('string');
       expect(res.body.error).to.be.an('object');
       assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Make should not be empty',
          'Expect error to be Make should not be empty');
        assert.isNotNull(err, 'unexpected error');
        done();
      });
  }),   

it('should return an error if model is not provided', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .send(testMakeDetail[2])
      .set({
        'Content-type': 'application/json',
      })
      .end((err, res) => {
       expect(res.body).have.status(400);
   	   expect(res.statusCode).to.equal(400);
       expect(res.body.status).to.equal(300);
       expect(res.body).to.be.an('object');
       expect(res.body.data).to.be.an('object');
       expect(res.body.data.make).to.be.a('string');
       expect(res.body.error).to.be.an('object');
       assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Model should not be empty',
          'Expect error to be model should not be empty');
        assert.isNotNull(err, 'unexpected error');
        done();
      });
  }), 
  it('should return an error if incorrect car status is provided', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .send(testMakeDetail[0])
      .set({
        'Content-type': 'application/json',
      })
      .end((err, res) => {
        expect(res.body).have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.be.a('object');
        expect(res.body.error).to.have.property('status');
        expect(res.body.error.state).to.equal('The valid options are either New, new, NEW or Old, old, OLD',);
        done();
      });
  }),
  it('should return an error if incorrect bodytpe is provided', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .send(testMakeDetail[1])
      .set({
        'Content-type': 'application/json',
      })
      .end((err, res) => {
       expect(res.body).have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.be.a('object');
        expect(res.body.error).to.have.property('bodytype');
        expect(res.body.error.bodytype).to.equal('The valid options are saloon, wagon and suv');
        done();
      });
  });


describe('Get a car', () => {
  it('should get an available car present in db', (done) => {
    chai
      .request(app)
      .get('/api/v1/car')
      .set({
        'Content-type': 'application/json',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('owner');
        expect(res.body.data).to.have.property('createdOn');
        expect(res.body.data).to.have.property('make');
        expect(res.body.data).to.have.property('model');
        expect(res.body.data).to.have.property('price');
        expect(res.body.data).to.have.property('state');
        expect(res.body.data).to.have.property('bodyType');
        expect(res.body.data).to.have.property('year');
        done();
      });
  });
  it('should return an error if the car is not in the db', (done) => {
    chai
      .request(app)
      .get('/api/v1/car')
      .set({
        'Content-type': 'application/json',
      })
      .end((err, res) => {
         expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.equal("The requested car is not available");
        done();
      });
  });
  it('should return an error if the ID is not a number', (done) => {
    chai
      .request(app)
      .get('/api/v1/car')
      .set({
        'Content-type': 'application/json',
      })
      .end((err, res) => {
         expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('The ID must contain numbers');
        done();
      });
  });
});

describe('Get all cars', () => {
  it('should get all the cars in the db', (done) => {
    chai
      .request(app)
      .get('/api/v1/car')
      .set({
        'Content-type': 'application/json',
      })
      .end((err, res) => {

       	expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.be.an('object');
        done();
      });
  });
});


  it('should display an error 404 message if car is not available', (done) => {
    chai
      .request(app)
      .delete('/api/v1/car/190')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.be.equal('The requested car is not available');
        done();
      });
  });


it('Should return an error message if price is not a number', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-Type': 'multipart/form-data',
        
      })

      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Enter a valid price');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error, 'Enter a valid price');
        assert.isNull(err, 'Unexpected error');
        done();
      });
  });

it('Should update car AD price', (done) => {
    chai
      .request(app)
      .patch('/api/v1/car/carDetail/price')
      .set({'Content-Type': 'application/json'})
      .send(updatePrice[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.be.equal(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.id).to.be.a('number');
        expect(res.body.data.created_on).to.be.a('string');
        expect(res.body.data.email).to.be.a('string');
        expect(res.body.data.make).to.be.a('string');
        expect(res.body.data.model).to.be.a('string');
        expect(res.body.data.price).to.be.a('number');
        expect(res.body.data.state).to.be.a('string');
        expect(res.body.data.status).to.equal('available');
        expect(res.body.data.year).to.be.a('number');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.strictEqual(res.body.status, 200, 'Status is not 200');
        assert.isObject(res.body, 'Response is not an object');
        assert.isObject(res.body.data, 'Data is not an object');
        assert.isNumber(res.body.data.id, 'ID is not a number');
        assert.isString(res.body.data.created_on, 'Date is not a string');
        assert.isString(res.body.data.manufacturer, 'Manufacturer is not a string');
        assert.isString(res.body.data.model, 'Model is not a string');
        assert.strictEqual(res.body.data.status, 'available', 'Status is not available');
        assert.isNumber(res.body.data.price, 'Price is not a number');
        assert.isString(res.body.data.state, 'State is not a string');
        assert.isNumber(res.body.data.year, 'Year is not a number');
        assert.isNull(err, 'Unexpected error');
        done();
      });
});

it('Should return all unsold cars of a specific manufacturer', (done) => {
    chai
      .request(app)
      .get('/api/v1/car')
      .query({
        status: 'available',
        manufacturer: 'Toyota',
      })
      .set({
        'Content-Type': 'application/json'
        })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.isObject(res.body, 'Response is not an object');
        assert.isArray(res.body.data, 'Data is not array');
        assert.isNull(err, 'unexpected error');
        done();
      });
});
it('Should delete an AD if user is an admin', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/car/${carAd.id}`)
      .set({
        'Content-Type': 'application/json'
         })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.equal('Car Ad successfully deleted');
        expect(res.body.data).to.be.a('string');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.isString(res.body.data, 'Data is not a string');
        assert.strictEqual(res.body.data,
          'Car Ad successfully deleted',
          'Data is not equal to Car Ad successfully deleted');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return a message if record is not found', (done) => {
    chai
      .request(app)
      .delete('/api/v1/car/11111045')
      .set({
        'Content-Type': 'application/json'
    	})
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.equal('No record found');
        expect(res.body.data).to.be.a('string');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 200);
        assert.isString(res.body.data, 'Data is not a string');
        assert.strictEqual(res.body.data,
          'No record found',
          'Data is not available');
        assert.isNull(err, 'Unexpected error');
        done();
      });
  });

  it('Should return an error if user is not an admin', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/car/${carAd.id}`)
      .set({
        'Content-Type': 'application/json'})
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.be.equal('Forbidden: Only Admin can delete an AD');
        expect(res.body.error).to.be.a('string');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 403);
        assert.isString(res.body.error, 'Data is not a string');
        assert.strictEqual(res.body.error,
          'Forbidden: Only Admin user can delete an AD',
          'Only Admin user can delete an AD');
        assert.isNull(err, 'Unexpected error');
        done();
      });
  });
});
describe('DELETE a car', () => {
  it('should remove a car and display a success message', (done) => {
    chai
      .request(app)
      .delete('/api/v1/car3')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.property('message');
        expect(res.body.data).to.have.property('car');
        expect(res.body.data.message).to.equal('Car Ad has been deleted succesfully');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('owner');
        expect(res.body.data).to.have.property('createdOn');
        expect(res.body.data).to.have.property('make');
        expect(res.body.data).to.have.property('model');
        expect(res.body.data).to.have.property('price');
        expect(res.body.data).to.have.property('state');
        expect(res.body.data).to.have.property('bodyType');
        expect(res.body.data).to.have.property('year');
        done();
      });
  });
});
  



