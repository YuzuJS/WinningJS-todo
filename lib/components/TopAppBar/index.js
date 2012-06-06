"use strict";

var Presenter = require("WinningJS/lib/ui/Presenter");
var template = require("./template.jade");

// hardcoded todos
var todos = [
    { name: "Destroy Enemies." },
    { name: "Make Friends." },
    { name: "Conquer The World." }
];

module.exports = function TopAddBar() {
    var presenter = new Presenter({
        template: function () {
            return template({ list: todos });
        }
    });

    this.render = presenter.process;
};