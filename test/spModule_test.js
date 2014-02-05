/* global exports, process */

var grunt = require('grunt');

function readFile(file) {
  var contents = grunt.file.read(file);
  if (process.platform === 'win32') {
    contents = contents.replace(/\r\n/g, '\n');
  }
  return contents.replace(/\n$/, '');
}

function assertFileEquality(test, pathToActual, pathToExpected, message) {
  var actual = readFile(pathToActual);
  var expected = readFile(pathToExpected);
  test.equal(expected, actual, message);
}

exports.spModule = {
  elements: function(test) {
    test.expect(1);

    assertFileEquality(test,
                       '.tmp/myModule/Elements.xml',
                       'test/expected/Elements.xml',
                       'Should create Elements.xml');

    test.done();
  },

  projectItem: function(test) {
    test.expect(1);

    assertFileEquality(test,
                       '.tmp/myModule/SharePointProjectItem.spdata',
                       'test/expected/SharePointProjectItem.spdata',
                       'Should create SharePointProjectItem.spdata');

    test.done();
  }
};
