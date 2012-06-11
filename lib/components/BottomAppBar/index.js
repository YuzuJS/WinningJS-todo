"use strict";

var Presenter = require("WinningJS/lib/ui/Presenter");
var template = require("./template.jade");
var makeEmitter = require("pubit").makeEmitter;

module.exports = function BottomAppBar(todos) {
    var that = this;

    var presenter = new Presenter({ template: template });
    var publish = makeEmitter(that, ["delete", "complete"]);

    that.render = presenter.process;

    presenter.winControl.then(function (winControl) {
        winControl.getCommandById("delete").addEventListener("click", function () {
            publish("delete");
        });
        winControl.getCommandById("complete").addEventListener("click", function () {
            publish("complete");
        });
    });

    that.showCommands = function () {
        return presenter.winControl.then(function (winControl) {
            if (winControl.hidden) {
                winControl.disabled = false;
                winControl.sticky = true;
                winControl.showCommands(["delete", "complete"]);
                winControl.show();
            }
        });
    };

    // TODO discuss with Domenic - components should not hide themselves
    // the App should fetch the appBar wincontrol and hide it?
    that.hide = function () {
        return presenter.winControl.then(function (winControl) {
            winControl.hide();
        });
    };
};
