"use strict";

var Presenter = require("WinningJS/lib/ui/Presenter");
var mixinShowable = require("WinningJS/lib/ui/components").mixinShowable;

var template = require("./template.jade");

module.exports = function AboutPage() {
    var presenter = new Presenter({ template: template });
    mixinShowable(this, presenter);

    this.render = presenter.render;
};
