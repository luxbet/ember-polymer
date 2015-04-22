/* jshint node: true */
// 'use strict';

var vulcanize = require('broccoli-vulcanize');
var Funnel = require('broccoli-funnel');
var mergeTrees  = require('mergeTrees');

module.exports = {
  name: 'ember-polymer',

  contentFor: function contentFor(type, config) {
    if (type === 'head-footer') {
      return [
        '<script src="public/webcomponents-lite.js"></script>',
        '<link rel="import" href="elements.html">'
      ];
    }
  },
  
  treeForApp: function treeForPublic(tree) {
    var vulcanized = vulcanize('app', {
      input: 'elements.html',
      csp: true,
      inline: true,
      strip: !this.isDevelopingAddon(),
      excludes: {
        imports: ["(^data:)|(^http[s]?:)|(^\/)"],
        scripts: ["(^data:)|(^http[s]?:)|(^\/)"],
        styles: ["(^data:)|(^http[s]?:)|(^\/)"]
      }
    );
    
    return mergeTrees([tree, vulcanized]);
  },
  
  treeForPublic: function treeForPublic(tree) {
    var webcomponents = new Funnel('bower_components/webcomponentsjs', {
      srcDir: '/',
      include: ['webcomponents-lite.js'],
      destDir: '/'
    });
    
    return mergeTrees([tree, webcomponents]);
  }
};
