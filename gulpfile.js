var gulp = require('gulp');
var exec = require('child_process').exec;
var readlineSync = require('readline-sync');
var argv = require('yargs').argv;
var jslint = require('gulp-jslint');

gulp.task('default', function(cb) {
    return gulp.src(['example.js'])
        .pipe(jslint())
        .pipe(jslint.reporter('default'));
});

gulp.task('lint', function() {
    return gulp.src(['example.js'])
        .pipe(jslint())
        .pipe(jslint.reporter('default'));
});

gulp.task('run', function(cb) {
    var url = argv.url;
    if (url === undefined) {
        url = readlineSync.question('Enter url: ');
    }
    exec('node example.js ' + url, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});
