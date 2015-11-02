'use strict';

var Promise = require('bluebird');
var _ = require('lodash');

var AJAXConstants = require('../constants/AJAXConstants');
var MealDetailsConstants = require('../constants/MealDetailsConstants');

var MealDetailsServices = {
  getMealById: function(opts) {
    console.log("Get Meal By Id");
    console.log("   opts", opts);
    var options = {
      type: "GET",
      url: MealDetailsConstants.GET_MEAL_URL + '/' + opts.mealId,
      contentType: "application/json",
      dataType: "json"
    };
    options = _.merge({}, options, AJAXConstants.defaultOptions);
    return Promise.resolve(
      $.ajax(options)
    );
  }
}

module.exports = MealDetailsServices;
