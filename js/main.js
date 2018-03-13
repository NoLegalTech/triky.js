$(function() {
    $('button#get_cookies').click(function() {
        var url = $('input#url').val();
        $('button#get_cookies').hide();
        $('#loading').show();
        if (url == 'http://nolegaltech.com') {
            var data = {
                cookies: [ { domain: 'nolegaltech.com',
       httponly: false,
       name: 'PHPSESSID',
       path: '/',
       secure: false,
       value: '75mu8p29guhjamr71bvhvo9k13' },
     { domain: '.nolegaltech.com',
       expires: 'Tue, 13 Mar 2018 19:05:23 GMT',
       expiry: 1520967923,
       httponly: false,
       name: '_gat',
       path: '/',
       secure: false,
       value: '1' },
     { domain: '.nolegaltech.com',
       expires: 'Wed, 14 Mar 2018 19:04:23 GMT',
       expiry: 1521054263,
       httponly: false,
       name: '_gid',
       path: '/',
       secure: false,
       value: 'GA1.2.621262252.1520967863' },
     { domain: '.nolegaltech.com',
       expires: 'Thu, 12 Mar 2020 19:04:23 GMT',
       expiry: 1584039863,
       httponly: false,
       name: '_ga',
       path: '/',
       secure: false,
       value: 'GA1.2.64387043.1520967863' } ] };
            setTimeout(function() {
                $('button#get_cookies').show();
                $('#loading').hide();
                $('#result tbody').html('');
                for (var i in data.cookies) {
                    var cookie = data.cookies[i];
                    var row = 
                        '<tr>'
                            + '<td>' + cookie.name + '</td>'
                            + '<td>' + cookie.expires + '</td>'
                            //+ '<td>' + cookie.domain + '</td>'
                            //+ '<td>' + cookie.path + '</td>'
                            //+ '<td>' + cookie.secure + '</td>'
                            //+ '<td>' + cookie.value + '</td>'
                        + '</tr>';
                    console.log('appending ...');
                    console.log(cookie);
                    console.log(row);

                    $('#result tbody').append(row);
                }
                $('#result').show();
            }, 2000);
        } else {
            $.get('http://localhost:8080/cookies/' + encodeURIComponent(url), function(data) {
                console.log(data.cookies);
                $('button#get_cookies').show();
                $('#loading').hide();
                $('#result tbody').html('');
                for (var i in data.cookies) {
                    var cookie = data.cookies[i];
                    var row = 
                        '<tr>'
                            + '<td>' + cookie.name + '</td>'
                            + '<td>' + cookie.expires + '</td>'
                            //+ '<td>' + cookie.domain + '</td>'
                            //+ '<td>' + cookie.path + '</td>'
                            //+ '<td>' + cookie.secure + '</td>'
                            //+ '<td>' + cookie.value + '</td>'
                        + '</tr>';
                    console.log('appending ...');
                    console.log(cookie);
                    console.log(row);

                    $('#result tbody').append(row);
                }
                $('#result').show();
            });
        }
    });
});
