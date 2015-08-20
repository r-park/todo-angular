'use strict';


module.exports = ['keyCodes', function(keyCodes){
  return {
    restrict: 'A',

    link: function(scope, $element, attrs) {
      $element.on('keyup', function(event){
        if (event.keyCode === keyCodes.ESCAPE) {
          scope.$apply(attrs.escape);
        }
      });

      scope.$on('$destroy', function(){
        $element.unbind('keyup');
      });
    }
  };
}];
