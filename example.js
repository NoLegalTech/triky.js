/*jslint node: true */
"use strict";

require('console.table');

var triky = require('./'),
    url = 'http://nolegaltech.com';

if (process.argv.length > 2) {
    url = process.argv[2];
}

triky.grab(url, (cookies) => {
    console.table(cookies);
});
