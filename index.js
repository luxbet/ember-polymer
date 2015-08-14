/* jshint node: true */
// 'use strict';

var vulcanize = require('broccoli-vulcanize');
var funnel = require('broccoli-funnel');
var mergeTrees  = require('broccoli-merge-trees');
var BPromise = require('bluebird');
var htmlAutoprefixer = require('html-autoprefixer');
var fs = require('fs');

module.exports = {
  name: 'ember-polymer',

  contentFor: function(type, config) {
    if (type === 'head-footer') {
      return [
        '<script src="assets/webcomponents.js"></script>',
        '<link rel="import" href="assets/' + this.parent.pkg.name + '-vulcanized.html">'
      ];
    }
  },

  treeForPublic: function(tree) {
    var webcomponents = funnel('bower_components/webcomponentsjs', {
      srcDir: '/',
      files: ['webcomponents.js'],
      destDir: '/assets'
    });

    var vulcanized = vulcanize('elements', {
      input: 'index.html',
      output: 'assets/' + this.parent.pkg.name + '-vulcanized.html',
      csp: true,
      inline: true,
      strip: true,
      excludes: {
        imports: ["(^data:)|(^http[s]?:)|(^\/)"],
        scripts: ["(^data:)|(^http[s]?:)|(^\/)"],
        styles: ["(^data:)|(^http[s]?:)|(^\/)"]
      },
      outputHandler: function(filename, data) {
        if (filename.match(/\.html$/)) {
          fs.writeFileSync(filename, htmlAutoprefixer.process(data, null, {browsers: ['last 2 versions'], cascade: false, safe: true}));
        } else {
          fs.writeFileSync(filename, data);
        }
      }
    });

    var trees = [webcomponents, vulcanized];
    if (tree) {
      trees.unshift(tree);
    }

    return mergeTrees(trees);
  }
};
