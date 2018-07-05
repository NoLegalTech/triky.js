/*jslint node: true */
/*global
it, describe
*/
"use strict";

var chai = require('chai');
var expect = chai.expect;
var triky = require('./../index.js');

var now = require('moment')().format('X');

var addSeconds = function (moment, seconds) {
    return parseInt(moment) + seconds;
};

describe('triky', function () {

    describe('getExpirationTime() should return the expiration time', function () {

        it('1 s', function () {
            expect(
                triky.getExpirationTime({expiry: now}).expirationTime
            ).to.equal(' 1 s ');
        });

        it('1 min', function () {
            expect(
                triky.getExpirationTime({expiry: addSeconds(now, 59)}).expirationTime
            ).to.equal(' 1 min ');
        });

        it('1 min 1 s', function () {
            expect(
                triky.getExpirationTime({expiry: addSeconds(now, 60)}).expirationTime
            ).to.equal(' 1 min  1 s ');
        });

        it('1 h', function () {
            expect(
                triky.getExpirationTime({expiry: addSeconds(now, 3599)}).expirationTime
            ).to.equal(' 1 h ');
        });

        it('1 h 1 min 1 s', function () {
            expect(
                triky.getExpirationTime({expiry: addSeconds(now, 3660)}).expirationTime
            ).to.equal(' 1 h  1 min  1 s ');
        });

        it('1 day', function () {
            expect(
                triky.getExpirationTime({expiry: addSeconds(now, 3600 * 24 - 1)}).expirationTime
            ).to.equal(' 1 day ');
        });

        it('45 days', function () {
            expect(
                triky.getExpirationTime({expiry: addSeconds(now, 45 * 3600 * 24 - 1)}).expirationTime
            ).to.equal(' 45 days ');
        });

        it('364 days 23 h 59 min 59 s', function () {
            expect(
                triky.getExpirationTime({expiry: addSeconds(now, 365 * 3600 * 24 - 2)}).expirationTime
            ).to.equal(' 364 days  23 h  59 min  59 s ');
        });

        it('1 year', function () {
            expect(
                triky.getExpirationTime({expiry: addSeconds(now, 365 * 3600 * 24 - 1)}).expirationTime
            ).to.equal(' 1 year ');
        });

        it('2 years', function () {
            expect(
                triky.getExpirationTime({expiry: addSeconds(now, 2 * 365 * 3600 * 24 - 1)}).expirationTime
            ).to.equal(' 2 years ');
        });

    });

});
