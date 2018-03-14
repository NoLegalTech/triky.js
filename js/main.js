var grab_cookies = function() {
    var url = $('input#url').val();
    $('button#get_cookies').hide();
    $('#loading').show();
    $('#result span.error').html('');
    $.get('https://triky-server.herokuapp.com/cookies/' + encodeURIComponent(url), function(data) {
        $('button#get_cookies').show();
        $('#loading').hide();
        $('#result tbody').html('');
        if (data.cookies == 'Invalid url') {
            console.error('Something wrong happened');
            $('#result span.error').html('Something wrong happened');
            $('#result > table').hide();
        } else {
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
                $('#result tbody').append(row);
            }
            $('#result > table').show();
        }
    });
};

$(function() {
    $('input#url').on('keypress', function(e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            grab_cookies();
        }
    });
    $('button#get_cookies').click(grab_cookies);
});
