'use strict';

describe('TaskItemController', function(){

  var TaskItemController = require('app/components/task-item/task-item-controller');

  var controller,
      scope,
      taskService;


  beforeEach(function(){
    inject(function($controller, $q, $rootScope){
      scope = $rootScope.$new();
      scope.task = {completed: false, title: 'test'};

      taskService = {
        tasks: [],
        deleteTask: function() { return $q.resolve(); },
        updateTask: function() { return $q.resolve(); }
      };

      sinon.spy(taskService, 'deleteTask');
      sinon.spy(taskService, 'updateTask');

      controller = $controller(TaskItemController, {
        $scope: scope,
        TaskService: taskService
      });
    });
  });


  describe('Initialization', function(){
    it('should set property `editing` to be `false`', function(){
      expect(controller.editing).toBe(false);
    });

    it('should define a `cancelEdit` function', function(){
      expect(typeof controller.cancelEdit).toBe('function');
    });

    it('should define a `edit` function', function(){
      expect(typeof controller.edit).toBe('function');
    });

    it('should define a `delete` function', function(){
      expect(typeof controller.delete).toBe('function');
    });

    it('should define an `update` function', function(){
      expect(typeof controller.save).toBe('function');
    });

    it('should define a `toggleCompleted` function', function(){
      expect(typeof controller.toggleCompleted).toBe('function');
    });
  });


  describe('Editing a task', function(){
    it('should set `editing` to `true`', function(){
      controller.edit();
      expect(controller.editing).toBe(true);
    });

    it('should set `title` to equal `scope.task.title`', function(){
      controller.edit();
      expect(controller.title).toBe(scope.task.title);
    });
  });


  describe('Canceling edit mode', function(){
    it('should set `editing` to `false`', function(){
      controller.editing = true;
      controller.cancelEdit();
      expect(controller.editing).toBe(false);
    });
  });


  describe('Deleting a task', function(){
    it('should delegate to TaskService#deleteTask', function(){
      controller.delete();
      scope.$digest();
      expect(taskService.deleteTask.callCount).toBe(1);
    });

    it('should pass task object to TaskService#deleteTask', function(){
      controller.delete();
      scope.$digest();
      expect(taskService.deleteTask.calledWith(scope.task)).toBe(true);
    });
  });


  describe('Updating a task', function(){
    it('should set `editing` to `false`', function(){
      controller.editing = true;
      controller.save();
      scope.$digest();
      expect(controller.editing).toBe(false);
    });

    describe('when `editing` is `false`', function(){
      it('should do nothing', function(){
        controller.save();
        scope.$digest();
        expect(taskService.updateTask.callCount).toBe(0);
      });
    });

    describe('when `editing` is `true` and title has changed', function(){
      it('should delegate to TaskService#updateTask', function(){
        controller.editing = true;
        controller.title = 'foo';
        controller.save();
        scope.$digest();
        expect(taskService.updateTask.callCount).toBe(1);
      });

      it('should pass task object to TaskService#updateTask', function(){
        controller.editing = true;
        controller.title = 'foo';
        controller.save();
        scope.$digest();
        expect(taskService.updateTask.calledWith(scope.task)).toBe(true);
      });
    });

    describe('when `editing` is `true` and title has not changed', function(){
      it('should do nothing', function(){
        controller.editing = true;
        controller.title = scope.task.title;
        controller.save();
        scope.$digest();
        expect(taskService.updateTask.callCount).toBe(0);
      });
    });
  });


  describe('Toggling task status', function(){
    it('should delegate to TaskService#updateTask', function(){
      controller.toggleCompleted();
      expect(taskService.updateTask.callCount).toBe(1);
    });
  });

});
