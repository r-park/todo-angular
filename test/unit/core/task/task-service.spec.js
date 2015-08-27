'use strict';

describe('TaskService', function(){

  var TaskService = require('app/core/task/task-service');
  var LocalApi = {};
  var ServerApi = {};


  describe('local api', function(){
    beforeEach(function(){
      angular.mock.module(function($provide){
        $provide.constant('apiType', {SERVER: false});
        $provide.value('LocalApi', LocalApi);
        $provide.value('ServerApi', ServerApi);
        $provide.factory('taskService', TaskService);
      });
    });

    it('should implement local api', inject(function(taskService){
      expect(taskService).toBe(LocalApi);
    }));
  });


  describe('server api', function(){
    beforeEach(function(){
      angular.mock.module(function($provide){
        $provide.constant('apiType', {SERVER: true});
        $provide.value('LocalApi', LocalApi);
        $provide.value('ServerApi', ServerApi);
        $provide.factory('taskService', TaskService);
      });
    });

    it('should implement server api', inject(function(taskService){
      expect(taskService).toBe(ServerApi);
    }));
  });

});
