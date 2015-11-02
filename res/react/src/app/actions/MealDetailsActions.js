'use strict';

var MealDetailsConstants = require('../constants/MealDetailsConstants');
var FoodSearchConstants = require('../constants/FoodSearchConstants')

var MealDetailsActions = {
  setMeal: function(opts) {
    this.dispatch(MealDetailsConstants.SET_MEAL, {
      _meal: opts.meal
    });
    this.dispatch(FoodSearchConstants.RESET);
  },
  addFood: function(food) {
    this.dispatch(MealDetailsConstants.ADD_FOOD, food);
  },
  deleteFood: function(food) {
    this.dispatch(MealDetailsConstants.DELETE_FOOD, food);
  },
  updateAddedFood: function(addedFood, details) {
    this.dispatch(MealDetailsConstants.UPDATE_ADDED_FOOD, {
      addedFood: addedFood,
      details: details
    });
  },
  updateAddedFoods: function(addedFoods) {
    this.dispatch(MealDetailsConstants.UPDATE_ADDED_FOODS, addedFoods);
  },
  updateHoverRating: function(rating) {
    this.dispatch(MealDetailsConstants.UPDATE_HOVER_RATING, rating);
  },
  updateRating: function(rating) {
  	this.dispatch(MealDetailsConstants.UPDATE_RATING, rating);
  },
  updateNutrient: function(type, nutrient) {
    this.dispatch(MealDetailsConstants.UPDATE_NUTRIENT, {
      type: type,
      nutrient: nutrient
    });
  },
  updateFruitServings: function(fruitServings) {
    this.dispatch(MealDetailsConstants.UPDATE_FRUIT_SERVINGS, fruitServings);
  },
  updateVegServings: function(vegServings) {
    this.dispatch(MealDetailsConstants.UPDATE_VEG_SERVINGS, vegServings);
  }
}

module.exports = MealDetailsActions;