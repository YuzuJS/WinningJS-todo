"use strict";

var mixinComponent = require("WinningJS/lib/ui/component").mixin;
var template = require("./template.jade");

module.exports = function App(addTodoUI, listUI) {
    mixinComponent(this, {
        template: template,
        components: {
            add: addTodoUI,
            list: listUI
        }
    });

    addTodoUI.on("add", function (todo) {
        listUI.addTodo(todo);
    });
};
