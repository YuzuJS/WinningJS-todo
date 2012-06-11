"use strict";
/*global document: false */
var Presenter = require("WinningJS/lib/ui/Presenter");
var template = require("./template.jade");
var $ = require("jquery");

module.exports = function App(addTodoUI, listUI, bottomBarUI, navBarUI, aboutUsUI, nav) {
    var presenter = new Presenter({
        template: template,
        renderables: {
            add: addTodoUI,
            list: listUI,
            bottomBar: bottomBarUI,
            navBar: navBarUI,
            aboutUs: aboutUsUI
        }
    });

    function navigated(e) {
        presenter.element.then(function (element) {
            var location = e.detail.location;
            $(element).children("div").hide();
            document.getElementById(location).style.display = "block";
        }).end();
    }

    this.render = presenter.process;

    addTodoUI.on("add", listUI.addTodo);
    bottomBarUI.on("delete", listUI.deleteTodo);
    bottomBarUI.on("complete", listUI.completeTodo);
    nav.addEventListener("navigated", navigated);
};
