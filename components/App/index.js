"use strict";
/*global document: false */
var Presenter = require("WinningJS/lib/ui/Presenter");
var template = require("./template.jade");
var $ = require("jquery");

module.exports = function App(todosPage, aboutPage, nav) {
    var presenter = new Presenter({
        template: template,
        renderables: {
            todosPage: todosPage,
            aboutPage: aboutPage
        }
    });

    function navigated(e) {
        presenter.element.then(function (element) {
            var location = "." + e.detail.location;
            $(element).children("div").hide();
            document.querySelector(location).style.display = "block";
        }).end();
    }

    nav.addEventListener("navigated", navigated);

    this.render = presenter.process;
};
