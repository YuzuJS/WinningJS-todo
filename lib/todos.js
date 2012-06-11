"use strict";
/*global WinJS: false */

var sampleTodos = [
        { name: "Destroy Enemies.", hasCompleted: false },
        { name: "Make Friends.", hasCompleted: false },
        { name: "Conquer The World.", hasCompleted: false }
    ];

exports.createBindingList = function (initialItems) {
    var todos = initialItems.length === 0 ? sampleTodos : initialItems;
    return new WinJS.Binding.List(todos);
};
