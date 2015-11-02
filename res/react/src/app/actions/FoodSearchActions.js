'use strict';

var FoodSearchConstants = require('../constants/FoodSearchConstants');

var FoodSearchActions = {
  setFoods: function(query, foods) {
    this.dispatch(FoodSearchConstants.SET_FOODS, {
      _query: query,
      _foods: foods
    });
  },
  setHasMore: function(hasMore) {
    this.dispatch(FoodSearchConstants.SET_HAS_MORE, hasMore);
  },
  addFoods: function(foods) {
    this.dispatch(FoodSearchConstants.ADD_FOODS, foods);
  },
  updateQuery: function(query) {
  	this.dispatch(FoodSearchConstants.UPDATE_QUERY, query);
  },
  updateHoverFoodIndex: function(index) {
  	this.dispatch(FoodSearchConstants.UPDATE_HOVER_FOOD_INDEX, index);
  }
}

module.exports = FoodSearchActions;