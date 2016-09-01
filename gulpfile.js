

var gulp = require('gulp'),
    estream = require('event-stream'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'),
    less = require('gulp-less'),
    htmlMin = require('gulp-htmlmin'),
    gutil = require('gulp-util');
    
var jsSource1 = [
    '_/components/js/jquery.js',
    '_/components/js/affix.js',
    '_/components/js/transition.js',
    '_/components/js/tooltip.js',
    '_/components/js/alert.js',
    '_/components/js/button.js'
];  

var jsSource2 =[
    '_/components/js/carousel.js',
    '_/components/js/collapse.js',
    '_/components/js/dropdown.js',
    '_/components/js/modal.js',
    '_/components/js/popover.js',
    '_/components/js/scrollspy.js',
    '_/components/js/tab.js',
    '_/components/js/myscript.js'
];

var lessSources = [
    '_/components/less/bootstrap.less',
    '_/components/less/mystyles.less'
];
var outputDir = '_/builds/production/';


gulp.task('bootstrapJS', function () {
    var js1 = gulp.src(jsSource1);
    var js2 = gulp.src(jsSource2);
    
    return estream.merge(js1, js2)
            .pipe(concat('bootstrap.js'))
            .on('error', gutil.log)
            .pipe(uglify())
            .pipe(gulp.dest(outputDir + 'js'))
            .pipe(connect.reload());
});

gulp.task('less', function  () {
    gulp.src(lessSources)
            .pipe(concat('bootstrap.css'))
            .pipe(less({
                compress: true
            }))
            .pipe(gulp.dest(outputDir + 'css'))
            .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch([jsSource1, jsSource2], ['bootstrapJS']);
    gulp.watch([lessSources], ['less']);
    gulp.watch(['index.html'], ['html']);
});

gulp.task('connect', function () {
    connect.server({
        root: outputDir,
        livereload: true
    });
});

gulp.task('html', function () {
   gulp.src('index.html')
           .pipe(htmlMin({ collapseWhitespace: true }))
           .pipe(gulp.dest(outputDir))
           .pipe(connect.reload());
});

gulp.task('default', ['html', 'bootstrapJS', 'less', 'connect', 'watch']);