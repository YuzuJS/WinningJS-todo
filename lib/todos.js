"use strict";
/*global window: false, WinJS: false */

exports.createBindingList = function () {
    var storage = window.localStorage;
    var todosKey = "todos";

    var sampleTodos = [
            { name: "Destroy Enemies.", hasCompleted: false },
            { name: "Make Friends.", hasCompleted: false },
            { name: "Conquer The World.", hasCompleted: false }
        ];

    var serializedTodos = storage.getItem(todosKey);
    var todos = !serializedTodos ? sampleTodos : JSON.parse(serializedTodos);
    return new WinJS.Binding.List(todos);
};
