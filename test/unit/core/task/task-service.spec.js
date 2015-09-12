'use strict';

describe('TaskService', function(){
  var TaskService = require('app/core/task/task-service');
  var LocalStorageStrategy = {};
  var ServerStorageStrategy = {};


  describe('LocalStorageStrategy', function(){
    beforeEach(function(){
      angular.mock.module(function($provide){
        $provide.constant('storageStrategy', 'LocalStorageStrategy');
        $provide.value('LocalStorageStrategy', LocalStorageStrategy);
        $provide.value('ServerStorageStrategy', ServerStorageStrategy);
        $provide.factory('taskService', TaskService);
      });
    });

    it('should implement local storage strategy', inject(function(taskService){
      expect(taskService).toBe(LocalStorageStrategy);
    }));
  });


  describe('ServerStorageStrategy', function(){
    beforeEach(function(){
      angular.mock.module(function($provide){
        $provide.constant('storageStrategy', 'ServerStorageStrategy');
        $provide.value('LocalStorageStrategy', LocalStorageStrategy);
        $provide.value('ServerStorageStrategy', ServerStorageStrategy);
        $provide.factory('taskService', TaskService);
      });
    });

    it('should implement server storage strategy', inject(function(taskService){
      expect(taskService).toBe(ServerStorageStrategy);
    }));
  });

});
