"use strict";

var Presenter = require("WinningJS/lib/ui/Presenter");
var template = require("./template.jade");

module.exports = function BottomAppBar() {
    var presenter = new Presenter({
        template: function () {
            return template();
        }
    });

    this.render = presenter.process;
};
