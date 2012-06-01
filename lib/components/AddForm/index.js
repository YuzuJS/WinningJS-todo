"use strict";

var mixinComponent = require("WinningJS/lib/ui/component").mixin;
var template = require("./template.jade");
var makeEmitter = require("pubit/lib/pubit").makeEmitter;

module.exports = function AddForm() {
    var that = this;
    var publish = makeEmitter(that, { events: ["add"] });

    mixinComponent(that, {
        template: template
    });

    var defaultRender = that.render;
    that.render = function () {
        var el = defaultRender();
        var input = el.querySelector("input");
        input.focus();

        el.addEventListener("submit", function (ev) {
            var todo = input.value;
            publish("add", todo);

            input.value = "";
            ev.preventDefault();
        });

        return el;
    };
};