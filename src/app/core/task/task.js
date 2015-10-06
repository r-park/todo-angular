'use strict';


/**
 * @typedef {Object} ITask
 * @property {boolean} completed
 * @property {number}  createdAt
 * @property {string}  title
 */


module.exports = Task;

/**
 * @name Task
 * @constructor
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
