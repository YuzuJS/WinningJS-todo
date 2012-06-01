"use strict";

var path = require("path");
var browserify = require("browserify");
var browserifyHandlers = require("./browserifyHandlers");
var urlize = require("./utils").urlize;

function makePreludeFile(baseDir, aliases) {
    return browserify().require(aliases).require(path.resolve(baseDir, "node_modules/jade/runtime.js")).bundle();
}

function makeBundle(baseDir, aliases, entryFile) {
    var bundle = browserify();
    Object.keys(aliases).forEach(function (alias) {
        bundle.alias(alias, aliases[alias]);
    });
    Object.keys(browserifyHandlers).forEach(function (extension) {
        bundle.register(extension, browserifyHandlers[extension]);
    });

    bundle.require(path.resolve(baseDir, entryFile), { basedir: baseDir, root: baseDir, target: entryFile });

    return bundle;
}

module.exports = function (grunt, baseDir, config) {
    var prelude = makePreludeFile(baseDir, config.aliases);
    var preludeDest = path.join(config.dest, "browserify.js");
    grunt.file.write(preludeDest, prelude);
    grunt.log.writeln("File \"" + preludeDest + "\" created.");

    var bundle = makeBundle(baseDir, config.aliases, config.entry);

    var newFileUrls = [urlize(preludeDest)];
    Object.keys(bundle.files).forEach(function (fileName) {
        var newFilePath = path.join(config.dest, path.relative(baseDir, fileName));
        var newFileContents = bundle.files[fileName].body;

        grunt.file.write(newFilePath, newFileContents);
        grunt.log.writeln("File \"" + newFilePath + "\" created.");

        newFileUrls.push(urlize(newFilePath));
    });

    return newFileUrls;
};
