'use strict';

var LoginConstants = require('../constants/LoginConstants');

var LoginActions = {
  loginUser: function(opts) {
    var user = {};
    LoginConstants.LOGIN_DATA.map(function(data) {
      user[data] = opts.userMetaData[data];
    });
    sessionStorage.setItem('isLoggedIn', true);
    this.dispatch(LoginConstants.LOGIN_USER, {
      _user: user
    });
  }
}

module.exports = LoginActions;