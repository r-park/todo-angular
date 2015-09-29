'use strict';


module.exports = TaskItemController;

TaskItemController.$inject = [
  '$scope',
  'TaskService'
];


function TaskItemController($scope, taskService) {
  var vm = this;

  vm.editing = false;
  vm.statusUpdated = false;

  vm.cancelEdit = function() {
    vm.editing = false;
  };

  vm.edit = function() {
    vm.title = $scope.task.title;
    vm.editing = true;
  };

  vm.delete = function() {
    taskService.deleteTask($scope.task);
  };

  vm.save = function() {
    if (vm.editing) {
      if ($scope.task.title !== vm.title) {
        $scope.task.title = vm.title;
        taskService.updateTask($scope.task);
      }
      vm.editing = false;
    }
  };

  vm.toggleCompleted = function() {
    $scope.task.completed = !$scope.task.completed;
    taskService.updateTask($scope.task);
    vm.statusUpdated = $scope.task.completed;
  };
}
