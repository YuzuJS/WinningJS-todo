"use strict";
/*global window */

var mixinComponent = require("WinningJS/lib/ui/component").mixin;
var template = require("./template.jade");
var $ = require("jquery");

// Hardcoding todos for now :)
var sampleTodos = [
    { name: "Destroy Enemies." },
    { name: "Make Friends." },
    { name: "Conquer The World." }
];


module.exports = function List() {
    var that = this;
    var element = null;
    var storage = window.localStorage;
    var todos = {};

    function initialize() {
        var serializedTodos = storage.todos;
        todos = !serializedTodos ? sampleTodos : JSON.parse(serializedTodos);
    }

    mixinComponent(that, {
        template: function () {
            return template({ list: todos });
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

    initialize();
};
