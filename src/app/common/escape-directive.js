'use strict';


module.exports = function(){
  var ESCAPE_KEY = 27;

  return {
    restrict: 'A',

    link: function(scope, $element, attrs) {
      $element.on('keyup', function(event){
        if (event.keyCode === ESCAPE_KEY) {
          scope.$apply(attrs.escape);
        }
      });

      scope.$on('$destroy', function(){
        $element.unbind('keyup');
      });
    }
  };
};
