'use strict';

describe('AppController', function(){
  var AppController = require('app/components/app/app-controller');

  var controller,
      stateService;


  beforeEach(function(){
    inject(function($controller){
      stateService = {};

      controller = $controller(AppController, {
        StateService: stateService
      });
    });
  });


  describe('Initialization', function(){
    it('should set `controller.state` with stateService', function(){
      expect(controller.state).toBe(stateService);
    });
  });

});
