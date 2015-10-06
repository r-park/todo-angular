'use strict';

describe('taskStatus filter', function(){
  var taskStatusFilter = require('app/components/tasks/task-item/task-status-filter');


  beforeEach(function(){
    angular.module('test', [])
      .value('Task', {STATUS_ACTIVE: 'active', STATUS_COMPLETED: 'completed'})
      .filter('taskStatus', taskStatusFilter);

    angular.mock.module('test');
  });


  it('should filter active tasks when param `status` is `active`', inject(function($filter, Task){
    var taskList = [{completed: true}, {completed: false}];
    var filter = $filter('taskStatus');
    var result = filter(taskList, Task.STATUS_ACTIVE);

    expect(result.length).toBe(1);
    expect(result[0].completed).toBe(false);
  }));

  it('should filter completed tasks when param `status` is `completed`', inject(function($filter, Task){
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

  it('should return all tasks when param `status` is invalid string', inject(function($filter){
    var taskList = [{completed: true}, {completed: false}];
    var filter = $filter('taskStatus');
    var result = filter(taskList, 'invalid');

    expect(result).toBe(taskList);
  }));

});
