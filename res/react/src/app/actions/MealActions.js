'use strict';

var MealConstants = require('../constants/MealConstants');

var MealActions = {
  addMeals: function(opts) {
    this.dispatch(MealConstants.ADD_MEALS, {
      _mode: opts.mode,
      _meals: opts.meals
    });
  },
  setMode: function(mode) {
  	this.dispatch(MealConstants.SET_MODE, mode);
  },
  updateMeal: function(opts) {
  	this.dispatch(MealConstants.UPDATE_MEAL, {
      _initialState: opts.initialState,
      _meal: opts.meal
    });
  }
}

module.exports = MealActions;
