'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');

gulp.task('default', ['browser-sync'], function () {
});

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync({
    proxy: "http://localhost:3000",
    files: ["client/**/*.*"],
    browser: "google-chrome",
    port: 7000
  });
});

gulp.task('nodemon', function (cb) {

  var started = false;

  return nodemon({
    script: 'server/server.js'
  }).on('start', function () {
    if (!started) {
      cb();
      started = true;
    }
  });
});
