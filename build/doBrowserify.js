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

    // This will return a string containing the contents of the prelude file, which is essentially all the Browserify
    // definitions (i.e. `require`, `require.define`, etc.), plus the alias files we included above.
    return bundle.bundle();
}

function makeWrappedModules(baseDir, aliases, entryFile) {
    var bundle = browserify({ cache: true });

    // We manually call `bundle.alias` here so that the files we include know about the aliases during build time, even
    // though the actual aliased file contents and the `require.alias` calls will end up in the prelude file (above).
    Object.keys(aliases).forEach(function (alias) {
        bundle.alias(alias, aliases[alias]);
    });

    // Registering browserify handlers will allow the browserified .js modules to require other things, like Jade.
    Object.keys(browserifyHandlers).forEach(function (extension) {
        bundle.register(extension, browserifyHandlers[extension].handler);
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
    function asInDest(relativePath) {
        // Take a relative path and make it a relative path, but inside config.dest.
        return path.relative(process.cwd(), path.resolve(config.dest, relativePath));
    }

    // Create and write out the prelude file.
    var prelude = makePreludeFile(baseDir, config.aliases);
    var preludeDest = asInDest("browserify.js");
    grunt.file.write(preludeDest, prelude);
    grunt.log.writeln("Browserify prelude created at \"" + preludeDest + "\"");

    // Start assembling the array of new file URLs, which will manifest as <script src="..."> tags.
    // The prelude definitely goes there.
    var newFileUrls = [urlize(preludeDest)];

    // Each browserify handler can specify an array of scripts that should be included. Copy those to the destination
    // directory, and include them in `newFileUrls`.
    Object.keys(browserifyHandlers).forEach(function (extension) {
        var scriptFilenames = browserifyHandlers[extension].includeScripts;
        var relativeScriptFilenames = scriptFilenames.map(function (fileName) {
            return path.relative(process.cwd(), fileName);
        });
        var scriptsInDest = relativeScriptFilenames.map(asInDest);

        scriptsInDest.forEach(function (scriptInDest, i) {
            grunt.file.copy(scriptFilenames[i], scriptInDest);
            grunt.log.writeln("Browserify handler script copied to \"" + scriptInDest + "\"");

            newFileUrls.push(urlize(scriptInDest));
        });
    });

    // Make a map of relative file paths to wrapped module bodies.
    var wrappedModules = makeWrappedModules(baseDir, config.aliases, config.entry);

    // Write the wrapped module bodies to the destination directory, and include them in `newFileURls`.
    Object.keys(wrappedModules).forEach(function (filePath) {
        var newFilePath = asInDest(filePath);
        var newFileContents = wrappedModules[filePath];

        grunt.file.write(newFilePath, newFileContents);
        grunt.log.writeln("Browserified module created at \"" + newFilePath + "\"");

        newFileUrls.push(urlize(newFilePath));
    });

    return newFileUrls;
};
