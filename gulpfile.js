const { src, dest, series, watch } = require ('gulp');
const concat = require ('gulp-concat');
const htmlMin = require ('gulp-htmlmin');
const babel = require('gulp-babel');
const cleanCSS = require ('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const del = require(`del`);
const notify = require('gulp-notify');
const image = require('gulp-image');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const clean = () => {
  return del([`dist`])
}

const styles = () => {
  return src ('src/styles/**/*.css')
  .pipe(sourcemaps.init())
  .pipe (concat('style.css'))
  .pipe(cleanCSS({
    level: 2
  }))
  .pipe(sourcemaps.write('.'))
  .pipe (dest('dist/css'))
  .pipe(browserSync.stream())
}

const scripts = () => {
  return src(
    ['src/js/script.js'])
    .pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['@babel/env']
		}))
    .pipe(uglify().on("error", notify.onError()))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

const htmlMinify = () => {
  return src ('src/**/*.html')
  .pipe (
    htmlMin({collapseWhitespace: true,
    }))
  .pipe (dest('dist'))
  .pipe(browserSync.stream())
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

const fonts = () => {
  return src('src/fonts/**')
    .pipe(dest('dist/fonts'))
}

const normalize = () => {
  return src('src/normalize.css')
    .pipe(dest('dist/css'))
}

const images = () => {
  return src([
		'src/img/*.svg',
		'src/img/**/*.jpg',
		'src/img/**/*.png',
		'src/img/**/*.jpeg'
		])
    .pipe(image())
    .pipe(dest('dist/img'))
}

watch(`src/**/*.html`, htmlMinify)
watch('src/js/**/*.js', scripts);
watch(`src/styles/**/*.css`, styles)

exports.clean = clean
exports.styles = styles
exports.scripts = scripts
exports.htmlMinify = htmlMinify
exports.default = series(clean, scripts, htmlMinify, styles, normalize, fonts, images, watchFiles)
