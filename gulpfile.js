var gulp = require('gulp');
var exec = require('child_process').exec;
var readlineSync = require('readline-sync');

gulp.task('default', function(cb) {
    var url = readlineSync.question('Enter url: ');
    exec('vendor/phantomjs grab_cookies.js ' + url, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});
