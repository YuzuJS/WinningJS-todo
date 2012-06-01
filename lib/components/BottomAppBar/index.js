"use strict";

var mixinComponent = require("WinningJS/lib/ui/component").mixin;
var template = require("./template.jade");

module.exports = function BottomAppBar() {

    mixinComponent(this, {
        template: function () {
            return template();
        }
    });

};