var triky = require('./'),
    express = require('express'),
    app = express(),
    port = process.env.OPENSHIFT_NODEJS_PORT || 3000,
    server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';


app.route('/cookies/:url')
    .get(function(req, res) {
        console.log('trying to get cookies for ' + req.params.url);
        triky.grab(req.params.url, function(cookies) {
            res.json(cookies);
        });
    });

app.listen(port, server_ip_address);

console.log('Listening requests on port ' + port);
