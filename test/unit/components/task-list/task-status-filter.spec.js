'use strict';

describe('taskStatus filter', function(){

  var taskStatus = require('app/config/task-status'),
      taskStatusFilter = require('app/components/task-list/task-status-filter');


  beforeEach(function(){
    angular.module('test', [])
      .constant('taskStatus', taskStatus)
      .filter('taskStatus', taskStatusFilter);

    angular.mock.module('test');
  });


  it('should filter active tasks when param `status` is `active`', inject(function($filter){
    var taskList = [{completed: true}, {completed: false}];
    var filter = $filter('taskStatus');
    var result = filter(taskList, taskStatus.ACTIVE);

    expect(result.length).toBe(1);
    expect(result[0].completed).toBe(false);
  }));

  it('should filter completed tasks when param `status` is `completed`', inject(function($filter){
    var taskList = [{completed: true}, {completed: false}];
    var filter = $filter('taskStatus');
    var result = filter(taskList, taskStatus.COMPLETED);

    expect(result.length).toBe(1);
    expect(result[0].completed).toBe(true);
  }));

  it('should return all tasks when param `status` is undefined', inject(function($filter){
    var taskList = [{completed: true}, {completed: false}];
    var filter = $filter('taskStatus');
    var result = filter(taskList);

    expect(result).toBe(taskList);
  }));

  it('should return all tasks when param `status` is invalid', inject(function($filter){
    var taskList = [{completed: true}, {completed: false}];
    var filter = $filter('taskStatus');
    var result = filter(taskList, 'foo');

    expect(result).toBe(taskList);
  }));

});
