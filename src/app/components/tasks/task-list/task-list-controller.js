'use strict';


module.exports = TaskListController;

TaskListController.$inject = [
  'TaskService'
];


function TaskListController(taskService) {
  var vm = this;

  vm.tasks = [];

  taskService.getTasks().then(function(){
    vm.tasks = taskService.tasks;
  });
}
