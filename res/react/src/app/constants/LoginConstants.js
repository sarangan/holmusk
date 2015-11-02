'use strict';

var GenericConstants = require('../constants/GenericConstants');

var API_URL = GenericConstants.API_URL;

var LoginConstants = {
  LOGIN_URL: API_URL + 'login',
  LOGOUT_URL: API_URL + 'logout',

  LOGIN_DATA: ['email', 'firstName', 'lastName'],
  LOGIN_USER: 'LOGIN_USER',
}

module.exports = LoginConstants;