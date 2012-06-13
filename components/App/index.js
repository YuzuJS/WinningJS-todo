"use strict";

var Presenter = require("WinningJS/lib/ui/Presenter");
var template = require("./template.jade");
var $ = require("jquery");

module.exports = function App(todosPage, aboutPage, nav) {
    var presenter = new Presenter({
        template: template,
        renderables: {
            todosPage: todosPage,
            aboutPage: aboutPage
        }
    });

    // TODO: move all this nav-related stuff to WinningJS.
    function navigated(e) {
        presenter.element.then(function (element) {
            $(element).children("section[data-winning-page]").hide();

            var newPageName = e.detail.location;
            var $newPage = $(element).children("section[data-winning-page='" + newPageName + "']");
            if ($newPage.length === 0) {
                throw new Error('Could not find page "' + newPageName + '".');
            }
            if ($newPage.length > 1) {
                throw new Error('There was more than one page named "' + newPageName + '".');
            }

            $newPage.show();
        }).end();
    }

    nav.addEventListener("navigated", navigated);

    function getPageId(url) {
        return url.substring(url.lastIndexOf("/") + 1);
    }

    presenter.element.then(function (element) {
        $(element).on("click", "a, button", function (ev) {
            var href = this.href || this.getAttribute("data-winning-href");

            if (href) {
                ev.preventDefault();

                var location = getPageId(href);
                nav.navigate(location);
            }
        });
    });
    
    this.render = presenter.process;
};
