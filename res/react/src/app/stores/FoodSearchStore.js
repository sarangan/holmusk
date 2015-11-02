'use strict';

var FoodSearchConstants = require('../constants/FoodSearchConstants');

var FoodSearchStore = Fluxxor.createStore({
  displayName: 'FoodSearchStore',

  initialize: function(opts) {
    this._foodQuery = opts._foodQuery || '';

    this._hoverFoodIndex = opts._hoverFoodIndex || -1;

    this._matchedFoods = opts._matchedFoods || [];

    this._hasMore = opts._hasMore || false;

    this.bindActions(
      FoodSearchConstants.SET_FOODS, this.onSetFoods,
      FoodSearchConstants.SET_HAS_MORE, this.onSetHasMore,
      FoodSearchConstants.ADD_FOODS, this.onAddFoods,
      FoodSearchConstants.UPDATE_QUERY, this.onUpdateQuery,
      FoodSearchConstants.UPDATE_HOVER_FOOD_INDEX, this.onUpdateHoverFoodIndex,
      FoodSearchConstants.RESET, this.onReset
    );
  },
  onReset: function() {
    this._foodQuery = '';
    this._hoverFoodIndex = -1;
    this._matchedFoods = [];
    this._hasMore = false;
  },
  onSetFoods: function(payload) {
    var query = payload._query;
    var foods = payload._foods;
    if (this._foodQuery == query) {
      this._matchedFoods = foods;
    }
    this._hasMore = foods.length > 0;
    this._hoverFoodIndex = -1;
    console.log("HASMORE:", this._hasMore);
    this.emit("change");
  },
  onSetHasMore: function(hasMore) {
    this._hasMore = hasMore;
    this.emit("change");
  },
  onAddFoods: function(foods) {
    this._matchedFoods = this._matchedFoods.concat(foods);
    this._hasMore = this._hasMore && foods.length > 0;
    this.emit("change");
  },
  onUpdateQuery: function(query) {
    this._foodQuery = query;
    this.emit("change");
  },
  onUpdateHoverFoodIndex: function(index) {
    this._hoverFoodIndex = index;
    this.emit("change");
  },
  getFoodQuery: function() {
    return this._foodQuery;
  },
  getMatchedFoods: function() {
    return this._matchedFoods;
  },
  getHasMore: function() {
    return this._hasMore;
  },
  getHoverFoodIndex: function() {
    return this._hoverFoodIndex;
  }
});

module.exports = FoodSearchStore;