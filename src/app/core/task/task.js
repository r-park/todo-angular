'use strict';


module.exports = Task;

/**
 * @constructor
 * @name Task
 * @param {string} [title]
 */
function Task(title) {
  // @type boolean
  this.completed = false;

  // @type string
  this.title = title || '';
}
