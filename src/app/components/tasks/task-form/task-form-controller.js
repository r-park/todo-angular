'use strict';


module.exports = TaskFormController;

TaskFormController.$inject = [
  '$scope',
  'TaskService'
];


/**
 * @name TaskFormController
 * @constructor
 * @param $scope
 * @param {TaskService} taskService
 */
function TaskFormController($scope, taskService) {
  var vm = this;

  function setTitle() {
    vm.title = '';
  }

  setTitle();

  vm.cancel = function() {
    setTitle();
  };

  vm.submit = function() {
    if ($scope.newTaskForm.$valid) {
      taskService
        .createTask(vm.title)
        .then(function(){
          setTitle();
        });
    }
  };
}
