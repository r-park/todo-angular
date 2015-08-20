module.exports = function(config) {
  var options = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'jasmine',
      'commonjs'
    ],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-aria/angular-aria.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-storage/dist/angular-storage.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js',
      'node_modules/sinon/pkg/sinon.js',
      'src/app/**/*.js',
      'src/app/**/*.html',
      'test/**'
    ],


    // list of files to exclude
    exclude: [
      'src/app/app.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './src/app/**/*.js': ['commonjs'],
      './test/spec/**/*.js': ['commonjs'],
      './src/app/**/*.html': ['ng-html2js']
    },


    // additional options for karma-commonjs
    commonjsPreprocessor: {
      modulesRoot: __dirname + '/src'
    },


    // additional options for karma-ng-html2js-preprocessor
    ngHtml2JsPreprocessor: {
      moduleName: 'app.templates',
      stripPrefix: 'src/app/components/'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,


    // custom launcher for travis-ci
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: process.env.TRAVIS ? ['Chrome_travis_ci'] : ['Chrome']

  };


  // additional options for coverage
  if (process.argv.indexOf('--coverage') !== -1) {
    options.singleRun = true;
    options.preprocessors['src/**/*.js'] = 'coverage';
    options.reporters.push('coverage');
    options.coverageReporter = {
      type : 'lcov',
      dir  : 'tmp/coverage'
    }
  }


  config.set(options);

};