"use strict";
/*global window */
/*global $ */
/*global WinJS: false */

var mixinComponent = require("WinningJS/lib/ui/component").mixin;
var template = require("./template.jade");

// updated datasource to be used with the listview
var sampleTodos = [
        { name: "Destroy Enemies." },
        { name: "Make Friends." },
        { name: "Conquer The World." }
    ];

module.exports = function ListView() {
    var that = this;
    var element = null;
    var storage = window.localStorage;
    var todos = {};

    function initialize() {
        var serializedTodos = storage.todos;
        todos = dataSource(!serializedTodos ? sampleTodos : JSON.parse(serializedTodos));
    }
    
    initialize();

    function dataSource(data) {
        return new WinJS.Binding.List(data).dataSource;
    }

    mixinComponent(that, {
        template: template,
        ui: {
            itemDataSource: todos
        }
    });

    var defaultRender = that.render;
    that.render = function () {
        return defaultRender().then(function (rootElement) {
            element = rootElement;
            return rootElement;
        });
    };

    that.addTodo = function (todoDescription) {
        var previousListEl = element;
        todos.push({ name: todoDescription });

        that.render().then(function (newElement) {
            $(previousListEl).before($(newElement));
            previousListEl.parentNode.removeChild(previousListEl);
            storage.todos = JSON.stringify(todos);
        });
    };

    
};