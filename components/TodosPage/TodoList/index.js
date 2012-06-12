"use strict";
/*global WinJS: false */

var $ = require("jquery");
var Presenter = require("WinningJS/lib/ui/Presenter");
var template = require("./template.jade");
var itemTemplate = require("./itemTemplate.jade");
var makeEmitter = require("pubit").makeEmitter;

module.exports = function TodosPageTodoList(todos, setCommandContext) {
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
            var items = winControl.selection.getItems();
            setCommandContext(items);
        });
    });

    that.render = presenter.process;
};
