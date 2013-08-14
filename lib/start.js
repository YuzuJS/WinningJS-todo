"use strict";

// Note we include this here, not in .jshintrc, because you *should* be explicit about when you touch the DOM.
// Most files should not.
/*jshint browser: true*/

var app = require("WinningJS/lib/app");
var addKnockoutBindings = require("WinningJS/lib/knockout").addBindings;

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

    return new App(todosPage, aboutPage);
}


addKnockoutBindings();

app.on("launch", function () {
    var appComponent = buildApp();
    document.body = appComponent.render();

    appComponent.process().done();
});

app.on("resume", function () {
    // TODO: This application has been reactivated from suspension.
    // Restore application state here.
});

app.on("suspend", function () {
    // TODO: This application is about to be suspended. Save any state
    // that needs to persist across suspensions here. You might use the
    // WinJS.Application.sessionState object, which is automatically
    // saved and restored across suspension. If you need to complete an
    // asynchronous operation before your application is suspended, call
    // event.setPromise().
});

// Start dispatching application events
app.start();
