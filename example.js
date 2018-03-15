/*jslint node: true */
"use strict";

require('console.table');

var triky = require('./'),
    optionDefinitions = [
        { name: 'policy', alias: 'p', type: Boolean },
        { name: 'template', alias: 't', type: String, defaultValue: 'templates/default.html' },
        { name: 'url', alias: 'u', type: String, defaultOption: true, defaultValue: 'http://nolegaltech.com' }
    ],
    commandLineArgs = require('command-line-args'),
    options = commandLineArgs(optionDefinitions);

triky.grab(options.url, function (cookies) {
    if (options.policy) {
        console.log('Generating policy for ' + options.url + '...');
        console.log('Using template at ' + options.template);
    } else {
        console.table(cookies);
    }
});
