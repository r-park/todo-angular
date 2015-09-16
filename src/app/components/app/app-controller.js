'use strict';


module.exports = AppController;

AppController.$inject = [
  'StateService'
];


function AppController(stateService) {
  var vm = this;

  vm.state = stateService;
}
