"use strict";

module.exports = function Storage(backingStore) {
    var that = this;

    that.saveTodos = function (todos) {
        backingStore.todos = JSON.stringify(todos);
    };

    that.loadTodos = function () {
        var todos = backingStore.todos || "[]";
        return JSON.parse(todos);
    };
};
