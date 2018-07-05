var gulp = require('gulp');
var exec = require('child_process').exec;
var readlineSync = require('readline-sync');
var argv = require('yargs').argv;
var jslint = require('gulp-jslint');

var files_to_lint = [
    'example.js',
    'tests/triky-test.js'
];

gulp.task('lint', function() {
    return gulp.src(files_to_lint)
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

gulp.task('test', function(cb) {
    exec('npm test', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('default', [ 'lint', 'test' ]);
