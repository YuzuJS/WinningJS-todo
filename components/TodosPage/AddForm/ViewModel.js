"use strict";

var ko = require("knockoutify");

module.exports = function AddFormViewModel(todos) {
    var that = this;

    that.text = ko.observable("");

    that.addTodo = function () {
        todos.add(that.text());
        that.text("");
    };
};
