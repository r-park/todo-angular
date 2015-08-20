'use strict';


module.exports = TaskListController;

TaskListController.$inject = [
  '$scope',
  'StateService',
  'TaskService'
];


function TaskListController($scope, stateService, taskService) {
  var vm = this;

  $scope.state = stateService;

  taskService.getTasks().then(function(){
    vm.tasks = taskService.tasks;
  });
}
