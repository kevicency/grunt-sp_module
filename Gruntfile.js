/*
 * grunt-spModule
 * https://github.com/kmees/grunt-spModule
 *
 * Copyright (c) 2013 Kevin Mees
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      },
    },

    // Configuration to be run (and then tested).
    spModule: {
      test: {
        options: {
          name: 'myModuleName'
        },
        files: [{
          cwd: '.tmp/myModule',
          src: '{,*/}*.*'
        }]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

    clean: {
      test: '.tmp'
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Setup a test helper to create some folders to clean.
  grunt.registerTask('copy', 'Copy fixtures to a .tmp/', function() {
    grunt.file.copy('test/fixtures/foo.html', '.tmp/myModule/foo.html');
    grunt.file.copy('test/fixtures/subdir/bar.html', '.tmp/myModule/subdir/bar.html');
  });

  // Whenever the 'test' task is run, first create some files to be cleaned,
  // then run this plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean:test', 'copy', 'spModule:test', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);
};
