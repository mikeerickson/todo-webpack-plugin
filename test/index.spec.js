

var chai   = require('chai')
var expect = chai.expect;
var should = chai.should();
var assert = chai.assert;
var todo   = require('../index')

describe('todo-webpack-plugin', function () {

  it('should pass', function (done) {
    assert(true, true);
    done();
  });

  it('pass: expect', function (done) {
    expect(true).to.be.true;
    done();
  });

  it('pass: should', function (done) {
    true.should.be.true;
    done();
  });

  it('should pass', function (done) {
    true.should.be.true
    done();
  });

});
