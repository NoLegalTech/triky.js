var phantom = require('phantom'),
    cTable = require('console.table'),
    address,
    _output = {
        'cookies': [],
        'resources': {
            'js': []
        }
    };

if (process.argv.length === 2) {
    console.log('Usage: node grab_cookies.js <some URL>');
    process.exit(-1);
}

address = process.argv[2];

var _ph, _page, _outObj;

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
        var url = address;
        return page.open(url);
    })
    .then(function(status) {
        return _outObj.property('cookies');
    })
    .then(function(cookies) {
        console.table(cookies);
        return _page.close();
    })
    .then(function() {
        return _ph.exit();
    })
    .catch(function(err) {
        _page.close();
        _ph.exit();
    });
