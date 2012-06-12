"use strict";
/*global document: false */
var Presenter = require("WinningJS/lib/ui/Presenter");
var template = require("./template.jade");
var $ = require("jquery");

module.exports = function App(addTodoUI, todoListUI, bottomBarUI, navBarUI, aboutUsUI, nav) {
    var presenter = new Presenter({
        template: template,
        renderables: {
            add: addTodoUI,
            todoList: todoListUI,
            bottomBar: bottomBarUI,
            navBar: navBarUI,
            aboutUs: aboutUsUI
        }
    });

    function navigated(e) {
        presenter.element.then(function (element) {
            var location = "." + e.detail.location;
            $(element).children("div").hide();
            document.querySelector(location).style.display = "block";
        }).end();
    }

    this.render = presenter.process;

    addTodoUI.on("add", todoListUI.addTodo);
    bottomBarUI.on("delete", todoListUI.deleteTodo);
    bottomBarUI.on("complete", todoListUI.completeTodo);
    nav.addEventListener("navigated", navigated);
};
