"use strict";
/*global window: false, document: false, WinJS: false */

var $ = require("jquery");
var Presenter = require("WinningJS/lib/ui/Presenter");
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
    var todosKey = "todos";

    function initialize() {
        var serializedTodos = storage.getItem(todosKey);
        todos = getDataSource(!serializedTodos ? sampleTodos : JSON.parse(serializedTodos));
    }

    function getDataSource(data) {
        return new WinJS.Binding.List(data);
    }

    function getItemTemplate(promise) {
        return promise.then(function (item) {
            var div = document.createElement("div");

            div.innerText = item.data.name;

            return div;
        });
    }
    
    initialize();
    var presenter = new Presenter({
        template: template,
        ui: {
            itemDataSource: todos.dataSource,
            itemTemplate: getItemTemplate
        }
    });

    that.render = presenter.process;

    that.addTodo = function (todoDescription) {
        todos.push({ name: todoDescription });
        storage.setItem(todosKey, JSON.stringify(todos._getArray()));
    };
};
