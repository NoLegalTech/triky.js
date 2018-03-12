"use strict";

var phantom = require('phantom'),
    _ph,
    _page,
    _outObj 
;

module.exports = {};

module.exports.grab = function triky(url, callback) {

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
                    _outObj,
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
                resolve(cookies);
                return callback(cookies);
            })
            .catch(function(err) {
                _page.close();
                _ph.exit();
            });

    });

}
