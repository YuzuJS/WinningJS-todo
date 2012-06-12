"use strict";
/*global WinJS: false */

var sampleTodos = [
        { name: "Destroy Enemies.", hasCompleted: false },
        { name: "Make Friends.", hasCompleted: false },
        { name: "Conquer The World.", hasCompleted: false }
    ];

module.exports = function TodosModel(initialItems) {
    var that = this;

    var initialTodos = initialItems.length === 0 ? sampleTodos : initialItems;
    var bindingList = new WinJS.Binding.List(initialTodos);

    that.dataSource = bindingList.dataSource;

    that.add = function (name) {
        bindingList.push({ name: name });
    };
};
