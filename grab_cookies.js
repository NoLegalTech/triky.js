var page = require('webpage').create(),
    system = require('system'),
    cTable = require('console.table'),
    address,
    _output = {
        'cookies': [],
        'resources': {
            'js': []
        }
    };

if (system.args.length === 1) {
    console.log('Usage: vendor/phantomjs grab_cookies.js <some URL>');
    phantom.exit(-1);
}

page.onResourceReceived = function(response) {
    if (response.contentType && response.contentType.indexOf('javascript') >= 0) {
        if (response.stage == 'start') {
            _output.resources.js.push({ 'url': response.url });
        }
    }
};

page.onLoadFinished = function(status) {
    if (status == 'success') {
        _output.cookies = phantom.cookies;
        console.table(_output.cookies);
        phantom.exit()
    } else {
        console.log('Failed to load the requested URL: '+address)
        phantom.exit(-3);
    }
};

phantom.cookiesEnabled = true;
address = system.args[1];
page.open(address, function (status) {
    if(status=='success') {
      _output.cookies = phantom.cookies; // record cookies
    }else{
      console.log('Unable to open provided URL: '+address);
      phantom.exit(-2); // -2: unable to open provided URL
    }
});

// to avoid errors detected while parsing the page (eg. Syntax Error, Type Error, etc.)
// getting into stdout, so breaking the JSON decoding of returned output.
page.onError = function (msg, trace) {
//    console.log(msg);
//    trace.forEach(function(item) {
//        console.log('  ', item.file, ':', item.line);
//    })
}
