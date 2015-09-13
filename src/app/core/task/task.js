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

/**
 * @const
 * @type {string}
 */
Task.STATUS_ACTIVE = 'active';

/**
 * @const
 * @type {string}
 */
Task.STATUS_COMPLETED = 'completed';
