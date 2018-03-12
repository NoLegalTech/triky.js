var triky = require('./'),
    cTable = require('console.table'),

    url = 'http://nolegaltech.com';

if (process.argv.length > 2) {
    url = process.argv[2];
}

triky.grab(url, cookies => {
    console.table(cookies);
});
