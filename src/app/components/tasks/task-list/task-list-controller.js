'use strict';


module.exports = TaskListController;

TaskListController.$inject = [
  'TaskService'
];


/**
 * @name TaskListController
 * @constructor
 * @param {TaskService} taskService
 */
function TaskListController(taskService) {
  var vm = this;

  vm.tasks = [];

  taskService.getTasks().then(function(tasks){
    vm.tasks = tasks;
  });
}
