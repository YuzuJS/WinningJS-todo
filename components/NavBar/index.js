"use strict";

var Presenter = require("WinningJS/lib/ui/Presenter");
var template = require("./template.jade");

module.exports = function NavBar(nav) {
    var that = this;
    var presenter = new Presenter({ template: template });

    function getPageId(url) {
        return url.substring(url.lastIndexOf("/") + 1);
    }

    presenter.element.then(function (element) {
        var navAnchor = element.querySelector("a");
        navAnchor.addEventListener("click", function (e) {
            e.preventDefault();
            var location = getPageId(this.href);
            nav.navigate(location);
        });
    });


    that.render = presenter.process;
};
