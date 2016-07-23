var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var autoPrefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var sourceMaps = require('gulp-sourcemaps');
var server = require('gulp-server-livereload');
var imageMin = require('gulp-imagemin');
var cache = require('gulp-cache');

gulp.task('script', function () {
    gulp.src(['src/js/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'));
});

//gulp.task('extraScript', function () {
//    gulp.src(['src/js/*.min.js'])
//        .pipe(gulp.dest('dist/js'));
//});

gulp.task('sass', function() {
    return sass('src/components/main.scss', { sourcemap: true, style: 'compact' })
        .on('error', sass.logError)
        .pipe(sourceMaps.init({loadMaps: true}))
        .pipe(autoPrefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(rename('app.css'))
        .pipe(cleanCSS())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('pages', function(){
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('fonts', function(){
    return gulp.src('src/theme/fonts/*')
        .pipe(gulp.dest('dist/css/fonts'))
});

gulp.task('images', function(){
    return gulp.src('src/theme/img/*')
        .pipe(imageMin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/img'))
});

gulp.task('webserver', function() {
    gulp.src('dist')
        .pipe(server({
            livereload: {
                enable: true,
                filter: function(filePath, cb) {
                    cb( !(/.DS_Store/.test(filePath)) );
                }
            },
            directoryListing: false,
            open: true,
            log: 'info',
            defaultFile: 'index.html'
        }));
});

gulp.task('default', function() {
    gulp.start('script', 'pages', 'sass', 'images', 'fonts', 'webserver');
    //gulp.start('extraScript');
    gulp.watch('src/*.html', ['pages']);
    gulp.watch('src/components/**/*.scss', ['sass']);
    gulp.watch('src/js/*.js', ['script']);
    gulp.watch('src/theme/img/*', ['images']);
    gulp.watch('src/theme/functions.scss', ['sass']);
});