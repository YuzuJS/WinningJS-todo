"use strict";

// TODO: move to separate project

var path = require("path");
var jade = require("jade");
var doBrowserify = require("./doBrowserify");
var doStylus = require("./doStylus");

var baseDir = path.resolve(__dirname, ".."); // TODO don't do this, only browserify needs it, and maybe it doesn't.

module.exports = function (grunt) {
    function writeIndex(src, dest, jadeLocals) {
        var jadeFile = grunt.file.read(src);
        var templateFunction = jade.compile(jadeFile, { filename: src, compileDebug: false, pretty: true });
        var indexHtml = templateFunction(jadeLocals);
        grunt.file.write(dest, indexHtml);
        grunt.log.writeln("File \"" + dest + "\" created");
    }

    grunt.registerTask("buildIndex", "Browserify modules, compile Stylus, and build an index.html.", function () {
        var browserifyConfig = grunt.config("buildIndex.browserify");
        var scripts = doBrowserify(grunt, baseDir, browserifyConfig);

        var stylusConfig = grunt.config("buildIndex.stylus");
        var styles = doStylus(grunt, baseDir, stylusConfig);

        var indexConfig = grunt.config("buildIndex");
        indexConfig.src = indexConfig.src ? path.normalize(indexConfig.src) : "index.jade";
        indexConfig.dest = indexConfig.dest ? path.normalize(indexConfig.dest) : "index.html";

        writeIndex(indexConfig.src, indexConfig.dest, {
            scripts: scripts,
            styles: styles,
            entryModule: browserifyConfig.entry
        });
    });
};
