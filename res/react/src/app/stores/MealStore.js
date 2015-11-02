'use strict';

var MealConstants = require('../constants/MealConstants');

var MealStore = Fluxxor.createStore({
  displayName: 'MealStore',

  initialize: function(opts) {
    this._meals = opts._meals || {
      'pending': [],
      'scored': [],
      'feedback': [],
      'not-food': []
    };
    this._hasMore = opts._hasMore || {
      'pending': true,
      'scored': true,
      'feedback': true,
      'not-food': true
    };
    this._pageNum = opts._pageNum || {
      'pending': 0,
      'scored': 0,
      'feedback': 0,
      'not-food': 0
    };
    this._mode = opts._mode || 'pending';

    this.bindActions(
      MealConstants.ADD_MEALS, this.onAddMeals,
      MealConstants.SET_MODE, this.setMode,
      MealConstants.UPDATE_MEAL, this.updateMeal
    );
  },
  onAddMeals: function(payload) {
  	this._meals[payload._mode] = this._meals[payload._mode].concat(payload._meals);
    this._hasMore[payload._mode] = payload._meals.length > 0;
    this._pageNum[payload._mode] = this._pageNum[payload._mode] + 1;
  	this.emit("change");
  },
  updateMeal: function(payload) {
    var initialState = payload._initialState;
    var meal = payload._meal;
    var finalState = meal.data.state;
    console.log("update meal:", initialState, finalState, meal);
//    console.log("update meal:", state, meal, this._meals['pending'], this._meals['scored']);
    for (var i = 0; i < this._meals[initialState].length; i++) {
      if (this._meals[initialState][i].id == meal.id) {
        this._meals[initialState].splice(i, 1);
        this._meals[finalState].unshift(meal);
        break;
      }
    }
    this.emit("change");
  },
  setMode: function(mode) {
    this._mode = mode;
    this.emit("change");
  },
  getMeals: function() {
    return this._meals;
  },
  getHasMore: function() {
    return this._hasMore;
  },
  getPageNum: function() {
    return this._pageNum;
  },
  getMode: function() {
    return this._mode;
  }
});

module.exports = MealStore;
