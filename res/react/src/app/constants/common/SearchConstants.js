'use strict';

var GenericConstants = require('../GenericConstants');

var SEARCH_API_URL = GenericConstants.SEARCH_API_URL;

var SearchConstants = {
  GET_FOOD_URL: SEARCH_API_URL + 'food',
  SEARCH_FOODS_URL: SEARCH_API_URL + 'food/search',
  RESET: 'RESET',
  SET_QUERY_STRING: 'SET_QUERY_STRING',
  SET_SELECTED_OBJECT: 'SET_SELECTED_OBJECT',
  SET_SEARCH_RESULTS: 'SET_SEARCH_RESULTS',
  SET_HOVER_RESULT_INDEX: 'SET_HOVER_RESULT_INDEX'
}

module.exports = SearchConstants;
