#!/usr/bin/env node

var triky = require('../index.js'),
    cTable = require('console.table'),
    prompt = require('prompt'),
    colors = require("colors/safe"),

    grabCookies = url => {
        triky.grab(url, cookies => {
            console.table(cookies);
        });
    };

if (process.argv.length > 2) {
    grabCookies(process.argv[2]);
} else {
    prompt.message = '';
    prompt.delimiter = '';
    prompt.start();
    prompt.get({
            properties: {
                url: {
                    description: colors.green('Please enter an url:')
                }
            }
        }, function(err, result) {
        grabCookies(result.url);
    });
}
