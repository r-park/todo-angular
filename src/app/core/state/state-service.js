'use strict';


module.exports = StateService;

StateService.$inject = [
  '$state',
  '$stateParams',
  'taskStatus'
];


/**
 * @name StateService
 * @param $state
 * @param $stateParams
 * @param taskStatus
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
function StateService($state, $stateParams, taskStatus) {
  return {

    /**
     * @type {Object}
     */
    params: $stateParams,

    /**
     * @returns {boolean}
     */
    isActiveTasks: function() {
      return $state.is('tasks.filtered', {status: taskStatus.ACTIVE});
    },

    /**
     * @returns {boolean}
     */
    isCompletedTasks: function() {
      return $state.is('tasks.filtered', {status: taskStatus.COMPLETED});
    },

    /**
     * @returns {boolean}
     */
    isTasks: function() {
      return $state.is('tasks.all');
    },

    /**
     * @async
     * @returns {promise}
     */
    toActiveTasks: function() {
      return $state.go('tasks.filtered', {status: taskStatus.ACTIVE});
    },

    /**
     * @async
     * @returns {promise}
     */
    toCompletedTasks: function() {
      return $state.go('tasks.filtered', {status: taskStatus.COMPLETED});
    },

    /**
     * @async
     * @returns {promise}
     */
    toTasks: function() {
      return $state.go('tasks.all');
    }

  };
}
