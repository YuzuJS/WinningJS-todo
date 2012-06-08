"use strict";

var Presenter = require("WinningJS/lib/ui/Presenter");
var template = require("./template.jade");

module.exports = function App(addTodoUI, listUI, bottomBarUI) {
    var presenter = new Presenter({
        template: template,
        renderables: {
            add: addTodoUI,
            list: listUI,
            bottomBar: bottomBarUI
        }
    });

    this.render = presenter.process;

    addTodoUI.on("add", listUI.addTodo);
    listUI.on("select", bottomBarUI.showCommands);
    bottomBarUI.on("delete", listUI.deleteTodo);
    bottomBarUI.on("complete", listUI.completeTodo);
};
