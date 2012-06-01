"use strict";

// TODO: right now this starts the app (i.e. executes code).
// Probably not a good pattern; probably should need to manually call app.init() or something.
// Look at how other frameworks do it.
var app = require("WinningJS/lib/app");

// Note we include this here, not in .jshintrc, because you *should* be explicit about when you touch the DOM.
// Most files should not.
/*jshint browser: true*/

var $ = require("jquery");
var ListUI = require("./components/List");
var AddForm = require("./components/AddForm");
var AppUI = require("./components/App");
var BottomAppBar = require("./components/BottomAppBar");
var TopAppBar = require("./components/TopAppBar");

function buildAppUI() {
    var addForm = new AddForm();
    var listUI = new ListUI();
    var bottomAppBar = new BottomAppBar
    var topAppBar = new TopAppBar();
    return new AppUI(addForm, listUI, bottomAppBar, topAppBar);
}   

app.on("launch", function (event) {
    var appUI = buildAppUI();
    appUI.render().then(function (element) {
        $(document.body).append(element);
    });
});

app.on("reactivate", function (event) {
    // TODO: This application has been reactivated from suspension.
    // Restore application state here.
});

app.on("beforeSuspend", function (event) {
    // TODO: This application is about to be suspended. Save any state
    // that needs to persist across suspensions here. You might use the
    // WinJS.Application.sessionState object, which is automatically
    // saved and restored across suspension. If you need to complete an
    // asynchronous operation before your application is suspended, call
    // event.setPromise().
});
