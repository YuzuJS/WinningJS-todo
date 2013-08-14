"use strict";

module.exports = function (grunt) {
    grunt.loadNpmTasks("winningjs-build");

    grunt.initConfig({
        "WinningJS-build": {
            src: "index.jade",
            dest: "out/index.html",
            browserify: {
                entry: "lib/start.js",
                dest: "out/browserified",
                aliases: {
                    "jquery": "jquery2"
                },
                middleware: [require("simple-jadeify")]
            },
            stylus: {
                src: ["styles/**/*.styl", "components/**/*.styl"],
                dest: "out/css"
            }
        }
    });

    grunt.registerTask("default", "WinningJS-build");
};
