var triky = require('./'),
    cors = require('cors'),
    express = require('express'),
    app = express(),
    port = process.env.OPENSHIFT_NODEJS_PORT || 8080,
    server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.use(cors());

app.route('/cookies/:url')
    .get(function(req, res) {
        console.log('trying to get cookies for ' + req.params.url);
        triky.grab(req.params.url, function(cookies) {
            var to_return = {
                'url': req.params.url,
                'cookies': cookies
            };
            console.log(to_return);
            res.json(to_return);
        });
    });

app.listen(port, server_ip_address);

console.log('Listening requests on port ' + port);
