"use strict";

var Presenter = require("WinningJS/lib/ui/Presenter");
var template = require("./template.jade");

module.exports = function App(todosPage, aboutPage) {
    var presenter = new Presenter({
        template: template,
        renderables: {
            todosPage: todosPage,
            aboutPage: aboutPage
        }
    });

    this.render = presenter.render;
    this.process = presenter.process;
};
