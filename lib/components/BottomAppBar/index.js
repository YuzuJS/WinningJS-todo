"use strict";

var Presenter = require("WinningJS/lib/ui/Presenter");
var template = require("./template.jade");
var makeEmitter = require("pubit").makeEmitter;

module.exports = function BottomAppBar(todos) {
    var that = this;
    var presenter = new Presenter({ template: template });
    var bar = null;
    var publish = makeEmitter(that, { events: ["delete", "complete"] });

    this.render = presenter.process;

    that.render().then(function (el) {
        bar = el.winControl;
        bar.element.querySelector("#cmd-delete").addEventListener("click", function () {
            publish("delete");
        }, false);
        bar.element.querySelector("#cmd-complete").addEventListener("click", function () {
            publish("complete");
        }, false);
    });

    that.showCommands = function () {
        if (bar.hidden === true) {
            bar.disabled = false;
            bar.sticky = true;
            bar.show();
            bar.showCommands(["cmd-delete", "cmd-complete"]);
        }
    };
};
