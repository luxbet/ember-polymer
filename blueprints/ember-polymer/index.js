/* global module */

module.exports = {
  afterInstall: function() {
    var self = this;

    return this.addPackagesToProject([
    ]).then(function() {
      return self.addBowerPackagesToProject([
        { name: "Polymer/polymer", target: "~0.5.2" },
        { name: "Polymer/core-elements", target: "~0.5.2" },
        { name: "Polymer/paper-elements", target: "~0.5.2" }
      ]);
    });
  },

  normalizeEntityName: function() {}
};
