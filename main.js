/* todo-angular v0.1.2 - 2015-10-14T23:24:20.228Z - https://github.com/r-park/todo-angular */
!function t(e,s,r){function n(a,i){if(!s[a]){if(!e[a]){var c="function"==typeof require&&require;if(!i&&c)return c(a,!0);if(o)return o(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var l=s[a]={exports:{}};e[a][0].call(l.exports,function(t){var s=e[a][1][t];return n(s?s:t)},l,l.exports,t,e,s,r)}return s[a].exports}for(var o="function"==typeof require&&require,a=0;a<r.length;a++)n(r[a]);return n}({1:[function(t,e,s){"use strict";function r(t){this.state=t}e.exports=r,r.$inject=["StateService"]},{}],2:[function(t,e,s){"use strict";function r(t,e){function s(){r.title=""}var r=this;s(),r.cancel=function(){s()},r.submit=function(){t.newTaskForm.$valid&&e.createTask(r.title),s()}}e.exports=r,r.$inject=["$scope","TaskService"]},{}],3:[function(t,e,s){"use strict";function r(t,e){var s=this;s.editing=!1,s.statusUpdated=!1,s.cancelEdit=function(){s.editing=!1},s.edit=function(){s.title=t.task.title,s.editing=!0},s["delete"]=function(){e.deleteTask(t.task)},s.save=function(){s.editing&&(t.titleForm.$valid&&t.task.title!==s.title&&(t.task.title=s.title,e.updateTask(t.task)),s.editing=!1)},s.toggleCompleted=function(){t.task.completed=!t.task.completed,e.updateTask(t.task),s.statusUpdated=t.task.completed}}e.exports=r,r.$inject=["$scope","TaskService"]},{}],4:[function(t,e,s){"use strict";e.exports=["Task",function(t){return function(e,s){var r;if(s===t.STATUS_ACTIVE)r=!1;else{if(s!==t.STATUS_COMPLETED)return e;r=!0}return e.filter(function(t){return t.completed===r})}}]},{}],5:[function(t,e,s){"use strict";function r(t){var e=this;e.tasks=[],t.getTasks().then(function(t){e.tasks=t})}e.exports=r,r.$inject=["TaskService"]},{}],6:[function(t,e,s){"use strict";function r(t,e){t.state({"abstract":!0,name:"app",views:{"":{controller:"AppController as app",templateUrl:"app/app.html"}}}).state({name:"app.tasks",url:"/tasks?filter",views:{"main@app":{templateUrl:"tasks/tasks.html"},"form@app.tasks":{controller:"TaskFormController as taskForm",templateUrl:"tasks/task-form/task-form.html"},"list@app.tasks":{controller:"TaskListController as taskList",templateUrl:"tasks/task-list/task-list.html"}}}),e.otherwise("/tasks")}e.exports=r,r.$inject=["$stateProvider","$urlRouterProvider"]},{}],7:[function(t,e,s){s.LOCAL_STORAGE_KEY="TODO-APP",s.STORAGE_STRATEGY="LocalStorageStrategy",s.BASE_URL="http://localhost:8000",s.TASKS_URL=s.BASE_URL+"/tasks"},{}],8:[function(t,e,s){"use strict";function r(t,e,s){return{params:e,isActiveTasks:function(){return t.is("app.tasks",{filter:s.STATUS_ACTIVE})},isCompletedTasks:function(){return t.is("app.tasks",{filter:s.STATUS_COMPLETED})},isTasks:function(){return t.is("app.tasks",{filter:""})},toActiveTasks:function(){return t.go("app.tasks",{filter:s.STATUS_ACTIVE})},toCompletedTasks:function(){return t.go("app.tasks",{filter:s.STATUS_COMPLETED})},toTasks:function(){return t.go("app.tasks")}}}e.exports=r,r.$inject=["$state","$stateParams","Task"]},{}],9:[function(t,e,s){"use strict";function r(t,e,s,r){function n(){e.putObject(o,a.tasks)}var o=s.LOCAL_STORAGE_KEY,a={tasks:[],getTasks:function(){return a.tasks=e.getObject(o)||[],t.resolve(a.tasks)},createTask:function(e){var s=new r(e);return a.tasks.unshift(s),n(),t.resolve(s)},deleteTask:function(e){return a.tasks.splice(a.tasks.indexOf(e),1),n(),t.resolve(e)},updateTask:function(e){return n(),t.resolve(e)}};return a}e.exports=r,r.$inject=["$q","$localStorage","storageConfig","Task"]},{}],10:[function(t,e,s){"use strict";function r(t,e,s){var r={tasks:[],getTasks:function(){return t.get(e.TASKS_URL).then(function(t){return r.tasks=t.data||[]})},createTask:function(n){var o=new s(n);return t.post(e.TASKS_URL,o).then(function(t){return r.tasks.push(t.data),t.data})},deleteTask:function(s){return r.tasks.splice(r.tasks.indexOf(s),1),t["delete"](e.BASE_URL+s.links.self).then(function(){return s})},updateTask:function(s){return t.put(e.BASE_URL+s.links.self,s).then(function(){return s})}};return r}e.exports=r,r.$inject=["$http","storageConfig","Task"]},{}],11:[function(t,e,s){"use strict";function r(t,e,s){return e.info("STORAGE_STRATEGY:",s.STORAGE_STRATEGY),t.get(s.STORAGE_STRATEGY)}e.exports=r,r.$inject=["$injector","$log","storageConfig"]},{}],12:[function(t,e,s){"use strict";function r(t){this.completed=!1,this.title=t||""}e.exports=r,r.STATUS_ACTIVE="active",r.STATUS_COMPLETED="completed"},{}],13:[function(t,e,s){"use strict";e.exports=function(){var t=27;return{restrict:"A",link:function(e,s,r){s.on("keyup",function(s){s.keyCode===t&&e.$apply(r.escape)}),e.$on("$destroy",function(){s.unbind("keyup")})}}}},{}],14:[function(t,e,s){"use strict";e.exports=["$timeout",function(t){return{restrict:"A",link:function(e,s,r){function n(){s[0].focus()}var o;e.$watch(r.focus,function(e){o&&t.cancel(o),e&&(o=t(n))})}}}]},{}],15:[function(t,e,s){"use strict";var r=angular.module("app",["angular-storage","ngAria","ui.router","templates"]).constant("storageConfig",t("./config/storage")).factory("StateService",t("./core/state/state-service")).config(t("./config/router")).value("Task",t("./core/task/task")).factory("LocalStorageStrategy",t("./core/task/local-storage-strategy")).factory("ServerStorageStrategy",t("./core/task/server-storage-strategy")).factory("TaskService",t("./core/task/task-service")).controller("AppController",t("./components/app/app-controller")).controller("TaskFormController",t("./components/tasks/task-form/task-form-controller")).controller("TaskItemController",t("./components/tasks/task-item/task-item-controller")).filter("taskStatus",t("./components/tasks/task-item/task-status-filter")).controller("TaskListController",t("./components/tasks/task-list/task-list-controller")).directive("escape",t("./directives/escape-directive")).directive("focus",t("./directives/focus-directive"));angular.element(document).ready(function(){angular.bootstrap(document,[r.name],{strictDi:!0})})},{"./components/app/app-controller":1,"./components/tasks/task-form/task-form-controller":2,"./components/tasks/task-item/task-item-controller":3,"./components/tasks/task-item/task-status-filter":4,"./components/tasks/task-list/task-list-controller":5,"./config/router":6,"./config/storage":7,"./core/state/state-service":8,"./core/task/local-storage-strategy":9,"./core/task/server-storage-strategy":10,"./core/task/task":12,"./core/task/task-service":11,"./directives/escape-directive":13,"./directives/focus-directive":14}]},{},[15]);
//# sourceMappingURL=main.js.map
