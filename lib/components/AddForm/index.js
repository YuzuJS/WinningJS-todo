"use strict";

var mixinComponent = require("WinningJS/lib/ui/component").mixin;
var template = require("./template.jade");

var makeEmitter = require("pubit/lib/pubit").makeEmitter;
var publish = makeEmitter(exports, { events: ["add"] });

module.exports = function AddForm() {

    var that = this;

    mixinComponent(that, {
        template: function () {
            return template();
        }
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