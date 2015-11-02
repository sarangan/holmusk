'use strict';

var GenericConstants = require('../constants/GenericConstants');

var SEARCH_API_URL = GenericConstants.SEARCH_API_URL;

var FoodSearchConstants = {
  GET_FOOD_URL: SEARCH_API_URL + 'food',
  SEARCH_FOODS_URL: SEARCH_API_URL + 'food/search',
  SET_FOODS: 'SET_FOODS',
  SET_HAS_MORE: 'SET_HAS_MORE',
  ADD_FOODS: 'ADD_FOODS',
  UPDATE_QUERY: 'UPDATE_QUERY',
  UPDATE_HOVER_FOOD_INDEX: 'UPDATE_HOVER_FOOD_INDEX',
  RESET: 'RESET',
  NUM_FOOD_PER_PAGE: 18
}

module.exports = FoodSearchConstants;