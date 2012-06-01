"use strict";

var mixinComponent = require("WinningJS/lib/ui/component").mixin;
var template = require("./template.jade");

module.exports = function App(addTodoUI, listUI, bottomBarUI, topBarUI) {
    mixinComponent(this, {
        template: template,
        components: {
            add: addTodoUI,
            list: listUI,
            bottomBar: bottomBarUI,
            topBar: topBarUI
        }
    });

    addTodoUI.on("add", listUI.addTodo);
};