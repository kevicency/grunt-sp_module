/*
 * grunt-spModule
 * https://github.com/kmees/grunt-spModule
 *
 * Copyright (c) 2014 Kevin Mees
 * Licensed under the MIT license.
 */

var path = require('path');
var fs = require('fs');
var xmlbuilder = require('xmlbuilder');

var winPath = {
  join: function() {
    return winPath.convert(path.join.apply(path, arguments));
  },
  convert: function(path) {
    return path.replace(/\//g, '\\');
  },
  appendTrailingSlash: function(path) {
    return path + '\\';
  }
};


module.exports = function(grunt) {
  'use strict';

  grunt.registerMultiTask('sp_module', 'Creates SharePoint Module files', function() {
    var me = this;
    var options = this.options();

    me.files.forEach(function(fileConfig) {
      var cwdParts = fileConfig.cwd.split('/');
      var base = cwdParts[cwdParts.length - 1];

      var elementsXml = xmlbuilder.create('Elements', {encoding: 'UTF-8'})
        .att('xmlns', 'http://schemas.microsoft.com/sharepoint/')
        .ele('Module')
          .att('Name', options.name || me.target);
      var projectItemXml = xmlbuilder.create('ProjectItem', {encoding: 'UTF-8'})
        .att('xmlns', 'http://schemas.microsoft.com/VisualStudio/2010/SharePointTools/SharePointProjectItemModel')
        .att('Type', 'Microsoft.VisualStudio.SharePoint.Module')
        .att('DefaultFile', 'Elements.xml')
        .att('SupportedTrustLevels', 'All')
        .att('SupportedDeploymentScopes', 'Web, Site')
        .ele('Files')
          .ele('ProjectItemFile')
            .att('Source', 'Elements.xml')
            .att('Target', winPath.appendTrailingSlash(base))
            .att('Type', 'ElementManifest')
            .up();


      fileConfig.src.forEach(function(relativeFile) {
        var stats = fs.statSync(path.join(fileConfig.cwd, relativeFile))
        if (stats.isFile()) {
          var file = winPath.join(base, relativeFile);
          var dirname = path.dirname(relativeFile);
          relativeFile = winPath.convert(relativeFile);

          elementsXml.ele('File')
            .att('Path', file)
            .att('Url', file.replace(/\\/g, '/'))
            .att('ReplaceContent', 'TRUE');

          var target = winPath.appendTrailingSlash(winPath.join(base, dirname));
          projectItemXml.ele('ProjectItemFile')
            .att('Source', relativeFile)
            .att('Target', target)
            .att('Type', 'ElementFile');
        }
      });

      var elementFile = path.join(fileConfig.cwd, 'Elements.xml');
      var projectItemFile = path.join(fileConfig.cwd, 'SharePointProjectItem.spdata');
      grunt.file.write(elementFile, elementsXml.end({pretty: true}));
      grunt.file.write(projectItemFile, projectItemXml.end({pretty: true}));
    });
  });
};
