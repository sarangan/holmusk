'use strict';

var Promise = require('bluebird');
var _ = require('lodash');

var AJAXConstants = require('../constants/AJAXConstants');
var MealConstants = require('../constants/MealConstants');

var MealServices = {
	getMeals: function(opts) {
		console.log("Get Meals");
    console.log("   opts", opts);
    var options = {
      type: "GET",
      url: MealConstants.GET_MEAL_URL + '?state=' + opts.mode + 
      	'&limit=' + MealConstants.NUM_FOOD_PER_PAGE + '&skip=' + opts.pageNum * MealConstants.NUM_FOOD_PER_PAGE,
      contentType: "application/json",
      dataType: "json"
    };
    options = _.merge({}, options, AJAXConstants.defaultOptions);
    return Promise.resolve(
      $.ajax(options)
    );
	},
  getMealById: function(opts) {
    console.log("Get Meal By Id");
    console.log("   opts", opts);
    var options = {
      type: "GET",
      url: MealConstants.GET_MEAL_URL + '/' + opts.mealId,
      contentType: "application/json",
      dataType: "json"
    };
    options = _.merge({}, options, AJAXConstants.defaultOptions);
    return Promise.resolve(
      $.ajax(options)
    );
  },
  submitReview: function(opts) {
    console.log("Submit Review");
    console.log("   opts", opts);
    var options = {
      type: "POST",
      url: MealConstants.SUBMIT_REVIEW_URL + '/' + opts.mealId + '/review',
      data: JSON.stringify(opts.food),
      contentType: "application/json"
    };
    options = _.merge({}, options, AJAXConstants.defaultOptions);
    return Promise.resolve(
      $.ajax(options)
    );
  }
}

module.exports = MealServices;
