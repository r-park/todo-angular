'use strict';

describe('Router', function(){
  var routerConfig = require('app/router'),
      Task = require('app/core/task/task');


  beforeEach(function(){
    angular.module('test', ['ui.router', 'templates'])
      .controller('AppController', angular.noop)
      .controller('TaskFormController', angular.noop)
      .controller('TaskListController', angular.noop)
      .config(routerConfig);

    angular.mock.module('test');
  });


  describe('`tasks` state', function(){
    it('should transition to `tasks` state', inject(function($rootScope, $state){
      $state.go('app.tasks');
      $rootScope.$digest();

      expect($state.current.name).toBe('app.tasks');
    }));
  });


  describe('`app.tasks` state', function(){
    describe('with `filter=active`', function(){
      it('should transition to `app.tasks` state', inject(function($rootScope, $state){
        $state.go('app.tasks', {filter: Task.STATUS_ACTIVE});
        $rootScope.$digest();
        expect($state.current.name).toBe('app.tasks');
      }));

      it('should set query `filter` to `active`', inject(function($rootScope, $state, $stateParams){
        $state.go('app.tasks', {filter: Task.STATUS_ACTIVE});
        $rootScope.$digest();
        expect($stateParams.filter).toBe('active');
      }));
    });

    describe('with `filter=completed`', function(){
      it('should transition to `app.tasks` state', inject(function($rootScope, $state){
        $state.go('app.tasks', {filter: Task.STATUS_COMPLETED});
        $rootScope.$digest();
        expect($state.current.name).toBe('app.tasks');
      }));

      it('should set param `filter` to `completed`', inject(function($rootScope, $state, $stateParams){
        $state.go('app.tasks', {filter: Task.STATUS_COMPLETED});
        $rootScope.$digest();
        expect($stateParams.filter).toBe('completed');
      }));
    });
  });

});
