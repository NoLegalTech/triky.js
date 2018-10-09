/*jslint node: true */
"use strict";

require('console.table');

var triky = require('./'),
    request = require('request'),
    optionDefinitions = [
        {name: 'help', alias: 'h', type: Boolean, defaultValue: false},
        {name: 'policy', alias: 'p', type: Boolean},
        {name: 'template', alias: 't', type: String, defaultValue: 'templates/default.html'},
        {name: 'url', alias: 'u', type: String, defaultOption: true, defaultValue: 'http://nolegaltech.com'}
    ],
    commandLineArgs = require('command-line-args'),
    options = commandLineArgs(optionDefinitions);

var printCookie = function (cookie) {
    console.log(cookie);
    var table = [];
    table.push({key: 'name', value: cookie.name});
    table.push({key: 'domain', value: cookie.domain});
    table.push({key: 'expires', value: cookie.expires});
    table.push({key: 'expiry', value: cookie.expiry});
    table.push({key: 'httponly', value: cookie.httponly});
    table.push({key: 'path', value: cookie.path});
    table.push({key: 'secure', value: cookie.secure});
    table.push({key: 'value', value: cookie.value});
    table.push({key: 'expirationTime', value: cookie.expirationTime});
    if (cookie.additionalInfo) {
        table.push({key: 'WTC.wtc_id', value: cookie.additionalInfo.wtc_id});
        table.push({key: 'WTC.name', value: cookie.additionalInfo.name});
        table.push({key: 'WTC.origin', value: cookie.additionalInfo.origin});
        table.push({key: 'WTC.type', value: cookie.additionalInfo.type});
        table.push({key: 'WTC.goal', value: cookie.additionalInfo.goal});
        table.push({key: 'WTC.expiration_time', value: cookie.additionalInfo.expiration_time});
        table.push({key: 'WTC.published', value: cookie.additionalInfo.published});
        table.push({key: 'WTC.usage_url', value: cookie.additionalInfo.usage_url});
        table.push({key: 'WTC.optout_url', value: cookie.additionalInfo.optout_url});
        table.push({key: 'WTC.verified', value: cookie.additionalInfo.verified});
    }
    console.table(table);

        /*
  additionalInfo:
   { wtc_id: 2,
        */
};

if (options.help) {
    console.log('Help');
} else {
    triky.grab(options.url, function (cookies) {
        if (options.policy) {
            console.log('Generating policy for ' + options.url + '...');
            console.log('Using template at ' + options.template);
        } else {
            //console.table(cookies);
            cookies.forEach(function (cookie) {
                request('https://www.nolegaltech.com/es-ES/wtc/a/' + cookie.name, function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        var info = JSON.parse(body);
                        info.forEach(function (data) {
                            if (data.name === cookie.name) {
                                cookie.additionalInfo = data;
                            }
                        });
                        printCookie(cookie);
                    }
                });
            });
        }
    });
}
