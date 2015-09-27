'use strict';


module.exports = ['$timeout', function($timeout){
  return {
    restrict: 'A',

    link: function(scope, $element, attrs) {
      var timeout;

      function doFocus() {
        $element[0].focus();
      }

      scope.$watch(attrs.focus, function(focus){
        if (timeout) $timeout.cancel(timeout);
        if (focus) timeout = $timeout(doFocus);
      });
    }
  };
}];
