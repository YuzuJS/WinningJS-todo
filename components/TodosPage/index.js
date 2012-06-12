"use strict";

var Presenter = require("WinningJS/lib/ui/Presenter");
var template = require("./template.jade");

module.exports = function TodosPage(appBar, navBar, addForm, todoList) {
    var presenter = new Presenter({
        template: template,
        renderables: {
            navBar: navBar,
            addForm: addForm,
            todoList: todoList,
            appBar: appBar
        }
    });

    this.render = presenter.process;
};
