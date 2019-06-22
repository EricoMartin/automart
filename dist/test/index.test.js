"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

_chai["default"].use(_chaiHttp["default"]);

describe('Test API v1 Endpoint', function () {
  it('should return error if endpoint does not exist', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1/not').set({
      'Content-type': 'application/json'
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.statusCode).to.equal(404);
      (0, _chai.expect)(res.body.status).to.equal(404);

      _chai.assert.isObject(res.body, 'Response is not an object');

      _chai.assert.strictEqual(res.statusCode, 404, 'Status code is not 404');

      _chai.assert.strictEqual(res.body.status, 404, 'Status is not be 404');

      _chai.assert.strictEqual(res.body.error, 'Not Found');

      _chai.assert.isNull(err, 'Expect error to not exist');

      done();
    });
  });
  it('should return success if endpoint exist', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1').set({
      'Content-type': 'application/json'
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body.message).to.equal('Welcome to Automart API');
      (0, _chai.expect)(res.body.status).to.equal('success');

      _chai.assert.isObject(res.body, 'Expect response to be an object');

      _chai.assert.strictEqual(res.statusCode, 200, 'Status code should be 200');

      _chai.assert.strictEqual(res.body.status, 'success', 'Status code should be success');

      _chai.assert.strictEqual(res.body.message, 'Welcome to Automart API', 'Message should be Welcome to Automart API');

      _chai.assert.isNull(err, 'Expect error to not exist');

      done();
    });
  });
});