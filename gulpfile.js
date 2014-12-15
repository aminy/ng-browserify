'use strict';
var browserify = require('browserify');
var express = require('express');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var glob = require('glob');
var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var karma = require('gulp-karma');
var source = require('vinyl-source-stream');
var less = require('gulp-less');
var refresh = require('gulp-livereload');
var livereload = require('connect-livereload');

var liveReload = true;

var localServer = function(conf){
    var app = express();
    var http = require('http');

    if(conf.livereload){
        app.use(livereload({port: conf.livereloadPort}));
    }
    app.use(express.static(conf.root));
    app.all('/*', function(req, res) {
        res.sendFile(conf.root + 'index.html', { root: __dirname });
    });

    return http.createServer(app).listen(conf.port, function(){
        console.log('Express HTTP server listening on port ' + conf.port);
    });
};

// single depth copy of attributes
var extend = function(from, to) {
    for (var name in from) {
        if (from.hasOwnProperty(name)) {
            to[name] = from[name];
        }
    }
    return to;
};

var filePath = {
    build: {
        dest: './dist/'
    },
    lint : {
        src :
            [
                './gulpfile.js',
                './app/**/*.js',
                './app/*.js'
            ]
    },
    test : {
        unit : {
            src : './app/**/*_unit-test.js',
            karma: './test/*.js'
        },
        dest: './test/'


    },
    browserify: {
        src: './app/app.js'
    },
    styles: {
        src: './app/app.less',
        watch: ['./app/app.less','./app/**/*.less'],
        dest: './dist/css/'
    },
    static: {
        src: ['./app/assets/**/*', './app/index.html'],
        dest: './dist/'
    },
    font: {
        src: ['./node_modules/bootstrap/fonts/*'],
        dest: './dist/fonts/'
    },
    vendorJS: {
        src:
            [
                './node_modules/jquery/dist/jquery.min.js', // v2.1.1
                './node_modules/bootstrap/dist/js/bootstrap.min.js' // v3.1.1
            ]
    },
    vendorCSS: {
        src:
            [
                './node_modules/bootstrap/dist/css/bootstrap.css' // v3.1.1
            ]
    }
};

var serverConf = {
    port: 9090,
    livereloadPort: 35729,
    root: './dist/'
};

gulp.task('clean', function() {
    return gulp.src(['dist/'], { read: false })
        .pipe(clean());
});

gulp.task('lint', function() {
    return gulp.src(filePath.lint.src)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('browserify', function() {
    var bundler = browserify({debug:true});
    return bundler.add(filePath.browserify.src)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(filePath.build.dest));
});

gulp.task('browserify-unit-tests', function() {
    var bundler = browserify({ debug: true });
    glob.sync(filePath.test.unit.src)
        .forEach(function(file) {
            bundler.add(file);
        });
    return bundler
        .bundle()
        .pipe(source('unit-tests-bundle.js'))
        .pipe(gulp.dest(filePath.test.dest));
});

gulp.task('karma', ['browserify-unit-tests'], function() {
    return gulp
        .src(filePath.test.unit.karma)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', console.error.bind(console));
});

gulp.task('server', ['build'], function() {
    localServer(extend(serverConf, {livereload: liveReload}));
    //refresh.listen(serverConf.livereloadPort);
});

gulp.task('watch', function() {
    gulp.start('server');
    refresh.listen(serverConf.livereloadPort);
    gulp.watch([
        './gulpfile.js',
        './app/**/*.js',
        './app/index.html',
        './app/*.js',
        './app/*.html',
        './app/**/*.html',
        './app/*.less',
        './app/**/*.less',
        './app/assets/**/*'
    ], ['browserify', 'lint'/*, 'karma'*/]);

    gulp.watch('./dist/**').on('change', refresh.changed);
});

gulp.task('default', [], function() {
    liveReload = true;
    gulp.start('watch');
});

gulp.task('test', ['karma'], function() {
});

gulp.task('build', ['browserify', 'static', 'styles', 'vendorJS', 'vendorCSS'], function(){
});

gulp.task('styles', function () {
    return gulp.src(filePath.styles.src)
        .pipe(less())
        .pipe(gulp.dest(filePath.styles.dest));
});

gulp.task('vendorJS', function () {
    return gulp.src(filePath.vendorJS.src)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(filePath.build.dest));
});

gulp.task('vendorCSS', function () {
    return gulp.src(filePath.vendorCSS.src)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(filePath.styles.dest));
});


gulp.task('static', ['font'], function() {
    return gulp.src(filePath.static.src)
        .pipe(gulp.dest(filePath.static.dest));
});

gulp.task('font', function(){
   return gulp.src(filePath.font.src)
       .pipe(gulp.dest(filePath.font.dest));
});
