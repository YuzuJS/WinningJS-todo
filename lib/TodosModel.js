"use strict";
/*global WinJS: false */

var ko = require("knockoutify");

function Todo(name, hasCompleted) {
    var that = this;
    name = ko.observable(name);
    hasCompleted = ko.observable(hasCompleted);

    Object.defineProperties(that, {
        name: {
            get: function () { return name(); },
            set: function (val) { name(val); },
            enumerable: true
        },
        hasCompleted: {
            get: function () { return hasCompleted(); },
            set: function (val) { hasCompleted(val); },
            enumerable: true
        }
    });
}

var sampleTodos = [
        new Todo("Destroy Enemies.", false),
        new Todo("Make Friends.", false),
        new Todo("Conquer The World.", false)
    ];

// I envision the serialization happening by someone who listens to events triggered by this model?
// Or should the model serialize itself?

module.exports = function TodosModel(initialItems) {
    var that = this;

    var initialTodos = initialItems.length === 0 ? sampleTodos : initialItems;
    var bindingList = new WinJS.Binding.List(initialTodos);

    that.dataSource = bindingList.dataSource;

    that.add = function (name) {
        bindingList.push(new Todo(name, false));
    };

    that.delete = function (key) {
        console.log("deleting!", key);
        bindingList.splice(bindingList.indexOfKey(key), 1);
    };

    that.complete = function (key) {
        // TODO we can update the property if we want, but how to reflect it in UI? Probably need to make
        // `completed` model property a `ko.observable`.
//      var item = bindingList.getItemFromKey(key);
        console.log("completing!", key);
    };
};
