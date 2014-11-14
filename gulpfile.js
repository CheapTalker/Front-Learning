var gulp = require('gulp');
var compass = require('gulp-compass');
var bower = require('gulp-bower');
var notify = require('gulp-notify');

var path = require('path');

var paths = {
  styles: {
    src:  './src/sass/*.scss',
    dest: './src/css'
  },
  scripts: {
    src: './src/javascript/*',
    dest: './src/js'
  },
  libs: {
    src: './bower_components',
    dest: './src/lib'
  }
};

//create compass task
gulp.task('compass', function() {
    gulp.src(paths.styles.src)
    .pipe(compass({
        comments:false,
        // config_file: './config.rb',
        project: path.join(__dirname, 'src'),
        css:'css',
        sass:'sass'}))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(notify({ message: 'Compass task complete' }));
});

//create bower task
gulp.task('bower', function () {
    return bower(paths.libs.src)
            .pipe(gulp.dest(paths.libs.dest))
            .pipe(notify({ message: 'Bower task complete' }));
});


//create default task
gulp.task('default', function() {
    gulp.start('compass');
    gulp.watch([paths.styles.src],function(event) {
            gulp.start('compass');
        });

    gulp.start('bower');
    gulp.watch([paths.libs.src],function(event) {
            gulp.start('bower');
        });

});
