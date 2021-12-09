'use strict';


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var del = require('del');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var nunjucksRender = require('gulp-nunjucks-render');
var concat      = require('gulp-concat');
var siteOutput = './dist';


// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

var input = './scss/*.scss';
var inputMain = './scss/main.scss';
var output = siteOutput + '/css';
var inputTemplates = './templates/*.njk';
var sassOptions = { outputStyle: 'expanded' };


// -----------------------------------------------------------------------------
// Sass compilation
// -----------------------------------------------------------------------------

gulp.task('sass', function() {
  return gulp
    .src(inputMain)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(output))
    .pipe(browserSync.stream());
});


// -----------------------------------------------------------------------------
// Javascript
// -----------------------------------------------------------------------------

gulp.task('scripts', function() {
  return gulp.src([
	  	'js/main.js'
  	])
    .pipe(concat({ path: 'main.js'}))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest(siteOutput + '/js'));
});


// -----------------------------------------------------------------------------
// Templating
// -----------------------------------------------------------------------------

gulp.task('nunjucks', function() {
  nunjucksRender.nunjucks.configure(['./templates/']);
  // Gets .html and .nunjucks files in pages
  return gulp.src(inputTemplates)
  // Renders template with nunjucks
  .pipe(nunjucksRender())
  // output files in dist folder
  .pipe(gulp.dest(siteOutput))
});


// -----------------------------------------------------------------------------
// Watchers
// -----------------------------------------------------------------------------

gulp.task('watch', function() {
    // Watch the sass input folder for change,
    // and run `sass` task when something happens
    gulp.watch(input, gulp.series('sass')).on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    gulp.watch('./js/*', gulp.series('scripts')).on('change', browserSync.reload);

    // Watch nunjuck templates and reload browser if change
    gulp.watch(inputTemplates, gulp.series('nunjucks')).on('change', browserSync.reload);

});


// -----------------------------------------------------------------------------
// Static server
// -----------------------------------------------------------------------------

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: siteOutput
    }
  });
});

//

gulp.task('clean', function() {
  return del(['dist'])
});


// -----------------------------------------------------------------------------
// Default task
// -----------------------------------------------------------------------------

gulp.task('default', gulp.series('sass', 'nunjucks', 'scripts', 'watch'),
function() {
  browserSync.init({
    server: {
      baseDir: siteOutput
    }
  });
});

// Build task

gulp.task('build', gulp.series('clean', gulp.parallel('sass', 'nunjucks', 'scripts')),
  function() {
    console.log('built your app to /dist');
  }
);
