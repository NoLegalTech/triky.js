/*jslint node: true */
"use strict";

require('console.table');

var triky = require('./'),
    url = 'http://nolegaltech.com';
    //url = 'https://www.distilled.net';

if (process.argv.length > 2) {
    url = process.argv[2];
}

triky.grab(url, function (data) {
    console.log('Cookies: ');
    console.table(data.cookies);

    console.log('Urls: ');
    console.log('  - internal: ');
    data.urls.internal.forEach(function (url) {
        console.log('    - ' + url);
    });
    console.log('  - external: ');
    data.urls.external.forEach(function (url) {
        console.log('    - ' + url);
    });

    console.log('Resources: ');
    console.log('  - internal: ');
    data.resources.internal.forEach(function (url) {
        console.log('    - ' + url);
    });
    console.log('  - external: ');
    data.resources.external.forEach(function (url) {
        console.log('    - ' + url);
    });

    console.log('Forms: ');
    data.forms.forEach(function (form) {
        console.log('    - ' + form);
    });

    console.log('Google Analytics? ' + data.google_analytics);
});
