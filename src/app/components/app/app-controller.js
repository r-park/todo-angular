'use strict';


module.exports = AppController;

AppController.$inject = [
  'StateService'
];


function AppController(stateService) {
  this.state = stateService;
}
