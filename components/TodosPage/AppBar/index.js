"use strict";

var Presenter = require("WinningJS/lib/ui/Presenter");
var template = require("./template.jade");
var makeEmitter = require("pubit").makeEmitter;

module.exports = function TodosPageAppBar() {
    var that = this;

    var presenter = new Presenter({ template: template });

    that.render = presenter.process;

    that.showCommands = function (commandGroup, context) {
        // TODO
    };
};
