'use strict';

var _ = require('lodash');
var MealDetailsConstants = require('../constants/MealDetailsConstants');
var UserServices = require('../services/UserServices');
var utils = require('../utils/utils');

var MealDetailsStore = Fluxxor.createStore({
  displayName: 'MealDetailsStore',

  initialize: function(opts) {
    var goodPoor = ['good', 'poor'];
    var lowHigh = ['low', 'high'];
    var goodBad = ['good', 'bad'];
    var badGood = ['bad', 'good'];

    this._meal = opts._meal || null;

    if (this._meal == null || !this._meal.data.review.rating) this._hoverRating = 0;
    else this._hoverRating = this._meal.data.review.rating;

    this._highLowList = opts._highLowList || ['carb', 'sugar', 'fat', 'protein', 'fibre', 'salt', 'portion'];
    this._nutrientsTypes = opts._nutrientsTypes || {
      carb: goodPoor,
      sugar: lowHigh,
      fat: lowHigh,
      protein: goodPoor,
      salt: lowHigh,
      fibre: lowHigh,
      portion: goodPoor
    };
    this._goodBadOrder = opts._goodBadOrder || {
      carb: goodBad,
      sugar: goodBad,
      fat: goodBad,
      protein: goodBad,
      salt: goodBad,
      fibre: badGood,
      portion: goodBad
    };
    if (this._meal == null || !this._meal.data.review.tags) this._addedFoods = [];
    else this._addedFoods = this._meal.data.review.tags;

    this.bindActions(
      MealDetailsConstants.SET_MEAL, this.onSetMeal,
      MealDetailsConstants.ADD_FOOD, this.addFood,
      MealDetailsConstants.DELETE_FOOD, this.deleteFood,
      MealDetailsConstants.UPDATE_ADDED_FOOD, this.onUpdateAddedFood,
      MealDetailsConstants.UPDATE_ADDED_FOODS, this.onUpdateAddedFoods,
      MealDetailsConstants.UPDATE_HOVER_RATING, this.onUpdateHoverRating,
      MealDetailsConstants.UPDATE_RATING, this.onUpdateRating,
      MealDetailsConstants.UPDATE_NUTRIENT, this.onUpdateNutrient,
      MealDetailsConstants.UPDATE_FRUIT_SERVINGS, this.onUpdateFruitServings,
      MealDetailsConstants.UPDATE_VEG_SERVINGS, this.onUpdateVegServings
    );

    this._inverseId = [];
  },
  onSetMeal: function(payload) {
    this._meal = payload._meal;
    if (this._meal == null || !this._meal.data.review.rating) this._hoverRating = 0;
    else this._hoverRating = this._meal.data.review.rating;

    if (this._meal == null || !this._meal.data.review.tags) this._addedFoods = [];
    else this._addedFoods = this._meal.data.review.tags;

    if (this._meal != null) {
      this._meal.lastReviewed = utils.getTimeAgo({
        timestamp: this._meal.updatedAt
      });
      this._meal.reviewer = null;
      var reviewerId = this._meal.data.review.reviewerId;
      if (reviewerId) {
        UserServices.getUser(reviewerId).then(function(response) {
          console.log("response", response);
          if (response.success) {
            this._meal.reviewer = utils.capitalize(response.data.firstName + (response.data.lastName ? ' ' + response.data.lastName : ''));
          }
          this.emit("change");
        }.bind(this)).catch(function(err) {
          this.emit("change");
        }.bind(this));
      } else this.emit("change");
    } else this.emit("change");
  },
  addFood: function(food) {
    this.deleteFood(food);
    this._addedFoods.push(food);
    this.emit("change");
  },
  deleteFood: function(food) {
    var predicate = {
      foodId: food.foodId
    }
    if (_.findWhere(this._addedFoods, predicate) != null) {
      console.log("deleted!");
      this._addedFoods = _.reject(this._addedFoods, function(addedFood) {
        return addedFood.foodId == food.foodId;
      });
      this.emit("change");
    }
  },
  onUpdateAddedFood: function(payload) {
    var addedFood = payload.addedFood;
    var details = payload.details;
    console.log("add food", addedFood);
    var predicate = {
      foodId: addedFood.foodId
    }
    addedFood.details = details;
    console.log("addedFood");
    var match = _.find(this._addedFoods, predicate);
    console.log("match:", match);
    if (match) {
      var index = _.indexOf(this._addedFoods, predicate);
      console.log("index is", index, this._addedFoods, predicate);
      this._addedFoods.splice(index, 1, addedFood);
      console.log("splice");
    }
    /* else {
      this._addedFoods.push(addedFood);
      console.log("push");
    }*/
    this.emit("change");
  },
  onUpdateAddedFoods: function(addedFoods) {
    this._addedFoods = addedFoods;
    this.emit("change");
  },
  onUpdateHoverRating: function(rating) {
    this._hoverRating = rating;
    this.emit("change");
  },
  onUpdateRating: function(rating) {
    console.log("onUpdateRating", rating);
  	this._meal.data.review.rating = rating;
  	this.emit("change");
  },
  onUpdateNutrient: function(payload) {
    console.log("update nutrient", payload);
    var nutrient = payload.nutrient;
    var type = payload.type;
    this._meal.data.review[nutrient] = type;
    this.emit("change");
  },
  onUpdateFruitServings: function(fruitServings) {
    this._meal.data.review.fruitServings = fruitServings;
    this.emit("change");
  },
  onUpdateVegServings: function(vegServings) {
    this._meal.data.review.vegServings = vegServings;
    this.emit("change");
  },
  getMeal: function() {
    return this._meal;
  },
  getRating: function() {
    if (this._meal == null) return 0;
    if (!this._meal.data.review.rating) return 0;
    return this._meal.data.review.rating;
  },
  getHoverRating: function() {
    return this._hoverRating;
  },
  getHighLowList: function() {
    return this._highLowList;
  },
  getNutrientsTypes: function() {
    return this._nutrientsTypes;
  },
  getMealNutrient: function() {
    console.log("meal:", this._meal);
    if (this._meal == null) return {};
    var result = {};
    for (var nutrient of this._highLowList) {
      result[nutrient] = this._meal.data.review[nutrient];
    }
    return result;
  },
  getGoodBadOrder: function() {
    return this._goodBadOrder;
  },
  getFruitServings: function() {
    if (this._meal == null) return 0;
    if (!this._meal.data.review.fruitServings) return 0;
    return this._meal.data.review.fruitServings;
  },
  getVegServings: function() {
    if (this._meal == null) return 0;
    if (!this._meal.data.review.vegServings) return 0;
    return this._meal.data.review.vegServings;
  },
  getAddedFoods: function() {
    return this._addedFoods;
  },
  getFoodQuery: function() {
    return this._foodQuery;
  },
  getSuggestedFoods: function() {
    if (this._meal == null) return [];
    return this._meal.data.tags;
  }
});

module.exports = MealDetailsStore;
