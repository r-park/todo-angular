'use strict';

describe('stateConfig', function(){

  var stateConfig = require('app/core/state/state-config'),
      taskStatus = require('app/config/task-status');


  beforeEach(function(){
    angular.module('test', ['ui.router', 'app.templates'])
      .controller('AppController', angular.noop)
      .controller('TaskFormController', angular.noop)
      .controller('TaskListController', angular.noop)
      .config(stateConfig);

    angular.mock.module('test');
  });


  describe('`tasks` state', function(){
    it('should transition to `tasks` state', inject(function($rootScope, $state){
      $state.go('app.tasks');
      $rootScope.$digest();

      expect($state.current.name).toBe('app.tasks');
    }));
  });


  describe('`app.tasks.filtered` state', function(){
    describe('with status: `active`', function(){
      it('should transition to `app.tasks.filtered` state', inject(function($rootScope, $state){
        $state.go('app.tasks.filtered', {status: taskStatus.ACTIVE});
        $rootScope.$digest();
        expect($state.current.name).toBe('app.tasks.filtered');
      }));

      it('should set param `status` to `active`', inject(function($rootScope, $state, $stateParams){
        $state.go('app.tasks.filtered', {status: taskStatus.ACTIVE});
        $rootScope.$digest();
        expect($stateParams.status).toBe('active');
      }));
    });

    describe('with status: `completed`', function(){
      it('should transition to `app.tasks.filtered` state', inject(function($rootScope, $state){
        $state.go('app.tasks.filtered', {status: taskStatus.COMPLETED});
        $rootScope.$digest();
        expect($state.current.name).toBe('app.tasks.filtered');
      }));

      it('should set param `status` to `completed`', inject(function($rootScope, $state, $stateParams){
        $state.go('app.tasks.filtered', {status: taskStatus.COMPLETED});
        $rootScope.$digest();
        expect($stateParams.status).toBe('completed');
      }));
    });
  });

});
