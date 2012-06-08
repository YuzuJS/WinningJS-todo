"use strict";

// Note we include this here, not in .jshintrc, because you *should* be explicit about when you touch the DOM.
// Most files should not.
/*jshint browser: true*/

var app = require("WinningJS/lib/app");
var $ = require("jquery");
var AddFormUI = require("./components/AddForm");
var AppUI = require("./components/App");
var BottomAppBarUI = require("./components/BottomAppBar");
var TopAppBarUI = require("./components/TopAppBar");
var ListViewUI = require("./components/ListView");
var createBindingList = require("./todos").createBindingList;

function buildAppUI() {
    var bindingList = createBindingList();

    var addFormUI = new AddFormUI();
    var bottomAppBarUI = new BottomAppBarUI(bindingList);
    var listViewUI = new ListViewUI(bindingList);
    return new AppUI(addFormUI, listViewUI, bottomAppBarUI);
}

app.on("launch", function (event) {
    var appUI = buildAppUI();
    appUI.render().then(function (el) {
        $(document.body).append(el);
    }).end();
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

// Start dispatching application events
app.start();
