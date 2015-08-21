var autoprefixer  = require('autoprefixer-core'),
    browserify    = require('browserify'),
    browserSync   = require('browser-sync'),
    buffer        = require('vinyl-buffer'),
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
    uglify        = require('gulp-uglify'),
    watchify      = require('watchify');


/*=========================================================
  PATHS
---------------------------------------------------------*/
var paths = {
  coverage: 'tmp/coverage/**/lcov.info',

  lib: {
    src: [
      'node_modules/angular/angular.min.js',
      'node_modules/angular-aria/angular-aria.min.js',
      'node_modules/angular-ui-router/release/angular-ui-router.min.js',
      'node_modules/angular-storage/dist/angular-storage.min.js',
      'node_modules/fastclick/lib/fastclick.js'
    ],
    target: 'target/lib'
  },

  src: {
    assets: 'src/assets/**/*',
    html: 'src/*.html',
    js: 'src/**/*.js',
    scss: 'src/styles/**/*.scss',
    tpl: 'src/app/components/**/*.html'
  },

  target: 'target',

  test: {
    unit: 'test/unit/**/*.js'
  }
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
      debug: true,
      entries: './src/app/app.js',
      noparse: [],
      packageCache: {}
    },
    outfile: 'app.js'
  },

  browserSync: {
    browser: ['google chrome canary'],
    files: [paths.target + '/**/*'],
    notify: false,
    port: 7000,
    reloadDelay: 200,
    server: {baseDir: '.'},
    startPath: paths.target
  },

  eslint: {
    src: [paths.src.js, paths.test.unit]
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

  templateCache: {
    options: {
      module: 'app.templates',
      standalone: true
    },
    outfile: 'app-templates.js'
  },

  sass: {
    errLogToConsole: true,
    outputStyle: 'nested',
    precision: 10,
    sourceComments: false
  }
};


/*=========================================================
  TASKS
---------------------------------------------------------*/
gulp.task('clean.target', function(done){
  del(paths.target, done);
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
    .src(paths.lib.src)
    .pipe(gulp.dest(paths.lib.target));
});


gulp.task('coveralls', function(){
  return gulp
    .src(paths.coverage)
    .pipe(coveralls())
});


gulp.task('headers', function(){
  var pkg = require('./package.json');
  var headerContent = {date: (new Date()).toISOString(), name: pkg.name, version: pkg.version, url: pkg.homepage};

  return gulp.src(config.header.src)
    .pipe(header(config.header.template, headerContent))
    .pipe(gulp.dest(paths.target));
});


gulp.task('js', function(done){
  var bundler = browserify(config.browserify.options);

  bundler
    .bundle()
    .pipe(sourceStream(config.browserify.outfile))
    .pipe(buffer())
    .pipe(sourceMaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourceMaps.write('./'))
    .pipe(gulp.dest(paths.target))
    .on('end', done);
});


gulp.task('js.watch', function(done){
  var bundler = watchify(browserify(config.browserify.options));
  bundler.on('update', bundle);

  function bundle() {
    gutil.log(gutil.colors.cyan('bundling JS'), '...');
    bundler
      .bundle()
      .pipe(sourceStream(config.browserify.outfile))
      .pipe(gulp.dest(paths.target))
      .on('end', function(){
        gutil.log("Finished", gutil.colors.cyan('bundling JS'));
        done();
      });
  }

  bundle();
});


gulp.task('lint', function(){
  return gulp
    .src(config.eslint.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


gulp.task('scss', function(){
  return gulp
    .src(paths.src.scss)
    .pipe(sass(config.sass))
    .pipe(postcss([
      autoprefixer(config.autoprefixer)
    ]))
    .pipe(gulp.dest(paths.target));
});


gulp.task('server', function(done){
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


gulp.task('test', gulp.series('lint', function executeTestSuites(done){
  var server = new KarmaServer(config.karma, function(exitCode){
    if (exitCode === 1) {
      process.exit(exitCode);
    }
    else {
      done();
    }
  });

  server.start();
}));


gulp.task('build', gulp.series(
  'clean.target',
  'copy.assets',
  'copy.html',
  'copy.lib',
  'scss',
  'templates',
  'js.watch'
));


gulp.task('default', gulp.series('build', function watch(){
  gulp.watch(paths.src.assets, gulp.task('copy.assets'));
  gulp.watch(paths.src.html, gulp.task('copy.html'));
  gulp.watch(paths.src.scss, gulp.task('scss'));
  gulp.watch(paths.src.tpl, gulp.task('templates'));
}));


gulp.task('dist', gulp.series('test', 'build', 'headers'));
