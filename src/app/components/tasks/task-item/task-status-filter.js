'use strict';


module.exports = ['Task', function(Task) {
  return function(taskList, filter) {
    var completed;

    if (filter === Task.STATUS_ACTIVE) {
      completed = false;
    }
    else if (filter === Task.STATUS_COMPLETED) {
      completed = true;
    }
    else {
      return taskList;
    }

    return taskList.filter(function(task){
      return task.completed === completed;
    });
  };
}];
