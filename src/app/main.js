'use strict';


var app = angular

  .module('app', [
    'angular-storage',
    'ngAria',
    'ui.router',
    'templates'
  ])


  /*===================================
    Constants
  -----------------------------------*/
  .constant('storageConfig', require('./config/storage'))


  /*===================================
    State (ui-router)
  -----------------------------------*/
  .factory('StateService', require('./core/state/state-service'))
  .config(require('./config/router'))


  /*===================================
    Task
  -----------------------------------*/
  .value('Task', require('./core/task/task'))
  .factory('LocalStorageStrategy', require('./core/task/local-storage-strategy'))
  .factory('ServerStorageStrategy', require('./core/task/server-storage-strategy'))
  .factory('TaskService', require('./core/task/task-service'))


  /*===================================
    App component
  -----------------------------------*/
  .controller('AppController', require('./components/app/app-controller'))


  /*===================================
    TaskForm component
  -----------------------------------*/
  .controller('TaskFormController', require('./components/tasks/task-form/task-form-controller'))


  /*===================================
    TaskItem component
  -----------------------------------*/
  .controller('TaskItemController', require('./components/tasks/task-item/task-item-controller'))
  .filter('taskStatus', require('./components/tasks/task-item/task-status-filter'))


  /*===================================
    TaskList component
  -----------------------------------*/
  .controller('TaskListController', require('./components/tasks/task-list/task-list-controller'))


  /*===================================
    Directives
  -----------------------------------*/
  .directive('escape', require('./directives/escape-directive'))
  .directive('focus', require('./directives/focus-directive'));


// Bootstrap
angular.element(document).ready(function(){
  angular.bootstrap(document, [app.name], {strictDi: true});
});
