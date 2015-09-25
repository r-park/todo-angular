[![Build Status](https://travis-ci.org/r-park/todo-angular.svg?branch=master)](https://travis-ci.org/r-park/todo-angular)
[![Coverage Status](https://coveralls.io/repos/r-park/todo-angular/badge.svg?branch=master)](https://coveralls.io/r/r-park/todo-angular?branch=master)

# Todo app with Angular 1.5

## Installing dependencies
The gulp tasks for this project require gulp v4-alpha ([docs](https://github.com/gulpjs/gulp/tree/4.0/docs)). If you already have gulp v3.x installed globally, it must be removed to make way for v4.
```bash
npm uninstall -g gulp
```
Next, install the gulp v4 `gulp-cli` globally.
```bash
npm install -g gulpjs/gulp-cli#4.0
```
Finally, run the following command from the project's root directory to install the dependencies defined in package.json.
```bash
npm install
```

## Running the app
The following command will build the project, start the server, and open the app in Google Chrome.
```bash
gulp
```
To use a different browser, edit the `browser` field in [gulpfile.js](https://github.com/r-park/todo-angular/blob/master/gulpfile.js).
```bash
browserSync: {
  browser: ['google chrome']
  ...
}
```
The default storage strategy uses the browser's `localStorage` api. A server storage strategy is also available, powered by `express`. Note that you will need to provide your own `mongodb` instance. To switch to the server storage strategy, edit the [storage config setting](https://github.com/r-park/todo-angular/blob/master/src/app/config/storage.js).
```bash
// LocalStorageStrategy | ServerStorageStrategy
exports.STORAGE_STRATEGY = 'ServerStorageStrategy';
```

## Developing
```bash
gulp dev
```
The command above will:
- build the project
- start the server
- open the app in Google Chrome
- watch for changes to the source files
- live-reload the browser after source file changes have been processed

## Testing
To run the test suite:
```bash
gulp test
```
The following task will run the test suite, watch for changes to the source files, and re-run the tests when sources are modified:
```bash
gulp test.watch
```
