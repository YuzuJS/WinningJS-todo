"use strict";

module.exports = function TodosPageAppBarViewModel(todos) {
    var that = this;

    that.selectedTodos = null;

    that.deleteSelected = function () {
        that.selectedTodos.then(function (selectedTodos) {
            selectedTodos.forEach(function (selectedTodo) {
                todos.delete(selectedTodo.key);
            });
        });
    };

    that.completeSelected = function () {
        that.selectedTodos.then(function (selectedTodos) {
            selectedTodos.forEach(function (selectedTodo) {
                // Or should this be `selectedTodo.complete = true`, with a `todos.save()` at the end?
                todos.complete(selectedTodo.key);
            });
        });
    };
};
