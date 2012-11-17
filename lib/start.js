"use strict";

// Note we include this here, not in .jshintrc, because you *should* be explicit about when you touch the DOM.
// Most files should not.
/*jshint browser: true*/
/*global WinJS: false */

var app = require("WinningJS/lib/app");
var addKnockoutBindings = require("WinningJS/lib/knockout").addBindings;
var $ = require("jquery");
var nav = WinJS.Navigation;

var App = require("../components/App");

var TodosPage = require("../components/TodosPage");
var TodosPageAppBar = require("../components/TodosPage/AppBar");
var TodosPageNavBar = require("../components/TodosPage/NavBar");
var TodosPageAddForm = require("../components/TodosPage/AddForm");
var TodosPageTodoList = require("../components/TodosPage/TodoList");

var AboutPage = require("../components/AboutPage");

var Storage = require("./Storage");
var TodosModel = require("./TodosModel");

function buildTodosPage(todos) {
    var appBar = new TodosPageAppBar(todos);
    var navBar = new TodosPageNavBar();
    var addForm = new TodosPageAddForm(todos);
    var todoList = new TodosPageTodoList(todos, appBar.showCommands);

    return new TodosPage(appBar, navBar, addForm, todoList);
}

function buildApp() {
    var storage = new Storage(window.localStorage);
    var todos = new TodosModel(storage.loadTodos());

    var todosPage = buildTodosPage(todos);
    var aboutPage = new AboutPage();

    return new App(todosPage, aboutPage, nav);
}

// TODO should it be the responsibility of the application to invoke addBindings?
// Is this something app.start should just do for us?
// At this time don't want to force users of WinningJS to have to use ko.
app.on("launch", function (event) {
    addKnockoutBindings();
    var appUI = buildApp();
    appUI.render().then(function (el) {
        $(document.body).append(el);

        // initialize history (move to WinningJS?)
        if (nav.location) {
            nav.history.current.initialPlaceholder = true;
            return nav.navigate(nav.location);
        } else {
            return nav.navigate("todos");
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
