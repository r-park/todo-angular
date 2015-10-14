[![Build Status](https://travis-ci.org/r-park/todo-angular.svg?branch=master)](https://travis-ci.org/r-park/todo-angular)
[![Coverage Status](https://coveralls.io/repos/r-park/todo-angular/badge.svg?branch=master&service=github)](https://coveralls.io/github/r-park/todo-angular?branch=master)


# Todo app with Angular 1.5
- Angular 1.5
- Angular ui-router
- Browserify
- SASS

Try the demo at <a href="http://r-park.github.io/todo-angular" target="_blank">r-park.github.io/todo-angular</a>

## Installing dependencies
```bash
npm install
```

#### Gulp v4
The gulp tasks for this project require gulp v4-alpha. If you don't wish to install it at this time, you can run the gulp tasks using the locally installed gulp. For example, with gulp v4 installed:
```bash
gulp run
```
Without gulp v4:
```bash
./node_modules/.bin/gulp run
```

#### Installing Gulp v4 (optional)
```bash
npm install -g gulpjs/gulp-cli#4.0
```

## Running the app
```bash
gulp run
```
Executing the `gulp run` command will:
- Build the project
- Start the server at <a href="http://localhost:7000" target="_blank">localhost:7000</a>

## Developing
```bash
gulp
```
Executing the default `gulp` command will:
- Build the project
- Start the server at <a href="http://localhost:7000" target="_blank">localhost:7000</a>
- Watch for changes to the source files and process changes
- Live-reload the browser

## Testing
```bash
gulp test
```
The following command will run the test suites, then watch for changes to the source files, and re-run the tests whenever the sources are modified.
```bash
gulp test.watch
```
