"use strict";

var fs = require("fs");
var path = require("path");
var jade = require("jade");
var _ = require("underscore");

var jadeModuleTemplate = fs.readFileSync(path.resolve(__dirname, "jadeModule.tmpl.js")).toString();

exports[".jade"] = function browserifyJade(body, file) {
    var templateFunction = jade.compile(body, { filename: file, compileDebug: false, client: true });
    return _.template(jadeModuleTemplate, { templateFunctionSource: templateFunction.toString() });
};
