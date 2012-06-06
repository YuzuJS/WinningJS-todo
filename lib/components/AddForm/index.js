"use strict";

var Presenter = require("WinningJS/lib/ui/Presenter");
var template = require("./template.jade");
var makeEmitter = require("pubit").makeEmitter;

module.exports = function AddForm() {
    var that = this;
    var publish = makeEmitter(that, { events: ["add"] });

    var presenter = new Presenter({ template: template });
    var element = presenter.element;
    var input = element.querySelector("input");

    input.focus();

    element.addEventListener("submit", function (ev) {
        var todo = input.value;
        publish("add", todo);

        input.value = "";
        ev.preventDefault();
    });

    that.render = presenter.process;
};
