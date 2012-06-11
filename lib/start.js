"use strict";

// Note we include this here, not in .jshintrc, because you *should* be explicit about when you touch the DOM.
// Most files should not.
/*jshint browser: true*/
/*global WinJS: false */

var app = require("WinningJS/lib/app");
var $ = require("jquery");
var AddFormUI = require("./components/AddForm");
var AppUI = require("./components/App");
var BottomAppBarUI = require("./components/BottomAppBar");
var ListViewUI = require("./components/ListView");
var Storage = require("./Storage");
var NavBarUI = require("./components/NavBar");
var AboutUsUI = require("./components/AboutUs");
var createBindingList = require("./todos").createBindingList;
var nav = WinJS.Navigation;

function buildAppUI() {
    var storage = new Storage(window.localStorage);
    var bindingList = createBindingList(storage.loadTodos());

    var addFormUI = new AddFormUI();
    var bottomAppBarUI = new BottomAppBarUI(bindingList);
    var listViewUI = new ListViewUI(bindingList, storage, bottomAppBarUI);
    var navBarUI = new NavBarUI(nav);
    var aboutUsUI = new AboutUsUI(nav);
    return new AppUI(addFormUI, listViewUI, bottomAppBarUI, navBarUI, aboutUsUI, nav);
}

app.on("launch", function (event) {
    var appUI = buildAppUI();
    appUI.render().then(function (el) {
        $(document.body).append(el);
        // initialize history (consider moving it into WinningJS)
        if (nav.location) {
            nav.history.current.initialPlaceholder = true;
            return nav.navigate(nav.location);
        } else {
            return nav.navigate("todo-form");
        }
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
