"use strict";

var path = require("path");
var browserify = require("browserify");
var browserifyHandlers = require("./browserifyHandlers");
var urlize = require("./utils").urlize;

// This module does something a bit unorthodox: it uses Browserify to output a single file for each module, instead of
// squashing them all into one in the usual way. The result is a prelude file and a bunch of bundle files. Doing so
// means twisting Browserify in strange and unusual ways, so things can get a bit hard to follow. We try to comment.

function makePreludeFile(baseDir, aliases) {
    // Passing the alias map to `browserify()` will include the aliased files in the prelude, plus the `require.alias`
    // calls. TODO: it would be cool to have the aliased files separate. But then it becomes tricky to include the
    // `require.alias` calls.
    var bundle = browserify({ require: aliases, cache: true });

    // Also include the Jade runtime. TODO: make configurable.
    bundle.require(path.resolve(baseDir, "node_modules/jade/runtime.js"));

    // This will return a string containing the contents of the prelude file, which is essentially all the Browserify
    // definitions (i.e. `require`, `require.define`, etc.), plus the stuff we added above (calls to `require.alias`,
    // Jade runtime).
    return bundle.bundle();
}

function makeWrappedModules(baseDir, aliases, entryFile) {
    var bundle = browserify({ cache: true });

    // We manually call `bundle.alias` here so that the files we include know about the aliases during build time, even
    // though the actual aliased file contents and the `require.alias` calls will end up in the prelude file (cf. above).
    Object.keys(aliases).forEach(function (alias) {
        bundle.alias(alias, aliases[alias]);
    });

    // Registering browserify handlers will allow the browserified .js modules to require other things, like Jade.
    Object.keys(browserifyHandlers).forEach(function (extension) {
        bundle.register(extension, browserifyHandlers[extension]);
    });

    // Just require the entry file: this will create entries in the bundle for all files it requires, recursively.
    bundle.require(path.resolve(baseDir, entryFile));

    // The `bundle.files` property maps absolute file paths to unwrapped module bodies. Use it to create a map of
    // relative file paths to wrapped module bodies.
    var files = Object.create(null);
    Object.keys(bundle.files).forEach(function (file) {
        var relativeFilePath = path.relative(baseDir, file);
        files[relativeFilePath] = bundle.wrap(urlize(relativeFilePath), bundle.files[file].body);
    });
    return files;
}

module.exports = function (grunt, baseDir, config) {
    var prelude = makePreludeFile(baseDir, config.aliases);
    var preludeDest = path.relative(process.cwd(), path.resolve(config.dest, "browserify.js"));
    grunt.file.write(preludeDest, prelude);
    grunt.log.writeln("Browserify prelude created at \"" + preludeDest + "\"");

    var wrappedModules = makeWrappedModules(baseDir, config.aliases, config.entry);

    var newFileUrls = [urlize(preludeDest)];
    Object.keys(wrappedModules).forEach(function (filePath) {
        var newFilePath = path.relative(process.cwd(), path.resolve(config.dest, filePath));
        var newFileContents = wrappedModules[filePath];

        grunt.file.write(newFilePath, newFileContents);
        grunt.log.writeln("Browserified module created at \"" + newFilePath + "\"");

        newFileUrls.push(urlize(newFilePath));
    });

    return newFileUrls;
};
