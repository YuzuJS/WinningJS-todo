"use strict";

exports.urlize = function (path) {
    return "/" + path.replace(/\\/g, "/");
};
