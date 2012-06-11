"use strict";
/*global WinJS: false */

var $ = require("jquery");
var Presenter = require("WinningJS/lib/ui/Presenter");
var template = require("./template.jade");
var itemTemplate = require("./itemTemplate.jade");
var makeEmitter = require("pubit").makeEmitter;

module.exports = function ListView(todos, storage, bottomAppBar) {
    var that = this;

    var publish = makeEmitter(that, ["select"]);
    var presenter = new Presenter({
        template: template,
        ui: {
            itemDataSource: todos.dataSource,
            itemTemplate: new WinJS.Binding.Template(itemTemplate.toElement())
        }
    });

    presenter.winControl.then(function (winControl) {
        winControl.addEventListener("iteminvoked", function () {
            var count = winControl.selection.count();
            if (count === 0) {
                bottomAppBar.hide();
                return;
            }

            winControl.selection.getItems().then(function (items) {
                items.forEach(function (item) {
                    item.data.selected = true;
                });
                bottomAppBar.showCommands();
                publish("select");
            });
        });
    });

    function saveTodos() {
        storage.saveTodos(todos._getArray());
    }

    that.render = presenter.process;

    that.addTodo = function (todoDescription) {
        todos.push({ name: todoDescription });
        saveTodos();
    };

    that.deleteTodo = function () {
        todos.forEach(function (item) {
            if (item.selected) {
                todos.splice(todos.indexOf(item), 1);
            }
        });
        saveTodos();
    };

    that.completeTodo = function () {
        todos.forEach(function (item) {
            if (item.selected) {
                item.hasCompleted = true;
                item.selected = false;
            }
        });
        saveTodos();
    };

    // convert into module - was testing the concept
    WinJS.Namespace.define("converters", {
        hasCompleted: WinJS.Binding.converter(function (hasCompleted) {
            return hasCompleted ? "line-through" : "";
        })
    });
};
