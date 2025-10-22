import gulp from 'gulp'
import gulpSass from 'gulp-sass'
import * as nodeSass from 'sass'
import pug from 'gulp-pug'
import webpack from 'webpack-stream'
import browsersync from 'browser-sync'
import gcmq from 'gulp-group-css-media-queries'
import cleanCSS from 'gulp-clean-css'

import config from './webpack.config.js'

console.log(process.env.NODE_ENV)

const sass = gulpSass(nodeSass)
browsersync.create()

const browserSync = () => {
  browsersync.init({
    server: {
      baseDir: './dist',
      serveStaticOptions: {
        extensions: ['html'],
      },
    },
    notify: false,
    open: false,
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware('*', function (req, res) {
          res.writeHead(302, {
            location: 'error.html',
          })
          res.end('Redirecting!')
        })
      },
    },
  })

  gulp.watch('./dist', browserSync.reload)
}

const html = () => {
  return gulp
    .src('./src/pug/pages/*.pug')
    .pipe(
      pug({
        data: {
          mode: process.env.NODE_ENV,
          image: 'format',
        },
      })
    )
    .pipe(gulp.dest('./dist'))
    .pipe(browsersync.stream())
}

const style = () => {
  return gulp
    .src('./src/scss/main.scss')
    .pipe(sass())
    .pipe(gcmq())
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist'))
    .pipe(browsersync.stream())
}

const script = () => {
  return gulp
    .src('./src/js/main.js')
    .pipe(webpack(config))
    .pipe(gulp.dest('./dist'))
    .pipe(browsersync.stream())
}

const image = () => {
  return gulp.src('./src/img/**/*').pipe(gulp.dest('./dist/img'))
}

const font = () => {
  return gulp.src('./src/font/**/*').pipe(gulp.dest('./dist/font/'))
}

const resource = () => {
  return gulp.src('./src/resource/**/*').pipe(gulp.dest('./dist/'))
}

const build = done => {
  html()
  style()
  script()
  image()
  font()
  resource()
  done()
}

export { html, style, script, image, font, browserSync, build }

export default () => {
  html()
  style()
  script()
  image()
  font()
  resource()
  browserSync()
  // gulp.watch('./src/njk/**/*.njk', html)
  gulp.watch('./src/pug/**/*.pug', html)
  gulp.watch('./src/scss/**/*.scss', style)
  gulp.watch('./src/js/**/*.js', script)
  gulp.watch('./src/img/**/*', image)
  gulp.watch('./src/font/**/*', font)
  gulp.watch('./src/resource/**/*', resource)
}
