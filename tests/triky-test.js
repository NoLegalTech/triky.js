var chai = require('chai');
var expect = chai.expect;
var triky = require('./../index.js');

var now = require('moment')().format('X');

describe('triky', function() {

  it('getExpirationTime() should return the expiration time', function() {
    expect(triky.getExpirationTime({
        expiry: now
    }).expirationTime).to.equal(' 1 s ');
  });

});
