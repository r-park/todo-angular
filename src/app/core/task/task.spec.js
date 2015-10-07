'use strict';

describe('Task', function(){
  var Task = require('./task');


  beforeEach(function(){
    angular.mock.module(function($provide){
      $provide.value('Task', Task);
    });
  });


  it('should have static property `STATUS_ACTIVE`', inject(function(Task){
    expect(Task.STATUS_ACTIVE).toBe('active');
  }));

  it('should have static property `STATUS_COMPLETED`', inject(function(Task){
    expect(Task.STATUS_COMPLETED).toBe('completed');
  }));


  describe('Constructor', function(){
    it('should set property `completed` to be `false`', inject(function(Task){
      var task = new Task();
      expect(task.completed).toBe(false);
    }));

    it('should set property `title` with provided value', inject(function(Task){
      var task = new Task('test');
      expect(task.title).toBe('test');
    }));

    it('should set property `title` with empty string if title is not provided', inject(function(Task){
      var task = new Task();
      expect(task.title).toBe('');
    }));
  });

});
