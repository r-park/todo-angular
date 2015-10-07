'use strict';

describe('StateService', function(){
  var routerConfig = require('app/config/router');
  var Task = require('app/core/task/task');
  var StateService = require('./state-service');



  beforeEach(function(){
    angular.module('test', ['ui.router', 'templates'])
      .value('Task', Task)
      .factory('stateService', StateService)
      .controller('AppController', angular.noop)
      .controller('TaskFormController', angular.noop)
      .controller('TaskListController', angular.noop)
      .config(routerConfig);

    angular.mock.module('test');
  });


  describe('#isActiveTasks()', function(){
    it('should return true if current state matches', inject(function($rootScope, $state, stateService){
      $state.go('app.tasks', {filter: Task.STATUS_ACTIVE});
      $rootScope.$digest();
      expect(stateService.isActiveTasks()).toBe(true);
    }));

    it('should return false if current state does not match', inject(function($rootScope, $state, stateService){
      $state.go('app.tasks', {filter: Task.STATUS_COMPLETED});
      $rootScope.$digest();
      expect(stateService.isActiveTasks()).toBe(false);
    }));
  });


  describe('#isCompletedTasks()', function(){
    it('should return true if current state matches', inject(function($rootScope, $state, stateService){
      $state.go('app.tasks', {filter: Task.STATUS_COMPLETED});
      $rootScope.$digest();
      expect(stateService.isCompletedTasks()).toBe(true);
    }));

    it('should return false if current state does not match', inject(function($rootScope, $state, stateService){
      $state.go('app.tasks', {filter: Task.STATUS_ACTIVE});
      $rootScope.$digest();
      expect(stateService.isCompletedTasks()).toBe(false);
    }));
  });


  describe('#isTasks()', function(){
    it('should return true if current state matches', inject(function($rootScope, $state, stateService){
      $state.go('app.tasks');
      $rootScope.$digest();
      expect(stateService.isTasks()).toBe(true);
    }));

    it('should return false if current state does not match', inject(function($rootScope, $state, stateService){
      $state.go('app.tasks', {filter: Task.STATUS_COMPLETED});
      $rootScope.$digest();
      expect(stateService.isTasks()).toBe(false);
    }));
  });


  describe('#toActiveTasks()', function(){
    it('should go to requested state', inject(function($rootScope, $state, $stateParams, stateService){
      stateService.toActiveTasks();
      $rootScope.$digest();

      expect($state.current.name).toBe('app.tasks');
      expect($stateParams.filter).toBe(Task.STATUS_ACTIVE);
    }));

    it('should set `params.filter` to `active`', inject(function($rootScope, $state, $stateParams, stateService){
      stateService.toActiveTasks();
      $rootScope.$digest();

      expect(stateService.params.filter).toBe(Task.STATUS_ACTIVE);
    }));
  });


  describe('#toCompletedTasks()', function(){
    it('should go to requested state', inject(function($rootScope, $state, $stateParams, stateService){
      stateService.toCompletedTasks();
      $rootScope.$digest();

      expect($state.current.name).toBe('app.tasks');
      expect($stateParams.filter).toBe(Task.STATUS_COMPLETED);
    }));

    it('should set `params.filter` to `completed`', inject(function($rootScope, $state, $stateParams, stateService){
      stateService.toCompletedTasks();
      $rootScope.$digest();

      expect(stateService.params.filter).toBe(Task.STATUS_COMPLETED);
    }));
  });


  describe('#toTasks()', function(){
    it('should go to requested state', inject(function($rootScope, $state, $stateParams, stateService){
      stateService.toTasks();
      $rootScope.$digest();

      expect($state.current.name).toBe('app.tasks');
      expect($stateParams.filter).not.toBeDefined();
    }));

    it('should not set `params.filter`', inject(function($rootScope, $state, $stateParams, stateService){
      stateService.toTasks();
      $rootScope.$digest();

      expect(stateService.params.filter).not.toBeDefined();
    }));
  });

});
