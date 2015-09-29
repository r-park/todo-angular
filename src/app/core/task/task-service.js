'use strict';


module.exports = TaskService;

TaskService.$inject = [
  '$injector',
  '$log',
  'storageConfig'
];


/**
 * @name TaskService
 *
 * @param $injector
 * @param $log
 * @param storageConfig
 *
 * @returns {{
 *   tasks: Array,
 *   getTasks: Function,
 *   createTask: Function,
 *   deleteTask: Function,
 *   updateTask: Function
 * }}
 */
function TaskService($injector, $log, storageConfig) {
  $log.info('STORAGE_STRATEGY:', storageConfig.STORAGE_STRATEGY);
  return $injector.get(storageConfig.STORAGE_STRATEGY);
}
