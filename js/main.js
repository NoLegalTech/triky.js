$(function() {
    $('button#get_cookies').click(function() {
        var url = $('input#url').val();
        $('button#get_cookies').hide();
        $('#loading').show();
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
    });
});
