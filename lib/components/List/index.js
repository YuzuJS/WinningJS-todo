"use strict";

var mixinComponent = require("WinningJS/lib/ui/component").mixin;
var template = require("./template.jade");
var $ = require("jquery");

// hardcoding todos for now :)
var todos = [
    { name: "Destroy Enemies." },
    { name: "Make Friends." },
    { name: "Conquer The World." }
];

module.exports = function List() {
    var that = this;
    var element = null;

    mixinComponent(that, { 
        template: function () { 
            return template({ list: todos });
        }   
    });

    var defaultRender = that.render;
    that.render = function () {
        element = defaultRender();
        return element;
    };

    that.addTodo = function (todoDescription) {
        var previousListEl = element;
        todos.push({ name: todoDescription });
        $(previousListEl).before($(that.render()));
        previousListEl.parentNode.removeChild(previousListEl);        
    };
};