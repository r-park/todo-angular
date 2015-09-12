'use strict';


module.exports = TaskService;

TaskService.$inject = [
  '$injector',
  '$log',
  'storageStrategy'
];


/**
 * @name TaskService
 * @param $injector
 * @param $log
 * @param {string} storageStrategy
 * @returns {{
 *   tasks: Array,
 *   getTasks: Function,
 *   createTask: Function,
 *   deleteTask: Function,
 *   updateTask: Function
 * }}
 */
function TaskService($injector, $log, storageStrategy) {
  $log.info('STORAGE_STRATEGY:', storageStrategy);
  return $injector.get(storageStrategy);
}
