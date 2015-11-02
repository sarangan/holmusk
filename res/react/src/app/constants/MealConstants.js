'use strict';

var GenericConstants = require('../constants/GenericConstants');

var API_URL = GenericConstants.API_URL;

var MealConstants = {
  GET_MEAL_URL: API_URL + 'meal',
  ADD_MEALS: 'ADD_MEALS',
  SET_MODE: 'SET_MODE',
  NUM_FOOD_PER_PAGE: 18,
  SUBMIT_REVIEW_URL: API_URL + 'meal',
  UPDATE_MEAL: 'UPDATE_MEAL'
}

module.exports = MealConstants;