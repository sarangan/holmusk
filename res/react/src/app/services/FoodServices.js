'use strict';

var Promise = require('bluebird');
var _ = require('lodash');

var AJAXConstants = require('../constants/AJAXConstants');
var FoodSearchConstants = require('../constants/FoodSearchConstants');

var FoodServices = {
  getFoodById: function(opts) {
    console.log("Get Food By Id");
    console.log("   opts", opts);
    var options = {
      type: "GET",
      url: FoodSearchConstants.GET_FOOD_URL + '?_id=' + opts.foodId,
      contentType: "application/json",
      dataType: "json"
    };
    options = _.merge({}, options, AJAXConstants.defaultOptions);
    return Promise.resolve(
      $.ajax(options)
    );
  },
  searchFoods: function(opts) {
    console.log("Search Foods");
    console.log("   opts", opts, FoodSearchConstants.SEARCH_FOODS_URL + '?q=' + opts.query + '&page=' + opts.pageNum + '&limit=' + FoodSearchConstants.NUM_FOOD_PER_PAGE);
    var options = {
      type: "GET",
      url: FoodSearchConstants.SEARCH_FOODS_URL + '?q=' + opts.query + '&page=' + opts.pageNum + '&limit=' + FoodSearchConstants.NUM_FOOD_PER_PAGE,
      contentType: "application/json",
      dataType: "json"
    };
    options = _.merge({}, options, AJAXConstants.defaultOptions);
    return Promise.resolve(
      $.ajax(options)
    );
  }
}

module.exports = FoodServices;
