"use strict";
/*global WinJS: false */

var Q = require("q");
var $ = require("jquery");
var Presenter = require("WinningJS/lib/ui/Presenter");
var template = require("./template.jade");
var itemTemplate = require("./itemTemplate.jade");
var makeEmitter = require("pubit").makeEmitter;

module.exports = function TodosPageTodoList(todos, showCommands) {
    var that = this;

    var presenter = new Presenter({
        template: template,
        ui: {
            itemDataSource: todos.dataSource,
            itemTemplate: new WinJS.Binding.Template(itemTemplate.toElement())
        }
    });

    presenter.winControl.then(function (winControl) {
        winControl.addEventListener("iteminvoked", function () {
            // Note a few wierd things: `getItems()` returns a promise, and the array it returns is of `{ key, data }`
            // objects, not just the elements of the collection. Think about how we want to deal with this.
            var items = Q.when(winControl.selection.getItems());

            showCommands("todos-selected", items);
        });
    });

    that.render = presenter.process;
};
