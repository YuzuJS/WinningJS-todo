"use strict";

var Presenter = require("WinningJS/lib/ui/Presenter");
var template = require("./template.jade");
var ViewModel = require("./ViewModel");

module.exports = function TodosPageAddForm(todos) {
    var that = this;

    var presenter = new Presenter({
        template: template,
        viewModel: new ViewModel(todos)
    });

    presenter.element.then(function (element) {
        var input = element.querySelector("input");
        input.focus();
    });

    that.render = presenter.process;
};
