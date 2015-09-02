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
  $log.info('API:', apiType);
  return $injector.get(apiType);
}
