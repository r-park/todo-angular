'use strict';

describe('taskStatus filter', function(){

  var Task = require('app/core/task/task'),
      taskStatusFilter = require('app/components/tasks/task-list/task-status-filter');


  beforeEach(function(){
    angular.module('test', [])
      .value('Task', Task)
      .filter('taskStatus', taskStatusFilter);

    angular.mock.module('test');
  });


  it('should filter active tasks when param `status` is `active`', inject(function($filter){
    var taskList = [{completed: true}, {completed: false}];
    var filter = $filter('taskStatus');
    var result = filter(taskList, Task.STATUS_ACTIVE);

    expect(result.length).toBe(1);
    expect(result[0].completed).toBe(false);
  }));

  it('should filter completed tasks when param `status` is `completed`', inject(function($filter){
    var taskList = [{completed: true}, {completed: false}];
    var filter = $filter('taskStatus');
    var result = filter(taskList, Task.STATUS_COMPLETED);

    expect(result.length).toBe(1);
    expect(result[0].completed).toBe(true);
  }));

  it('should return all tasks when param `status` is undefined', inject(function($filter){
    var taskList = [{completed: true}, {completed: false}];
    var filter = $filter('taskStatus');
    var result = filter(taskList);

    expect(result).toBe(taskList);
  }));

});
