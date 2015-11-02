'use strict';

var GenericConstants = require('../constants/GenericConstants');

var API_URL = GenericConstants.API_URL;

var UserConstants = {
  GET_USER_URL: function(userId) {
  	return API_URL + 'user/' + userId + '/name'
  }
}

module.exports = UserConstants;