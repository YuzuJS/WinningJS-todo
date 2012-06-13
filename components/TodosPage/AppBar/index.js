"use strict";

var Presenter = require("WinningJS/lib/ui/Presenter");
var ViewModel = require("./ViewModel");
var template = require("./template.jade");

module.exports = function TodosPageAppBar(todos) {
    var that = this;

    var viewModel = new ViewModel(todos);
    var presenter = new Presenter({
        template: template,
        viewModel: viewModel
    });

    that.render = presenter.process;

    that.showCommands = function (commandGroup, context) {
        // TODO all commands hidden by default; only show commands specified by `commandGroup`.
        // Also, how to hide commands if passed empty context array?
        // Or should caller signal `hideCommands("todos-selected")`? `showCommands("todos-selected", null)`?
        // How much of this can be put into WinningJS?

        viewModel.selectedTodos = context;
    };
};
