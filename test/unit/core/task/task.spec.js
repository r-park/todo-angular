'use strict';

describe('Task', function(){

  var Task = require('app/core/task/task');

  beforeEach(function(){
    angular.mock.module(function($provide){
      $provide.value('Task', Task);
    });
  });


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
