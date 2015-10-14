module.exports = function(config) {
  var options = {

    basePath: '.',

    frameworks: [
      'jasmine',
      'commonjs'
    ],

    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-aria/angular-aria.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-storage/dist/angular-storage.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js',
      'node_modules/sinon/pkg/sinon.js',
      'src/app/**/*.js',
      'src/app/**/*.html'
    ],

    exclude: [
      'src/app/main.js'
    ],

    preprocessors: {
      'src/app/**/*.js': ['commonjs'],
      'src/app/**/*.html': ['ng-html2js']
    },

    commonjsPreprocessor: {
      modulesRoot: 'src'
    },

    ngHtml2JsPreprocessor: {
      moduleName: 'templates',
      stripPrefix: 'src/app/components/'
    },

    reporters: ['dots'],

    port: 9876,

    colors: true,

    // config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    autoWatch: true,

    singleRun: false,

    customLaunchers: {
      TRAVIS_CHROME: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    browsers: process.env.TRAVIS ? ['TRAVIS_CHROME'] : ['Chrome']

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
