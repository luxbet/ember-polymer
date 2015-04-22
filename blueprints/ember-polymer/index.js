/* global module */

module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addBowerPackagesToProject([
      { name: "Polymer/polymer", target: "~0.5.5" },
      { name: "Polymer/core-elements", target: "~0.5.5" },
      { name: "Polymer/paper-elements", target: "~0.5.5" },
      { name: "webcomponentsjs", target: "~0.6.1" }
    ]);
  }
};
