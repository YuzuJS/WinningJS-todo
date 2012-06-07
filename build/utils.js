"use strict";

exports.urlize = function (path) {
    return "/" + path.replace(/\\/g, "/");
};

exports.getStackFrames = function (error) {
    // http://code.google.com/p/v8/wiki/JavaScriptStackTraceApi

    // Replace the `Error.prepareStackTrace` function temporarily, to capture the frames.
    var oldErrorPrepareStackTrace = Error.prepareStackTrace;
    var frames = null;
    Error.prepareStackTrace = function (theError, theFrames) {
        frames = theFrames;
    };

    /*jshint expr: true */
    // Calling the `error.stack` getter triggers our custom `Error.prepareStackTrace` function above.
    error.stack;

    // Clean up after ourselves.
    Error.prepareStackTrace = oldErrorPrepareStackTrace;

    return frames;
};
