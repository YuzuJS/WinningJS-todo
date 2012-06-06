"use strict";

var Presenter = require("WinningJS/lib/ui/Presenter");
var template = require("./template.jade");

module.exports = function App(addTodoUI, listUI, bottomBarUI, topBarUI) {
    var presenter = new Presenter({
        template: template,
        renderables: {
            add: addTodoUI,
            list: listUI,
            bottomBar: bottomBarUI,
            topBar: topBarUI
        }
    });

    this.render = presenter.process;

    addTodoUI.on("add", listUI.addTodo);
};
