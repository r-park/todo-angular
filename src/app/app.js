'use strict';


var app = angular

  .module('app', [
    'angular-storage',
    'ngAria',
    'ui.router',
    'app.templates'
  ])


  /*===================================
    Constants
  -----------------------------------*/
  .constant('apiType', require('./constants/api-type'))
  .constant('keyCodes', require('./constants/key-codes'))
  .constant('localStorageKey', require('./constants/local-storage-key'))
  .constant('taskStatus', require('./constants/task-status'))


  /*===================================
    API
  -----------------------------------*/
  .factory('LocalApi', require('./core/api/local-api'))
  .factory('ServerApi', require('./core/api/server-api'))


  /*===================================
    State (ui-router)
  -----------------------------------*/
  .factory('StateService', require('./core/state/state-service'))
  .config(require('./core/state/state-config'))


  /*===================================
    Task
  -----------------------------------*/
  .value('Task', require('./core/task/task'))
  .factory('TaskService', require('./core/task/task-service'))


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
