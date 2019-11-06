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

        var time_units = [
            { unit: 's',    plural: 's',     value: 1 },
            { unit: 'min',  plural: 'min',   value: 60 },
            { unit: 'h',    plural: 'h',     value: 60 * 60 },
            { unit: 'day',  plural: 'days',  value: 60 * 60 * 24 },
            { unit: 'year', plural: 'years', value: 60 * 60 * 24 * 365 }
        ];

        var time_unit = time_units.pop();

        cookie.expirationTime = '';

        if (secs == 1) {
            cookie.expirationTime = '1 s';
        } else {
            while (secs > 1) {
                var num_units = Math.floor(secs / time_unit.value);
                if (num_units > 0) {
                    cookie.expirationTime += ' '
                        + num_units
                        + ' '
                        + (num_units == 1 ? time_unit.unit : time_unit.plural)
                        + ' ';
                    secs -= num_units * time_unit.value;
                }
                time_unit = time_units.pop();
            }
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

                    _outObj.input = {
                        url: url
                    };

                    _outObj.result = {
                        urls: {
                            internal: [],
                            external: []
                        },
                        resources: {
                            internal: [],
                            external: []
                        },
                        cookies: [],
                        google_analytics: false,
                        forms: []
                    };

                    page.property(
                        'onResourceRequested',
                        function(requestData, networkRequest, out) {
                            var analyticsUrl = new RegExp('^http(s)?://(www|ssl)\.google-analytics\.com.*');
                            var sameDomainUrl = new RegExp(out.input.url + '.*');

                            if (analyticsUrl.test(requestData.url)){
                                out.result.google_analytics = true;
                            }

                            if (sameDomainUrl.test(requestData.url)){
                                out.result.resources.internal.push(requestData.url);
                            } else {
                                out.result.resources.external.push(requestData.url);
                            }

                            out.result.cookies = phantom.cookies;
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
                    return _outObj.property('result');
                    //return {
                        //cookies: _outObj.property('cookies')
                    //};
                })
                .then(function(result) {
                    var final_cookies = [];
                    result.cookies.forEach(function(cookie) {
                        final_cookies.push(self.getExpirationTime(cookie));
                    });
                    result.cookies = final_cookies;
                    _ph.exit();
                    resolve(result);
                    return callback(result);
                })
                .catch(function(err) {
                    _ph.exit();
                });

        });
    };

    return self;

};

module.exports = new Triky();
