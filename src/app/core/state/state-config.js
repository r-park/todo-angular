'use strict';


module.exports = stateConfig;

stateConfig.$inject = [
  '$stateProvider',
  '$urlRouterProvider'
];


/**
 * @param $stateProvider
 * @param $urlRouterProvider
 */
function stateConfig($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state({
      abstract: true,
      name: 'app',
      views: {
        '': {
          controller: 'AppController as app',
          templateUrl: 'app/app.html'
        }
      }
    })

    .state({
      name: 'app.tasks',
      url: '/tasks',
      views: {
        'main@app': {
          templateUrl: 'tasks/tasks.html'
        },

        'form@app.tasks': {
          controller: 'TaskFormController as taskForm',
          templateUrl: 'task-form/task-form.html'
        },

        'list@app.tasks': {
          controller: 'TaskListController as taskList',
          templateUrl: 'task-list/task-list.html'
        }
      }
    })

    .state({
      name: 'app.tasks.filtered',
      url: '/{status:active|completed}',
      views: {
        'list@tasks': {
          controller: 'TaskListController as taskList',
          templateUrl: 'task-list/task-list.html'
        }
      }
    });


  $urlRouterProvider.otherwise('/tasks');
}
