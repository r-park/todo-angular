'use strict';


module.exports = LocalStorageStrategy;

LocalStorageStrategy.$inject = [
  '$q',
  '$localStorage',
  'storageConfig',
  'Task'
];


/**
 * @name LocalStorageStrategy
 *
 * @param $q
 * @param $localStorage
 * @param storageConfig
 * @param Task
 *
 * @returns {{
 *   tasks: Array,
 *   getTasks: Function,
 *   createTask: Function,
 *   deleteTask: Function,
 *   updateTask: Function
 * }}
 */
function LocalStorageStrategy($q, $localStorage, storageConfig, Task) {
  var key = storageConfig.LOCAL_STORAGE_KEY;


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
      service.tasks = $localStorage.getObject(key) || [];
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
     * @returns {ITask}
     */
    deleteTask: function(task) {
      service.tasks.splice(service.tasks.indexOf(task), 1);
      save();
      return $q.resolve(task);
    },

    /**
     * @param {ITask} task
     * @async
     * @returns {ITask}
     */
    updateTask: function(task) {
      save();
      return $q.resolve(task);
    }
  };


  function save() {
    $localStorage.putObject(key, service.tasks);
  }


  return service;
}
