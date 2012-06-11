"use strict";
/*global window: false, document: false, WinJS: false */

var $ = require("jquery");
var Presenter = require("WinningJS/lib/ui/Presenter");
var template = require("./template.jade");
var itemTemplate = require("./itemTemplate.jade");
var makeEmitter = require("pubit").makeEmitter;

module.exports = function ListView(todos) {
    var that = this;

    var storage = window.localStorage;
    var todosKey = "todos";

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
                return;
            }

            winControl.selection.getItems().then(function (items) {
                items.forEach(function (item) {
                    item.data.selected = true;
                });
                publish("select");
            });
        });
    });

    function storeTodo() {
        storage.setItem(todosKey, JSON.stringify(todos._getArray()));
    }

    that.render = presenter.process;

    that.addTodo = function (todoDescription) {
        todos.push({ name: todoDescription });
        storeTodo();
    };

    that.deleteTodo = function () {
        todos.map(function (item) {
            if (item.selected) {
                todos.splice(todos.indexOf(item), 1);
            }
        });
        storeTodo();
    };

    that.completeTodo = function () {
        todos.map(function (item) {
            if (item.selected) {
                item.hasCompleted = true;
                item.selected = false;
            }
        });
        storeTodo();
    };

    // convert into module - was testing the concept
    WinJS.Namespace.define("converters", {
        hasCompleted: WinJS.Binding.converter(function (hasCompleted) {
            return hasCompleted ? "line-through" : "";
        })
    });
};
