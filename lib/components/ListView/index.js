"use strict";

/*global WinJS: false */

var mixinComponent = require("WinningJS/lib/ui/component").mixin;
var template = require("./template.jade");

var itemTemplate = require("./itemtemplate.jade");

// updated datasource to be used with the listview
var todos = new WinJS.Binding.List([
        { name: "Destroy Enemies." },
        { name: "Make Friends." },
        { name: "Conquer The World." }
    ]);

module.exports = function ListView() {

    var that = this;

    mixinComponent(that,
        {
            template: template,
            ui: {
                itemDataSource: todos.dataSource,
                itemTemplate: itemTemplate().getElement()
            }
        }
    );
};