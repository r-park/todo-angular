'use strict';


module.exports = StateService;

StateService.$inject = [
  '$state',
  '$stateParams',
  'Task'
];


/**
 * @name StateService
 * @param $state
 * @param $stateParams
 * @param Task
 * @returns {{
 *   params: Object,
 *   isActiveTasks: Function,
 *   isCompletedTasks: Function,
 *   isTasks: Function,
 *   toActiveTasks: Function,
 *   toCompletedTasks: Function,
 *   toTasks: Function
 * }}
 */
function StateService($state, $stateParams, Task) {
  return {

    /**
     * @type {Object}
     */
    params: $stateParams,

    /**
     * @returns {boolean}
     */
    isActiveTasks: function() {
      return $state.is('app.tasks', {filter: Task.STATUS_ACTIVE});
    },

    /**
     * @returns {boolean}
     */
    isCompletedTasks: function() {
      return $state.is('app.tasks', {filter: Task.STATUS_COMPLETED});
    },

    /**
     * @returns {boolean}
     */
    isTasks: function() {
      return $state.is('app.tasks', {filter: ''});
    },

    /**
     * @async
     * @returns {promise}
     */
    toActiveTasks: function() {
      return $state.go('app.tasks', {filter: Task.STATUS_ACTIVE});
    },

    /**
     * @async
     * @returns {promise}
     */
    toCompletedTasks: function() {
      return $state.go('app.tasks', {filter: Task.STATUS_COMPLETED});
    },

    /**
     * @async
     * @returns {promise}
     */
    toTasks: function() {
      return $state.go('app.tasks');
    }

  };
}
