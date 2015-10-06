'use strict';


module.exports = AppController;

AppController.$inject = [
  'StateService'
];


/**
 * @name AppController
 * @constructor
 * @param {StateService} stateService
 */
function AppController(stateService) {
  this.state = stateService;
}
