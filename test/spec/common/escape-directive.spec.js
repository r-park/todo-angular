'use strict';

describe('escape directive', function(){

  var escapeDirective = require('app/common/escape-directive'),
      keyCodes = require('app/constants/key-codes');

  var element,
      scope;


  beforeEach(function(){
    angular
      .module('test', [])
      .constant('keyCodes', keyCodes)
      .directive('escape', escapeDirective);

    angular.mock.module('test');

    inject(function($rootScope, $compile){
      scope = $rootScope.$new();
      scope.escapeHandler = sinon.spy();

      element = $compile('<input escape="escapeHandler()" type="text">')(scope);
      scope.$digest();
    });
  });


  function triggerKeyup(element, keyCode) {
    var event = new Event('keyup');
    event.keyCode = keyCode;
    element[0].dispatchEvent(event);
  }


  it('should call handler function when escape key is released (keyup event)', function(){
    triggerKeyup(element, keyCodes.ESCAPE);
    expect(scope.escapeHandler.callCount).toBe(1);
  });


  it('should unbind from `keyup` event when scope is destroyed', function(){
    triggerKeyup(element, keyCodes.ESCAPE);
    expect(scope.escapeHandler.callCount).toBe(1);

    scope.$destroy();

    triggerKeyup(element, keyCodes.ESCAPE);
    expect(scope.escapeHandler.callCount).toBe(1);
  });

});
