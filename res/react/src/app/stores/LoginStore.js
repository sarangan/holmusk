'use strict';

var LoginConstants = require('../constants/LoginConstants');

var LoginStore = Fluxxor.createStore({
  displayName: 'LoginStore',

  initialize: function(options) {
    this._user = options._user || null;

    this.bindActions(
      LoginConstants.LOGIN_USER, this.onLoginUser
    );
    
  },

  onLoginUser: function(payload) {
    console.log("onLoginUser:", payload);
    this._user = payload._user;
    this.emit("change");
  }
});

module.exports = LoginStore;