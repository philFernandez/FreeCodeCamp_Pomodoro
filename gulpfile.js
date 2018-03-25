// npm init -y
// npm install -D gulp gulp-sass browser-sync
// update package.json w "scripts: {"dev": "gulp"}"
// 'npm run dev' to start

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

gulp.task('serve', function() {

  browserSync.init({
    server: "./public",
    browser: "firefox",
    files: ["./public/index.html", "./public/js/app.js"]
  });

  gulp.watch("scss/**/*.scss", ['sass']);
  //gulp.watch("public/*.html").on('change',
    //browserSync.reload);
});



gulp.task('sass', function() {
  return gulp.src("scss/styles.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("public/css"))
    .pipe(browserSync.stream());
});

gulp.task('default', ['sass', 'serve']);


