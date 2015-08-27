'use strict';

describe('ServerApi', function(){

  var ServerApi = require('app/core/api/server-api'),
      Task = require('app/core/task/task');

  var api, httpBackend;


  beforeEach(function(){
    angular.mock.module(function($provide){
      $provide.value('Task', Task);
      $provide.factory('ServerApi', ServerApi);
    });

    inject(function($httpBackend, ServerApi){
      httpBackend = $httpBackend;
      api = ServerApi;
    });
  });

  afterEach(function(){
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });


  describe('Creating a task', function(){
    it('should add task to `tasks` array', function(){
      var task = {title: 'test'};

      httpBackend.whenPOST('http://localhost:8000/tasks').respond(200, task);
      api.tasks = [];
      api.createTask(task.title);
      httpBackend.flush();

      expect(api.tasks[0]).toEqual(task);
    });

    it('should POST new task to server', function(){
      var task = {completed: false, title: 'test'};
      httpBackend.expectPOST('http://localhost:8000/tasks', task).respond(200);
      api.createTask(task.title);
      httpBackend.flush();
    });

    it('should fulfill promise with the newly created task', function(){
      var task = {title: 'test'};

      httpBackend.whenPOST('http://localhost:8000/tasks').respond(200, task);

      api.createTask(task.title)
        .then(function(_task){
          expect(_task).toEqual(task);
        });

      httpBackend.flush();
    });
  });


  describe('Deleting a task', function(){
    it('should remove task from `tasks` array', function(){
      var task = new Task('test');
      task.links = {self: '/tasks/123'};

      httpBackend.whenDELETE('http://localhost:8000/tasks/123').respond(204);
      api.tasks = [task];
      api.deleteTask(task);
      httpBackend.flush();

      expect(api.tasks.length).toBe(0);
    });

    it('should DELETE task from server', function(){
      var task = new Task('test');
      task.links = {self: '/tasks/123'};

      httpBackend.expectDELETE('http://localhost:8000/tasks/123').respond(204);
      api.deleteTask(task);
      httpBackend.flush();
    });

    it('should fulfill promise with the deleted task', function(){
      var task = new Task('test');
      task.links = {self: '/tasks/123'};

      httpBackend.whenDELETE('http://localhost:8000/tasks/123').respond(204);

      api.deleteTask(task)
        .then(function(_task){
          expect(_task).toBe(task);
        });

      httpBackend.flush();
    });
  });


  describe('Updating a task', function(){
    xit('should update task in `tasks` array', function(){});

    it('should PUT task to server', function(){
      var task = new Task('test');
      task.links = {self: '/tasks/123'};

      httpBackend.expectPUT('http://localhost:8000/tasks/123', task).respond(200);
      api.updateTask(task);
      httpBackend.flush();
    });

    it('should fulfill promise with the updated task', function(){
      var task = new Task('test');
      task.links = {self: '/tasks/123'};

      httpBackend.whenPUT('http://localhost:8000/tasks/123').respond(200);

      api.updateTask(task)
        .then(function(_task){
          expect(_task).toBe(task);
        });

      httpBackend.flush();
    });
  });


  describe('Getting tasks', function(){
    it('should GET tasks from server', function(){
      httpBackend.expectGET('http://localhost:8000/tasks').respond(200, []);
      api.getTasks();
      httpBackend.flush();
    });

    it('should set `tasks` with an array of tasks from server', function(){
      httpBackend.whenGET('http://localhost:8000/tasks').respond(200, [{}, {}]);
      api.tasks = [];
      api.getTasks();
      httpBackend.flush();

      expect(api.tasks.length).toBe(2);
    });

    it('should set `tasks` with an empty array if there are no tasks', function(){
      httpBackend.whenGET('http://localhost:8000/tasks').respond(200, []);
      api.tasks = [];
      api.getTasks();
      httpBackend.flush();

      expect(api.tasks.length).toBe(0);
    });

    it('should fulfill promise with the tasks array', function(){
      httpBackend.whenGET('http://localhost:8000/tasks').respond(200, [{}, {}]);
      api.tasks = [];

      api.getTasks()
        .then(function(tasks){
          expect(tasks).toBe(api.tasks);
        });

      httpBackend.flush();
    });
  });

});
