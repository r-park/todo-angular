'use strict';


module.exports = LocalStorageStrategy;

LocalStorageStrategy.$inject = [
  '$q',
  '$localStorage',
  'localStorageKey',
  'Task'
];


/**
 * @name LocalStorageStrategy
 * @param $q
 * @param $localStorage
 * @param {string} localStorageKey
 * @param Task
 * @returns {{
 *   tasks: Array,
 *   getTasks: Function,
 *   createTask: Function,
 *   deleteTask: Function,
 *   updateTask: Function
 * }}
 */
function LocalStorageStrategy($q, $localStorage, localStorageKey, Task) {
  var service = {

    /**
     * @type Array
     */
    tasks: [],

    /**
     * @async
     * @returns {Array}
     */
    getTasks: function() {
      service.tasks = $localStorage.getObject(localStorageKey) || [];
      return $q.resolve(service.tasks);
    },

    /**
     * @param {string} title
     * @async
     * @returns {Task}
     */
    createTask: function(title) {
      var task = new Task(title);
      service.tasks.unshift(task);
      save();
      return $q.resolve(task);
    },

    /**
     * @param {Task} task
     * @async
     * @returns {Task}
     */
    deleteTask: function(task) {
      service.tasks.splice(service.tasks.indexOf(task), 1);
      save();
      return $q.resolve(task);
    },

    /**
     * @param {Task} task
     * @async
     * @returns {Task}
     */
    updateTask: function(task) {
      save();
      return $q.resolve(task);
    }

  };


  function save() {
    $localStorage.putObject(localStorageKey, service.tasks);
  }


  return service;
}
