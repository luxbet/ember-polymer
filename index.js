/* jshint node: true */
// 'use strict';

var vulcanize = require('broccoli-vulcanize');
var funnel = require('broccoli-funnel');
var mergeTrees  = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-polymer',

  contentFor: function(type, config) {
    if (type === 'head-footer') {
      return [
        '<script src="webcomponents.js"></script>',
        '<link rel="import" href="elements.html">'
      ];
    }
  },

  treeForPublic: function(tree) {
    var webcomponents = funnel('bower_components/webcomponentsjs', {
      srcDir: '/',
      files: ['webcomponents.js'],
      destDir: '/'
    });

    var vulcanized = vulcanize('app', {
      input: 'elements.html',
      csp: true,
      inline: true,
      strip: true,
      excludes: {
        imports: ["(^data:)|(^http[s]?:)|(^\/)"],
        scripts: ["(^data:)|(^http[s]?:)|(^\/)"],
        styles: ["(^data:)|(^http[s]?:)|(^\/)"]
      }
    });

    var trees = [webcomponents, vulcanized];
    if (tree) {
      trees.unshift(tree);
    }

    return mergeTrees(trees);
  }
};
