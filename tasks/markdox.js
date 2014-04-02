/*
 * grunt-markdox
 * https://github.com/jsmith/grunt-markdox
 *
 * Copyright (c) 2014 Jeffrey Smith
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('markdox', 'A grunt plugin for the documentation generator markdox.', function() {
    // Force task into async mode and grab a handle to the "done" function.
    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({});

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      var options = {
        output: f.dest
      };

      grunt.file.mkdir(options.output.split('/').slice(0, -1).join(''));

      require('markdox').process(src, options, function (err, output) {
        grunt.log.writeln('File "' + options.output + '" created.');
        done();
      });
    });
  });

};
