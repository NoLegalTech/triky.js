"use strict";

var moment = require('moment');

var phantom = require('phantom'),
    _ph,
    _page,
    _outObj 
;

var Triky = function() {

    var self = this;

    self.getExpirationTime = function(cookie) {
        var now = moment().format('X');
        var secs = cookie.expiry - now + 1;
        var mins = 0;
        var hours = 0;
        var days = 0;
        var years = 0;
        if (secs >= 60) {
            mins = Math.floor(secs / 60);
            secs = secs % 60;
            if (mins >= 60) {
                hours = Math.floor(mins / 60);
                mins = mins % 60;
                if (hours >= 24) {
                    days = Math.floor(hours / 24);
                    hours = hours % 24;
                    if (days >= 365) {
                        years = Math.floor(days / 365);
                        days = days % 365;
                    }
                }
            }
        }
        cookie.expirationTime = '';
        if (years > 1) {
            cookie.expirationTime = cookie.expirationTime + years + ' years ';
        } else if (years == 1) {
            cookie.expirationTime = cookie.expirationTime + ' 1 year ';
        }
        if (days > 1) {
            cookie.expirationTime = cookie.expirationTime + days + ' days ';
        } else if (days == 1) {
            cookie.expirationTime = cookie.expirationTime + ' 1 day ';
        }
        if (hours > 1) {
            cookie.expirationTime = cookie.expirationTime + hours + ' h ';
        } else if (hours == 1) {
            cookie.expirationTime = cookie.expirationTime + ' 1 h ';
        }
        if (mins > 1) {
            cookie.expirationTime = cookie.expirationTime + mins + ' min ';
        } else if (mins == 1) {
            cookie.expirationTime = cookie.expirationTime + ' 1 min ';
        }
        if (secs > 1) {
            cookie.expirationTime = cookie.expirationTime + secs + ' s ';
        } else if (secs == 1) {
            cookie.expirationTime = cookie.expirationTime + ' 1 s ';
        }
        return cookie;
    };

    self.grab = function(url, callback) {
        return new Promise((resolve, reject) => {

            phantom.create()
                .then(function(ph) {
                    _ph = ph;
                    return ph.createPage();
                })
                .then(function(page) {
                    _page = page;
                    _outObj = _ph.createOutObject();

                    _outObj.urls = [];
                    _outObj.cookies = [];

                    page.property(
                        'onResourceRequested',
                        function(requestData, networkRequest, out) {
                            out.urls.push(requestData.url);
                            out.cookies = phantom.cookies;
                        },
                        _outObj
                    );

                    page.on(
                        'onResourceError',
                        function(error) {
                            console.error(JSON.stringify(error));
                        }
                    );

                    return page.open(url);
                })
                .then(function(status) {
                    if (status == 'fail') {
                        reject('Invalid url');
                        return callback('Invalid url');
                    }
                    return _outObj.property('cookies');
                })
                .then(function(cookies) {
                    _ph.exit();
                    var result = [];
                    cookies.forEach(function(cookie) {
                        result.push(self.getExpirationTime(cookie));
                    });
                    resolve(result);
                    return callback(cookies);
                })
                .catch(function(err) {
                    _ph.exit();
                });

        });
    };

    return self;

};

module.exports = new Triky();
