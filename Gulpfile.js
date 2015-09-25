var gulp = require('gulp');
var bs = require('browser-sync').create();
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');


// Compile SASS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src('app/src/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'})
        	.on('error', sass.logError))
        .pipe(gulp.dest('app/public/assets/css'))
        .pipe(bs.stream());
});

// Provide `once: true` to restrict reloading to once per stream
gulp.task('templates', function () {
    return gulp.src('app/src/jade/**/*.jade')
        .pipe(jade({pretty:true}))
        .pipe(gulp.dest('app/public'))
        .pipe(bs.stream({once: true}));
});

gulp.task('compress', function() {
  return gulp.src('app/src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('app/public/js'));
});

// Static Server + watching scss/html files
gulp.task('default', ['sass','templates','compress'], function() {

    bs.init({
        server: "./app/public"
    });

    gulp.watch("app/src/scss/**/*.scss", ['sass']);
    gulp.watch("app/src/jade/**/*.jade", ['templates']);
    gulp.watch("app/src/js/**/*.js", ['compress']);
    
});