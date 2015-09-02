'use strict';

describe('stateConfig', function(){

  var stateConfig = require('app/core/state/state-config'),
      taskStatus = require('app/config/task-status');


  beforeEach(function(){
    angular.module('test', ['ui.router', 'app.templates'])
      .controller('TaskFormController', function(){})
      .controller('TaskListController', function(){})
      .config(stateConfig);

    angular.mock.module('test');
  });


  describe('`tasks` state', function(){
    it('should transition to `tasks` state', inject(function($rootScope, $state){
      $state.go('tasks.all');
      $rootScope.$digest();

      expect($state.current.name).toBe('tasks.all');
    }));
  });


  describe('`tasks.filtered` state', function(){
    describe('with status: `active`', function(){
      it('should transition to `tasks.filtered` state', inject(function($rootScope, $state){
        $state.go('tasks.filtered', {status: taskStatus.ACTIVE});
        $rootScope.$digest();
        expect($state.current.name).toBe('tasks.filtered');
      }));

      it('should set param `status` to `active`', inject(function($rootScope, $state, $stateParams){
        $state.go('tasks.filtered', {status: taskStatus.ACTIVE});
        $rootScope.$digest();
        expect($stateParams.status).toBe('active');
      }));
    });

    describe('with status: `completed`', function(){
      it('should transition to `tasks.filtered` state', inject(function($rootScope, $state){
        $state.go('tasks.filtered', {status: taskStatus.COMPLETED});
        $rootScope.$digest();
        expect($state.current.name).toBe('tasks.filtered');
      }));

      it('should set param `status` to `completed`', inject(function($rootScope, $state, $stateParams){
        $state.go('tasks.filtered', {status: taskStatus.COMPLETED});
        $rootScope.$digest();
        expect($stateParams.status).toBe('completed');
      }));
    });

    describe('with invalid `status` param', function(){
      it('should transition to default `tasks` state', inject(function($rootScope, $state){
        $state.go('tasks.filtered', {status: 'foo'});
        $rootScope.$digest();
        expect($state.current.name).toBe('tasks.all');
      }));
    });
  });

});
