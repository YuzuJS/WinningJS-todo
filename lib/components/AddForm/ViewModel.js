"use strict";

var ko = require("knockout");

module.exports = function AddFormViewModel(publish) {
    var that = this;

    that.text = ko.observable("");
    that.addTodo = function () {
        publish("add", that.text());
        that.text("");
    };
};
