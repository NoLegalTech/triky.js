var triky = require('./'),
    express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

app.route('/cookies/:url')
    .get(function(req, res) {
        console.log('trying to get cookies for ' + req.params.url);
        triky.grab(req.params.url, function(cookies) {
            res.json(cookies);
        });
    });

app.listen(port);

console.log('Listening requests on port ' + port);
