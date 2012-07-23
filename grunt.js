"use strict";

var winningJSBuild = require("WinningJS-Build");

module.exports = function (grunt) {
    winningJSBuild(grunt);

    grunt.initConfig({
        lint: {
            all: ["lib/**/*.js"]
        },
        winningJS: {
            dest: "out/index.html",
            browserify: {
                entry: "lib/start",
                dest: "out/browserified",
                aliases: {
                    "jquery": "jquery-browserify"
                }
            },
            stylus: {
                src: ["styles/**/*.styl", "components/**/*.styl"],
                dest: "out/css"
            }
        }
    });

    grunt.registerTask("default", "winningJS");
};
