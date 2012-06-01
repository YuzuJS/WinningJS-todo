"use strict";

var mixinComponent = require("WinningJS/lib/ui/component").mixin;
var template = require("./template.jade");

// updated datasource to be used with the listview
var todos = new WinJS.UI.ArrayDataSource([
        { name: "Destroy Enemies." },
        { name: "Make Friends." },
        { name: "Conquer The World." }
    ]);

module.exports = function List() {

    var that = this;

    mixinComponent(that, {
        template: function () {
            return template({ dataSource: todos });
        }
    });

    // override render
    var defaultRender = that.render;
    that.render = function () {
        var el = defaultRender();
        var itemTemplate = el.querySelector("listTemplate");
        var todoList = el.querySelector("todoList").winControl;

        // set listview options
        WinJS.UI.setOptions(todoList, {
            itemTemplate: itemTemplate,
            itemDataSource: todos.dataSource,
            layout: new ui.ListLayout()
        });
    };

};