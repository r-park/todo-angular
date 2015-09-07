'use strict';

describe('StateService', function(){

  var stateConfig = require('app/core/state/state-config'),
      StateService = require('app/core/state/state-service'),
      Task = require('app/core/task/task');


  beforeEach(function(){
    angular.module('test', ['ui.router', 'templates'])
      .value('Task', Task)
      .factory('stateService', StateService)
      .controller('AppController', angular.noop)
      .controller('TaskFormController', angular.noop)
      .controller('TaskListController', angular.noop)
      .config(stateConfig);

    angular.mock.module('test');
  });


  describe('#isActiveTasks()', function(){
    it('should return true if current state matches', inject(function($rootScope, $state, stateService){
      $state.go('app.tasks.filtered', {status: Task.STATUS_ACTIVE});
      $rootScope.$digest();
      expect(stateService.isActiveTasks()).toBe(true);
    }));

    it('should return false if current does not match', inject(function($rootScope, $state, stateService){
      $state.go('app.tasks.filtered', {status: Task.STATUS_COMPLETED});
      $rootScope.$digest();
      expect(stateService.isActiveTasks()).toBe(false);
    }));
  });


  describe('#isCompletedTasks()', function(){
    it('should return true if current state matches', inject(function($rootScope, $state, stateService){
      $state.go('app.tasks.filtered', {status: Task.STATUS_COMPLETED});
      $rootScope.$digest();
      expect(stateService.isCompletedTasks()).toBe(true);
    }));

    it('should return false if current does not match', inject(function($rootScope, $state, stateService){
      $state.go('app.tasks.filtered', {status: Task.STATUS_ACTIVE});
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

    it('should return false if current does not match', inject(function($rootScope, $state, stateService){
      $state.go('app.tasks.filtered', {status: Task.STATUS_COMPLETED});
      $rootScope.$digest();
      expect(stateService.isTasks()).toBe(false);
    }));
  });


  describe('#toActiveTasks()', function(){
    it('should go to requested state', inject(function($rootScope, $state, $stateParams, stateService){
      stateService.toActiveTasks();
      $rootScope.$digest();

      expect($state.current.name).toBe('app.tasks.filtered');
      expect($stateParams.status).toBe(Task.STATUS_ACTIVE);
    }));

    it('should set `params.status` to `active`', inject(function($rootScope, $state, $stateParams, stateService){
      stateService.toActiveTasks();
      $rootScope.$digest();

      expect(stateService.params.status).toBe(Task.STATUS_ACTIVE);
    }));
  });


  describe('#toCompletedTasks()', function(){
    it('should go to requested state', inject(function($rootScope, $state, $stateParams, stateService){
      stateService.toCompletedTasks();
      $rootScope.$digest();

      expect($state.current.name).toBe('app.tasks.filtered');
      expect($stateParams.status).toBe(Task.STATUS_COMPLETED);
    }));

    it('should set `params.status` to `completed`', inject(function($rootScope, $state, $stateParams, stateService){
      stateService.toCompletedTasks();
      $rootScope.$digest();

      expect(stateService.params.status).toBe(Task.STATUS_COMPLETED);
    }));
  });


  describe('#toTasks()', function(){
    it('should go to requested state', inject(function($rootScope, $state, $stateParams, stateService){
      stateService.toTasks();
      $rootScope.$digest();

      expect($state.current.name).toBe('app.tasks');
      expect($stateParams.status).not.toBeDefined();
    }));

    it('should not set `params.status`', inject(function($rootScope, $state, $stateParams, stateService){
      stateService.toTasks();
      $rootScope.$digest();

      expect(stateService.params.status).not.toBeDefined();
    }));
  });

});
