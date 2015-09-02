'use strict';


module.exports = ['Task', function(Task) {

  return function(taskList, status) {
    if (!status) return taskList;

    var completed = status === Task.STATUS_COMPLETED;

    return taskList.filter(function(task){
      return task.completed === completed;
    });
  };

}];
