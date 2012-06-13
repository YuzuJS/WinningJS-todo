"use strict";

var Presenter = require("WinningJS/lib/ui/Presenter");
var template = require("./template.jade");

module.exports = function AboutPage() {
    var that = this;
    var presenter = new Presenter({ template: template });

    that.render = presenter.process;
};
