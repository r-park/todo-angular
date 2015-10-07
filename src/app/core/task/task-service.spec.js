'use strict';

describe('TaskService', function(){
  var storageConfig = require('app/config/storage');
  var TaskService = require('./task-service');
  var LocalStorageStrategy = {};
  var ServerStorageStrategy = {};


  describe('LocalStorageStrategy', function(){
    beforeEach(function(){
      var config = angular.copy(storageConfig);
      config.STORAGE_STRATEGY = 'LocalStorageStrategy';

      angular.mock.module(function($provide){
        $provide.constant('storageConfig', config);
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
      var config = angular.copy(storageConfig);
      config.STORAGE_STRATEGY = 'ServerStorageStrategy';

      angular.mock.module(function($provide){
        $provide.constant('storageConfig', config);
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
