"use strict";
/*global WinJS: false */

var Q = require("q");
var Presenter = require("WinningJS/lib/ui/Presenter");
var template = require("./template.jade");
var itemTemplate = require("./itemTemplate.jade");

module.exports = function TodosPageTodoList(todos, showCommands) {
    var that = this;

    // Keeping view model logic inside our component for now, because it is really just one function
    // Might move out, if presenter or view logic requires more logic.
    function selectItems(winControl) {
        // Note a few wierd things: `getItems()` returns a promise, and the array it returns is of `{ key, data }`
        // objects, not just the elements of the collection. Think about how we want to deal with this.
        console.log("[TodosPageTodoList] selectItems");
        var items = Q.when(winControl.selection.getItems());
        showCommands("todos-selected", items);
    }

    var presenter = new Presenter({
        template: template,
        ui: {
            itemDataSource: todos.dataSource,
            itemTemplate: new WinJS.Binding.Template(itemTemplate.toElement())
        },
        viewModel: { selectItems: selectItems }
    });

    that.render = presenter.process;
};
