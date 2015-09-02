'use strict';

describe('TaskService', function(){
  var TaskService = require('app/core/task/task-service');
  var LocalStorageApi = {};
  var ServerApi = {};


  describe('local api', function(){
    beforeEach(function(){
      angular.mock.module(function($provide){
        $provide.constant('apiType', 'LocalStorageApi');
        $provide.value('LocalStorageApi', LocalStorageApi);
        $provide.value('ServerApi', ServerApi);
        $provide.factory('taskService', TaskService);
      });
    });

    it('should implement local api', inject(function(taskService){
      expect(taskService).toBe(LocalStorageApi);
    }));
  });


  describe('server api', function(){
    beforeEach(function(){
      angular.mock.module(function($provide){
        $provide.constant('apiType', 'ServerApi');
        $provide.value('LocalStorageApi', LocalStorageApi);
        $provide.value('ServerApi', ServerApi);
        $provide.factory('taskService', TaskService);
      });
    });

    it('should implement server api', inject(function(taskService){
      expect(taskService).toBe(ServerApi);
    }));
  });

});
