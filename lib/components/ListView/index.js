"use strict";
/*global window: false, document: false, WinJS: false */

var $ = require("jquery");
var Presenter = require("WinningJS/lib/ui/Presenter");
var template = require("./template.jade");
var itemTemplate = require("./itemTemplate.jade");
var makeEmitter = require("pubit").makeEmitter;

module.exports = function ListView(todos) {
    var that = this;
    var element = null;
    var storage = window.localStorage;
    var todosKey = "todos";
    var publish = makeEmitter(that, { events: ["select"] });

    function storeTodo() {
        storage.setItem(todosKey, JSON.stringify(todos._getArray()));
    }

    var presenter = new Presenter({
        template: template,
        ui: {
            itemDataSource: todos.dataSource,
            itemTemplate: new WinJS.Binding.Template(itemTemplate.toElement())
        }
    });

    that.render = presenter.process;

    function convert() {
        return "hasCompleted";
    }

    // render element so we can get the wincontrol
    that.render().then(function (el) {
        var element = el.winControl;
        element.addEventListener("iteminvoked", function () {
            var count = element.selection.count();
            if (count === 0) return;

            element.selection.getItems().then(function (items) {
                items.forEach(function (item) {
                    item.data.selected = true;
                });
                publish("select");
            });
        }, false);
    });

    that.addTodo = function (todoDescription) {
        todos.push({ name: todoDescription });
        storeTodo();
    };

    that.deleteTodo = function () {
        todos.map(function (item) {
            if (item.selected === true) {
                todos.splice(todos.indexOf(item), 1);
            }
        });
        storeTodo();
    };

    that.completeTodo = function () {
        todos.map(function (item) {
            if (item.selected === true) {
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