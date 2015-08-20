'use strict';

describe('TaskListController', function(){

  var TaskListController = require('app/components/task-list/task-list-controller');

  var controller,
      scope,
      stateService,
      taskService;


  beforeEach(function(){
    inject(function($controller, $q, $rootScope){
      scope = $rootScope.$new();

      stateService = {};

      taskService = {
        tasks: [],
        getTasks: function() { return $q.resolve([]); }
      };

      controller = $controller(TaskListController, {
        $scope: scope,
        StateService: stateService,
        TaskService: taskService
      });
    });
  });


  describe('Initialization', function(){
    it('should set `scope.state` with stateService', function(){
      expect(scope.state).toBe(stateService);
    });

    it('should set property `tasks` with an array', function(){
      scope.$digest();
      expect(Array.isArray(controller.tasks)).toBe(true);
    });
  });

});
