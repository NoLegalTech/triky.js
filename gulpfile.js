var gulp = require('gulp');
var exec = require('child_process').exec;
var readlineSync = require('readline-sync');
var argv = require('yargs').argv;

gulp.task('default', function(cb) {
    var url = argv.url;
    if (url === undefined) {
        url = readlineSync.question('Enter url: ');
    }
    exec('vendor/phantomjs grab_cookies.js ' + url, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});
