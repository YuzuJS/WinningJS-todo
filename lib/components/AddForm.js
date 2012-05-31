"use strict";

var mixinComponent = require("WinningJS/lib/ui/component").mixin;
var template = require("../../pages/addForm.jade");

module.exports = function AddForm() {
    mixinComponent(this, {
        template: function () {
            return template();
        }
    });
};