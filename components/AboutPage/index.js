"use strict";

var Presenter = require("WinningJS/lib/ui/Presenter");
var template = require("./template.jade");

module.exports = function AboutPage(nav) {
    var that = this;
    var presenter = new Presenter({ template: template });

    presenter.element.then(function (element) {
        // TODO move back button into it's own module?
        var backButton = element.querySelector(".win-backbutton");
        backButton.addEventListener("click", function () {
            nav.back();
        });
    }).end();

    that.render = presenter.process;
};
