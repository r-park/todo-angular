'use strict';

describe('TaskItemController', function(){
  var TaskItemController = require('app/components/tasks/task-item/task-item-controller');

  var controller,
      scope,
      taskService;


  beforeEach(function(){
    inject(function($controller, $q, $rootScope){
      scope = $rootScope.$new();
      scope.task = {completed: false, title: 'test'};
      scope.titleForm = {$valid: true};

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

    it('should set property `statusUpdated` to be `false`', function(){
      expect(controller.statusUpdated).toBe(false);
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

    it('should define a `save` function', function(){
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


  describe('Updating task title', function(){
    describe('when in edit mode', function() {
      it('should save title if form is valid and title has changed', function(){
        controller.editing = true;
        controller.title = 'changed title';
        controller.save();
        scope.$digest();
        expect(taskService.updateTask.callCount).toBe(1);
      });

      it('should not save title if form is invalid and title has changed', function(){
        controller.editing = true;
        controller.title = 'changed title';
        scope.titleForm.$valid = false;
        controller.save();
        scope.$digest();
        expect(taskService.updateTask.callCount).toBe(0);
      });

      it('should not save title if form is valid and title has not changed', function(){
        controller.editing = true;
        controller.title = scope.task.title;
        controller.save();
        scope.$digest();
        expect(taskService.updateTask.callCount).toBe(0);
      });

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

      it('should always set `editing` to `false` upon completion', function(){
        controller.editing = true;
        controller.save();
        scope.$digest();
        expect(controller.editing).toBe(false);
      });

      it('should do nothing when not in edit mode', function(){
        controller.save();
        scope.$digest();
        expect(taskService.updateTask.callCount).toBe(0);
      });
    });
  });


  describe('Updating task status', function(){
    it('should delegate to TaskService#updateTask', function(){
      controller.toggleCompleted();
      expect(taskService.updateTask.callCount).toBe(1);
    });

    it('should toggle `statusModified` value', function(){
      expect(controller.statusUpdated).toBe(false);

      controller.toggleCompleted();
      expect(controller.statusUpdated).toBe(true);

      controller.toggleCompleted();
      expect(controller.statusUpdated).toBe(false);
    });
  });

});
