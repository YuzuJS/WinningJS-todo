"use strict";

var Presenter = require("WinningJS/lib/ui/Presenter");
var template = require("./template.jade");

module.exports = function TodosPageNavBar() {
    var presenter = new Presenter({ template: template });

    this.render = presenter.process;
};
