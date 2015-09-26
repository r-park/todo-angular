'use strict';

describe('focus directive', function(){

  var focusDirective = require('app/common/focus-directive');

  var element,
      scope,
      timeout;


  beforeEach(function(){
    angular
      .module('test', [])
      .directive('focus', focusDirective);

    angular.mock.module('test');

    inject(function($rootScope, $compile, $timeout){
      scope = $rootScope.$new();
      scope.shouldFocus = false;

      timeout = $timeout;

      element = $compile('<input focus="shouldFocus" type="text">')(scope);
      element[0].focus = sinon.spy();

      scope.$digest();
    });
  });


  it('should focus input when attribute `focus` evaluates to `true`', function(){
    scope.shouldFocus = true;
    scope.$digest();
    timeout.flush();
    expect(element[0].focus.callCount).toBe(1);
  });
});
