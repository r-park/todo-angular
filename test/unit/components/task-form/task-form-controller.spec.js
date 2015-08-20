'use strict';

describe('TaskFormController', function(){

  var TaskFormController = require('app/components/task-form/task-form-controller');

  var controller,
      scope,
      taskService;


  beforeEach(function(){
    inject(function($controller, $q, $rootScope){
      scope = $rootScope.$new();
      scope.newTaskForm = {$valid: true};

      taskService = {
        createTask: function(task) {
          return $q.resolve(task);
        }
      };

      sinon.spy(taskService, 'createTask');

      controller = $controller(TaskFormController, {
        $scope: scope,
        TaskService: taskService
      });
    });
  });


  describe("Initialization", function(){
    it("should set property `title` with an empty string", function(){
      expect(controller.title).toBe('');
    });

    it("should define a `cancel` function", function(){
      expect(typeof controller.cancel).toBe('function');
    });

    it("should define a `submit` function", function(){
      expect(typeof controller.submit).toBe('function');
    });
  });


  describe("Creating a task", function(){
    describe('when form is valid', function(){
      it("should delegate to TaskService#createTask", function(){
        controller.submit();
        scope.$digest();
        expect(taskService.createTask.callCount).toBe(1);
      });

      it("should pass value of `title` to TaskService#createTask", function(){
        var title = 'foo';
        controller.title = title;
        controller.submit();
        scope.$digest();
        expect(taskService.createTask.calledWith(title)).toBe(true);
      });

      it("should set `title` with an empty string when create is successful", function(){
        controller.title = 'foo';
        controller.submit();
        scope.$digest();
        expect(controller.title).toBe('');
      });
    });

    describe('when form is invalid', function(){
      it("should do nothing", function(){
        scope.newTaskForm.$valid = false;
        controller.submit();
        scope.$digest();
        expect(taskService.createTask.callCount).toBe(0);
      });
    });
  });


  describe("Cancelling", function(){
    it("should set `title` with an empty string", function(){
      controller.title = 'foo';
      controller.cancel();
      expect(controller.title).toBe('');
    });
  });

});
