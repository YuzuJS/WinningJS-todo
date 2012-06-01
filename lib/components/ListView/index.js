"use strict";

var mixinComponent = require("WinningJS/lib/ui/component").mixin;
var template = require("./template.jade");

// updated datasource to be used with the listview
var todos = new WinJS.Binding.List([
        { name: "Destroy Enemies." },
        { name: "Make Friends." },
        { name: "Conquer The World." }
    ]);

module.exports = function ListView() {

    var that = this;

    mixinComponent(that, {
        template: function () {
            return template({
                ui: {
                    datasource: todos
                }
            });
        }
    });
};