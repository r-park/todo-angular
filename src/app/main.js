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
  .constant('localStorageKey', require('./config/storage').LOCAL_STORAGE_KEY)
  .constant('storageStrategy', require('./config/storage').STORAGE_STRATEGY)


  /*===================================
    State (ui-router)
  -----------------------------------*/
  .factory('StateService', require('./core/state/state-service'))
  .config(require('./core/state/state-config'))


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
  .controller('AppController', require('./components/app/app'))


  /*===================================
    TaskForm component
  -----------------------------------*/
  .controller('TaskFormController', require('./components/task-form/task-form-controller'))


  /*===================================
    TaskItem component
  -----------------------------------*/
  .controller('TaskItemController', require('./components/task-item/task-item-controller'))


  /*===================================
    TaskList component
  -----------------------------------*/
  .controller('TaskListController', require('./components/task-list/task-list-controller'))
  .filter('taskStatus', require('./components/task-list/task-status-filter'))


  /*===================================
    Directives
  -----------------------------------*/
  .directive('escape', require('./common/escape-directive'));


// Bootstrap
angular.element(document).ready(function(){
  angular.bootstrap(document, [app.name], {strictDi: true});
});
