"use strict";

var path = require("path");
var stylus = require("stylus");
var urlize = require("./utils").urlize;

module.exports = function (grunt, baseDir, config) {
    var files = grunt.file.expandFiles(config.src);

    var newFileUrls = [];
    files.forEach(function (fileName) {
        var str = grunt.file.read(fileName);
        var newFileName = fileName.match(/(.*).styl/)[1] + ".css";
        var newFilePath = path.join(config.dest, newFileName);

        // NB: this isn't actually asynchronous; it just uses callbacks for some reason.
        // That's what makes it possible to push onto `newFileUrls`.
        stylus.render(str, { filename: newFileName }, function (err, css) {
            if (err) {
                grunt.warn(err.message);
            } else {
                grunt.file.write(newFilePath, css);
                grunt.log.writeln("File \"" + newFilePath + "\" created.");

                newFileUrls.push(urlize(newFilePath));
            }
        });
    });

    return newFileUrls;
};
