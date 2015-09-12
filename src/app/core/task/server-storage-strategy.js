'use strict';


module.exports = ServerStorageStrategy;

ServerStorageStrategy.$inject = [
  '$http',
  'Task'
];


/**
 * @name ServerStorageStrategy
 * @param $http
 * @param Task
 * @returns {{
 *   tasks: Array,
 *   getTasks: Function,
 *   createTask: Function,
 *   deleteTask: Function,
 *   updateTask: Function
 * }}
 */
function ServerStorageStrategy($http, Task) {
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
        .get('http://localhost:8000/tasks')
        .then(function(response){
          return service.tasks = response.data || [];
        });
    },

    /**
     * @param {string} title
     * @async
     * @returns {Task}
     */
    createTask: function(title) {
      var task = new Task(title);
      return $http
        .post('http://localhost:8000/tasks', task)
        .then(function(response){
          service.tasks.push(response.data);
          return response.data;
        });
    },

    /**
     * @param {Task} task
     * @async
     * @returns {Task}
     */
    deleteTask: function(task) {
      service.tasks.splice(service.tasks.indexOf(task), 1);
      return $http
        .delete('http://localhost:8000' + task.links.self)
        .then(function(){
          return task;
        });
    },

    /**
     * @param {Task} task
     * @async
     * @returns {Task}
     */
    updateTask: function(task) {
      return $http
        .put('http://localhost:8000' + task.links.self, task)
        .then(function(){
          return task;
        });
    }

  };


  return service;
}
