"use strict";
/*global window: false, document: false, WinJS: false */

var $ = require("jquery");
var mixinComponent = require("WinningJS/lib/ui/component").mixin;
var template = require("./template.jade");
var itemTemplate = require("./itemTemplate.jade");

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
        todos = getDataSource(!serializedTodos ? sampleTodos : JSON.parse(serializedTodos));
    }

    initialize();

    function getDataSource(data) {
        return new WinJS.Binding.List(data).dataSource;
    }

    function getItemTemplate(promise) {
        return promise.then(function (item) {
            var div = document.createElement("div");

            div.innerText = item.data.name;

            return div;
        });
    }


    mixinComponent(that, {
        template: template,
        ui: {
            itemDataSource: todos,
            itemTemplate: getItemTemplate
        }
    });

    // TODO createUtil method to compose functions
    var defaultRender = that.render;
    that.render = function () {
        return defaultRender(true).then(function (rootElement) {
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