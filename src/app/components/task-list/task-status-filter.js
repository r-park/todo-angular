'use strict';


module.exports = ['taskStatus', function(taskStatus) {

  return function(taskList, status) {
    if (!status || !taskStatus.VALID[status]) return taskList;

    var completed = status === taskStatus.COMPLETED;

    return taskList.filter(function(task){
      return task.completed === completed;
    });
  };

}];
