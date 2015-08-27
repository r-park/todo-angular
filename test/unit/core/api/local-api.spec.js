'use strict';

describe('LocalApi', function(){

  var LocalApi = require('app/core/api/local-api'),
      Task = require('app/core/task/task');

  var storageKey = 'test';


  beforeEach(function(){
    angular.mock.module('angular-storage', function($provide){
      $provide.constant('localStorageKey', storageKey);
      $provide.value('Task', Task);
      $provide.factory('api', LocalApi);
    });
  });

  afterEach(function(){
    localStorage.clear();
  });


  function taskInStorage(task) {
    var list = JSON.parse(localStorage.getItem(storageKey));
    return list.some(function(item){
      return item.title === task.title;
    });
  }


  describe('Creating a task', function(){
    it('should add task to `tasks` array', inject(function($rootScope, api){
      var title = 'test';

      api.tasks = [];
      api.createTask(title);
      $rootScope.$digest();

      expect(api.tasks[0].title).toBe(title);
    }));

    it('should add task to localStorage', inject(function($rootScope, api){
      var title = 'test';

      api.tasks = [];
      api.createTask(title);
      $rootScope.$digest();

      expect(taskInStorage(api.tasks[0])).toBe(true);
    }));

    it('should fulfill promise with the newly created task', inject(function($rootScope, api){
      var title = 'test';

      api
        .createTask(title)
        .then(function(task){
          expect(task.title).toBe(title);
        });

      $rootScope.$digest();
    }));
  });


  describe('Deleting a task', function(){
    it('should remove task from `tasks` array', inject(function($rootScope, api){
      var task = {title: 'test'};

      api.tasks = [task];
      api.deleteTask(task);
      $rootScope.$digest();

      expect(api.tasks.length).toBe(0);
    }));

    it('should remove task from localStorage', inject(function($rootScope, api){
      var task = {title: 'test'};

      api.tasks = [task];
      localStorage.setItem(storageKey, JSON.stringify(api.tasks));

      api.deleteTask(task);
      $rootScope.$digest();

      expect(taskInStorage(task)).toBe(false);
    }));

    it('should fulfill promise with the deleted task', inject(function($rootScope, api){
      var task = {title: 'test'};

      api
        .deleteTask(task)
        .then(function($task){
          expect($task).toBe(task);
        });

      $rootScope.$digest();
    }));
  });


  describe('Updating a task', function(){
    it('should update task in `tasks` array', inject(function($rootScope, api){
      var task = {title: 'test'};

      api.tasks = [task];

      task.title = 'foo';

      api.updateTask(task);
      $rootScope.$digest();

      expect(api.tasks[0]).toBe(task);
    }));

    it('should update task in localStorage', inject(function($rootScope, api){
      var task = {title: 'test'};

      api.tasks = [task];
      localStorage.setItem(storageKey, JSON.stringify(api.tasks));

      task.title = 'foo';

      api.updateTask(task);
      $rootScope.$digest();

      expect(taskInStorage(task)).toBe(true);
    }));

    it('should fulfill promise with the updated task', inject(function($rootScope, api){
      var task = {title: 'test'};

      api
        .updateTask(task)
        .then(function($task){
          expect($task).toBe(task);
        });

      $rootScope.$digest();
    }));
  });


  describe('Getting tasks from localStorage', function(){
    it('should set `tasks` with an array of tasks from localStorage', inject(function($rootScope, api){
      localStorage.setItem(storageKey, JSON.stringify([{title: 'task1'}, {title: 'task2'}]));

      api.getTasks();
      $rootScope.$digest();

      expect(Array.isArray(api.tasks)).toBe(true);
      expect(api.tasks.length).toBe(2);
    }));

    it('should set `tasks` with an empty array if localStorage is empty', inject(function($rootScope, api){
      api.getTasks();
      $rootScope.$digest();

      expect(Array.isArray(api.tasks)).toBe(true);
      expect(api.tasks.length).toBe(0);
    }));

    it('should fulfill promise with an array of tasks', inject(function($rootScope, api){
      localStorage.setItem(storageKey, JSON.stringify([{title: 'task1'}, {title: 'task2'}]));

      api
        .getTasks()
        .then(function(tasks){
          expect(Array.isArray(tasks)).toBe(true);
          expect(tasks.length).toBe(2);
        });

      $rootScope.$digest();
    }));

    it('should fulfill promise with an empty array if there are no tasks', inject(function($rootScope, api){
      api
        .getTasks()
        .then(function(tasks){
          expect(Array.isArray(tasks)).toBe(true);
          expect(tasks.length).toBe(0);
        });

      $rootScope.$digest();
    }));
  });

});
