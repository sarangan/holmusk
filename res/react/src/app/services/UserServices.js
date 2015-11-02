'use strict';

var Promise = require('bluebird');
var _ = require('lodash');

var AJAXConstants = require('../constants/AJAXConstants');
var UserConstants = require('../constants/UserConstants');

var UserServices = {
  getUser: function(userId) {
    var options = {
      type: "GET",
      url: UserConstants.GET_USER_URL(userId),
      contentType: "application/json",
      dataType: "json"
    };
    options = _.merge({}, options, AJAXConstants.defaultOptions);
    return Promise.resolve(
      $.ajax(options)
    );
  }
}

module.exports = UserServices;