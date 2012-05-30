"use strict";

var mixinComponent = require("WinningJS/lib/ui/component").mixin;
var template = require("../../pages/list.jade");

// hardcoding todos for now :)
var todos = [
    { name: "Destroy Enemies." },
    { name: "Make Friends." },
    { name: "Conquer The World." }
];

module.exports = function List() {
    mixinComponent(this, { 
        template: function () { 
            return template({ list: todos });
        }   
    });
};