'use strict';


module.exports = TaskService;

TaskService.$inject = [
  '$injector',
  '$log',
  'apiType'
];


/**
 * @name TaskService
 * @param $injector
 * @param $log
 * @param {{SERVER:boolean}} apiType
 * @returns {{
 *   tasks: Array,
 *   getTasks: Function,
 *   createTask: Function,
 *   deleteTask: Function,
 *   updateTask: Function
 * }}
 */
function TaskService($injector, $log, apiType) {
  if (apiType.SERVER) {
    $log.info('API:Server');
    return $injector.get('ServerApi');
  }
  else {
    $log.info('API:Local');
    return $injector.get('LocalApi');
  }
}
