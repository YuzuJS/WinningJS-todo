"use strict";

// TODO: move to separate project

var path = require("path");
var jade = require("jade");
var doBrowserify = require("./doBrowserify");
var doStylus = require("./doStylus");
var getStackFrames = require("./utils").getStackFrames;

var baseDir = path.resolve(__dirname, ".."); // TODO don't do this, only browserify needs it, and maybe it doesn't.

module.exports = function (grunt) {
    function writeIndex(src, dest, jadeLocals) {
        var jadeFile = grunt.file.read(src);
        var templateFunction = jade.compile(jadeFile, { filename: src, compileDebug: false, pretty: true });
        var indexHtml = templateFunction(jadeLocals);
        grunt.file.write(dest, indexHtml);
        grunt.log.writeln("File \"" + dest + "\" created");
    }

    function doBuildIndex() {
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
            entryModule: "./" + browserifyConfig.entry
        });
    }

    grunt.registerTask("buildIndex", "Browserify modules, compile Stylus, and build an index.html.", function () {
        var done = this.async();

        try {
            doBuildIndex();
        } catch (error) {
            var frames = getStackFrames(error);

            var fileName = frames[0].getFileName();
            var line = frames[0].getLineNumber();
            var column = frames[0].getColumnNumber();
            var code = error.name;
            var message = error.message;

            // Visual Studio error format: http://msdn.microsoft.com/en-us/library/yxkt8b26%28v=vs.110%29.aspx
            console.error(fileName + "(" + line + "," + column + "): error " + code + ": " + message);
        } finally {
            // For some reason the errors don't make it to the UI unless you delay for a bit.
            setTimeout(done, 10);
        }
    });
};
