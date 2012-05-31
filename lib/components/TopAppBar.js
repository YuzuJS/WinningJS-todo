"use strict";

var mixinComponent = require("WinningJS/lib/ui/component").mixin;
var template = require("../../pages/topAppBar.jade");

// hardcoded todos
var todos = [
    { name: "Destroy Enemies." },
    { name: "Make Friends." },
    { name: "Conquer The World." }
];

module.exports = function TopAddBar() {
    mixinComponent(this, {
        template: function() {
            return template({list: todos});
        }
    });
};