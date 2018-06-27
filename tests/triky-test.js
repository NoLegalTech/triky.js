var chai = require('chai');
var expect = chai.expect;
var triky = require('./../index.js');

var now = require('moment')().format('X');

var addSeconds = function(moment, seconds) {
    return parseInt(moment) + seconds;
};

describe('triky', function() {

  it('getExpirationTime() should return the expiration time', function() {
    expect(
        triky.getExpirationTime({ expiry: now }).expirationTime
    ).to.equal(' 1 s ');

    expect(
        triky.getExpirationTime({ expiry: addSeconds(now, 59) }).expirationTime
    ).to.equal(' 1 min ');

    expect(
        triky.getExpirationTime({ expiry: addSeconds(now, 60) }).expirationTime
    ).to.equal(' 1 min  1 s ');

    expect(
        triky.getExpirationTime({ expiry: addSeconds(now, 3599) }).expirationTime
    ).to.equal(' 1 h ');

    expect(
        triky.getExpirationTime({ expiry: addSeconds(now, 3660) }).expirationTime
    ).to.equal(' 1 h  1 min  1 s ');

    expect(
        triky.getExpirationTime({ expiry: addSeconds(now, 3600 * 24 - 1) }).expirationTime
    ).to.equal(' 1 day ');

    expect(
        triky.getExpirationTime({ expiry: addSeconds(now, 45 * 3600 * 24 - 1) }).expirationTime
    ).to.equal(' 45 days ');

    expect(
        triky.getExpirationTime({ expiry: addSeconds(now, 365 * 3600 * 24 - 2) }).expirationTime
    ).to.equal(' 364 days  23 h  59 min  59 s ');

    expect(
        triky.getExpirationTime({ expiry: addSeconds(now, 365 * 3600 * 24 - 1) }).expirationTime
    ).to.equal(' 1 year ');

    expect(
        triky.getExpirationTime({ expiry: addSeconds(now, 2 * 365 * 3600 * 24 - 1) }).expirationTime
    ).to.equal(' 2 years ');
  });

});
