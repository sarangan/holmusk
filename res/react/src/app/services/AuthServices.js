'use strict';

var Promise = require('bluebird');
var _ = require('lodash');

var AJAXConstants = require('../constants/AJAXConstants');
var LoginConstants = require('../constants/LoginConstants');

var AuthServices = {
  login: function(opts) {
    console.log("LOGIN");
    console.log("   email", email);
    console.log("   password", password);
    var options = {
      type: "POST",
      url: LoginConstants.LOGIN_URL,
      contentType: "application/json",
      data: JSON.stringify(opts),
      dataType: "json"
    };
    options = _.merge({}, options, AJAXConstants.defaultOptions);
    return Promise.resolve(
      $.ajax(options)
    );
  },
  logout: function() {
    var options = {
      type: "GET",
      url: LoginConstants.LOGOUT_URL,
      contentType: "application/json",
      dataType: "json"
    };
    options = _.merge({}, options, AJAXConstants.defaultOptions);
    return Promise.resolve(
      $.ajax(options)
    );
  }
}

module.exports = AuthServices;