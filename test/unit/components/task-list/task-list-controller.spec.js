'use strict';

describe('TaskListController', function(){
  var TaskListController = require('app/components/tasks/task-list/task-list-controller');

  var controller,
      scope,
      taskService;


  beforeEach(function(){
    inject(function($controller, $q, $rootScope){
      scope = $rootScope.$new();

      taskService = {
        tasks: [],
        getTasks: function() { return $q.resolve([]); }
      };

      controller = $controller(TaskListController, {
        TaskService: taskService
      });
    });
  });


  describe('Initialization', function(){
    it('should set property `tasks` with an array', function(){
      scope.$digest();
      expect(Array.isArray(controller.tasks)).toBe(true);
    });
  });

});
