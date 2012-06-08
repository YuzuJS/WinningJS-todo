"use strict";

var Presenter = require("WinningJS/lib/ui/Presenter");
var template = require("./template.jade");
var makeEmitter = require("pubit").makeEmitter;

module.exports = function BottomAppBar(todos) {
    var that = this;
    var presenter = new Presenter({ template: template });
    var bar = null;
    var publish = makeEmitter(that, ["delete", "complete"]);

    that.render = function () {
        return presenter.process().then(function (el) {
            bar = el.winControl;

            bar.getCommandById("delete").addEventListener("click", function () {
                publish("delete");
            });
            bar.getCommandById("complete").addEventListener("click", function () {
                publish("complete");
            });

            return el;
        });
    };

    that.showCommands = function () {
        if (bar.hidden) {
            bar.disabled = false;
            bar.sticky = true;
            bar.show();
            bar.showCommands(["delete", "complete"]);
        }
    };
};
