var assign        = require('object-assign'),
    autoprefixer  = require('autoprefixer'),
    browserify    = require('browserify'),
    browserSync   = require('browser-sync'),
    buffer        = require('vinyl-buffer'),
    connect       = require('gulp-connect'),
    coveralls     = require('gulp-coveralls'),
    del           = require('del'),
    eslint        = require('gulp-eslint'),
    gulp          = require('gulp'),
    gutil         = require('gulp-util'),
    header        = require('gulp-header'),
    KarmaServer   = require('karma').Server,
    minifyHtml    = require('gulp-minify-html'),
    postcss       = require('gulp-postcss'),
    sass          = require('gulp-sass'),
    sourceMaps    = require('gulp-sourcemaps'),
    sourceStream  = require('vinyl-source-stream'),
    templateCache = require('gulp-angular-templatecache'),
    todoServer    = require('todo-server'),
    uglify        = require('gulp-uglify'),
    watchify      = require('watchify');


/*=========================================================
  ENV
---------------------------------------------------------*/
var DIST = gutil.env._[0] === 'dist';


/*=========================================================
  PATHS
---------------------------------------------------------*/
var paths = {
  lib: [
    'node_modules/angular/angular.min.js',
    'node_modules/angular-aria/angular-aria.min.js',
    'node_modules/angular-ui-router/release/angular-ui-router.min.js',
    'node_modules/angular-storage/dist/angular-storage.min.js'
  ],

  src: {
    assets: 'src/assets/**/*',
    html: 'src/*.html',
    js: 'src/**/*.js',
    sass: 'src/styles/**/*.scss',
    tpl: 'src/app/components/**/*.html'
  },

  target: 'target',

  test: 'test/unit/**/*.js'
};


/*=========================================================
  CONFIG
---------------------------------------------------------*/
var config = {
  autoprefixer: {
    browsers: ['last 3 versions', 'Firefox ESR', 'Opera 12.1']
  },

  browserify: {
    options: {
      cache: {},
      debug: !DIST,
      entries: './src/app/main.js',
      noparse: [],
      packageCache: {}
    },
    outfile: 'main.js'
  },

  browserSync: {
    browser: ['google chrome'],
    files: [paths.target + '/**/*'],
    notify: false,
    port: 7000,
    reloadDelay: 200,
    server: {
      baseDir: paths.target
    }
  },

  copy: {
    lib: {
      dest: paths.target + '/lib'
    }
  },

  coveralls: {
    src: 'tmp/coverage/**/lcov.info'
  },

  eslint: {
    src: [paths.src.js, paths.test]
  },

  header: {
    src: paths.target + '/*.js',
    template: '/* <%= name %> v<%= version %> - <%= date %> - <%= url %> */\n'
  },

  karma: {
    configFile: __dirname + '/karma.conf.js'
  },

  minifyHtml: {
    cdata: false,
    comments: false,
    conditionals: true,
    empty: true,
    quotes: true,
    spare: false
  },

  sass: {
    errLogToConsole: true,
    outputStyle: DIST ? 'compressed' : 'nested',
    precision: 10,
    sourceComments: false
  },

  templateCache: {
    options: {
      module: 'templates',
      standalone: true
    },
    outfile: 'templates.js'
  }
};


/*=========================================================
  TASKS
---------------------------------------------------------*/
gulp.task('clean.target', function(){
  return del(paths.target);
});


gulp.task('copy.assets', function(){
  return gulp
    .src(paths.src.assets)
    .pipe(gulp.dest(paths.target));
});


gulp.task('copy.html', function(){
  return gulp
    .src(paths.src.html)
    .pipe(gulp.dest(paths.target));
});


gulp.task('copy.lib', function(){
  return gulp
    .src(paths.lib)
    .pipe(gulp.dest(config.copy.lib.dest));
});


gulp.task('coveralls', function(){
  return gulp
    .src(config.coveralls.src)
    .pipe(coveralls());
});


gulp.task('headers', function(){
  var pkg = require('./package.json');
  var headerContent = {date: (new Date()).toISOString(), name: pkg.name, version: pkg.version, url: pkg.homepage};

  return gulp
    .src(config.header.src)
    .pipe(header(config.header.template, headerContent))
    .pipe(gulp.dest(paths.target));
});


gulp.task('js', function(){
  var bundler = browserify(config.browserify.options);
  bundler.on('log', gutil.log);
  return bundler
    .bundle()
    .pipe(sourceStream(config.browserify.outfile))
    .pipe(buffer())
    .pipe(sourceMaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourceMaps.write('./'))
    .pipe(gulp.dest(paths.target));
});


gulp.task('js.watch', function(){
  var bundler = watchify(browserify(config.browserify.options));
  bundler.on('update', bundle);
  bundler.on('log', gutil.log);

  function bundle() {
    return bundler
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(sourceStream(config.browserify.outfile))
      .pipe(gulp.dest(paths.target));
  }

  return bundle();
});


gulp.task('lint', function(){
  return gulp
    .src(config.eslint.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


gulp.task('sass', function(){
  return gulp
    .src(paths.src.sass)
    .pipe(sass(config.sass))
    .pipe(postcss([
      autoprefixer(config.autoprefixer)
    ]))
    .pipe(gulp.dest(paths.target));
});


gulp.task('server', function(done){
  connect.server({
    port: 7000,
    livereload: false,
    root: paths.target
  });
  done();
});


gulp.task('server.api', function(done){
  todoServer.start();
  done();
});


gulp.task('server.sync', function(done){
  browserSync
    .create()
    .init(config.browserSync, done);
});


gulp.task('templates', function(){
  return gulp
    .src(paths.src.tpl)
    .pipe(minifyHtml(config.minifyHtml))
    .pipe(templateCache(config.templateCache.outfile, config.templateCache.options))
    .pipe(gulp.dest(paths.target));
});


/*===========================
  BUILD
---------------------------*/
gulp.task('build', gulp.series(
  'clean.target',
  'copy.assets',
  'copy.html',
  'copy.lib',
  'sass',
  'templates'
));


gulp.task('build.dev', gulp.series('build', 'js.watch'));
gulp.task('build.dist', gulp.series('build', 'js'));


/*===========================
  DEVELOP
---------------------------*/
gulp.task('dev', gulp.series('build.dev', 'server.sync', function watch(){
  gulp.watch(paths.src.assets, gulp.task('copy.assets'));
  gulp.watch(paths.src.html, gulp.task('copy.html'));
  gulp.watch(paths.src.sass, gulp.task('sass'));
  gulp.watch(paths.src.tpl, gulp.task('templates'));
}));


/*===========================
  TEST
---------------------------*/
gulp.task('karma', function(done){
  var conf = assign({}, config.karma, {singleRun: true});
  var server = new KarmaServer(conf, function(error){
    if (error) process.exit(error);
    else done();
  });
  server.start();
});


gulp.task('karma.watch', function(done){
  var server = new KarmaServer(config.karma, function(error){
    if (error) process.exit(error);
    else done();
  });

  server.start();
});


gulp.task('test', gulp.series('lint', 'karma'));


gulp.task('test.watch', gulp.series('lint', 'karma.watch'));


/*===========================
  RELEASE
---------------------------*/
gulp.task('dist', gulp.series('test', 'build.dist', 'headers'));


/*===========================
  RUN
---------------------------*/
gulp.task('default', gulp.series('build.dist', 'server'));
