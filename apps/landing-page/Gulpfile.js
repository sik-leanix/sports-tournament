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
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var siteOutput = '../../dist/apps/landing-page';

// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

var sassInput = './scss/*.scss';
var sassInputMain = './scss/main.scss';
var sassOutput = siteOutput + '/css';
var inputTemplates = ['./pages/*.njk', './pages/**/*.njk'];
var sassOptions = { outputStyle: 'expanded' };

var typeScriptOutput = siteOutput + '/js';

// -----------------------------------------------------------------------------
// Sass compilation
// -----------------------------------------------------------------------------

gulp.task('sass', function () {
  return gulp
    .src(sassInputMain)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(sassOutput))
    .pipe(browserSync.stream());
});

// -----------------------------------------------------------------------------
// Javascript
// -----------------------------------------------------------------------------

gulp.task('scripts', function () {
  return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest(typeScriptOutput));
});

// -----------------------------------------------------------------------------
// Templating
// -----------------------------------------------------------------------------

gulp.task('nunjucks', function () {
  return gulp
    .src(inputTemplates)
    .pipe(
      nunjucksRender({
        path: ['templates/']
      })
    )
    .pipe(gulp.dest(siteOutput));
});

// -----------------------------------------------------------------------------
// Netlify configuration
// -----------------------------------------------------------------------------

gulp.task('netlify-config', function () {
  return gulp
    .src(['_redirects'])
    .pipe(gulp.dest(siteOutput));
});

// Delete dist ouput

gulp.task('clean', function () {
  return del([siteOutput], { force: true });
});

const watchFiles = () => {
  // Watch the sass input folder for change,
  // and run `sass` task when something happens
  gulp.watch(sassInput, gulp.series('sass')).on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });

  gulp.watch('./js/*', gulp.series('scripts')).on('change', browserSync.reload);

  // Watch nunjuck templates and reload browser if change
  gulp.watch(inputTemplates, gulp.series('nunjucks')).on('change', browserSync.reload);
};

const startDevServer = () => {
  browserSync.init({
    server: {
      baseDir: siteOutput,
      middleware: function (req, res, next) {
        // redirect all requests that start with /tournament to the /tournament/index.html
        // where we use JavaScript to fetch the relevant Torunament data based on the URL segments.
        if (req.url.startsWith('/tournament')) {
          req.url = '/tournament/index.html';
        }
        return next();
      }
    }
  });
  watchFiles();
};

// -----------------------------------------------------------------------------
// Dev server task
// -----------------------------------------------------------------------------

gulp.task('serve', gulp.series('sass', 'nunjucks', 'scripts', startDevServer));

// Build task

gulp.task('build', gulp.series('clean', gulp.parallel('sass', 'nunjucks', 'scripts', 'netlify-config')), function () {
<<<<<<< HEAD
  console.log('built your app to /dist');
=======
>>>>>>> main
  console.log('built your app to ' + siteOutput);
});
