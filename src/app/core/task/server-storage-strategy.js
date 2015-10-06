'use strict';


module.exports = ServerStorageStrategy;

ServerStorageStrategy.$inject = [
  '$http',
  'storageConfig',
  'Task'
];


/**
 * @name ServerStorageStrategy
 *
 * @param $http
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
function ServerStorageStrategy($http, storageConfig, Task) {
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
      return $http
        .get(storageConfig.TASKS_URL)
        .then(function(response){
          return service.tasks = response.data || [];
        });
    },

    /**
     * @param {string} title
     * @async
     * @returns {ITask}
     */
    createTask: function(title) {
      var task = new Task(title);
      return $http
        .post(storageConfig.TASKS_URL, task)
        .then(function(response){
          service.tasks.push(response.data);
          return response.data;
        });
    },

    /**
     * @param {ITask} task
     * @async
     * @returns {ITask}
     */
    deleteTask: function(task) {
      service.tasks.splice(service.tasks.indexOf(task), 1);
      return $http
        .delete(storageConfig.BASE_URL + task.links.self)
        .then(function(){
          return task;
        });
    },

    /**
     * @param {ITask} task
     * @async
     * @returns {ITask}
     */
    updateTask: function(task) {
      return $http
        .put(storageConfig.BASE_URL + task.links.self, task)
        .then(function(){
          return task;
        });
    }
  };


  return service;
}
