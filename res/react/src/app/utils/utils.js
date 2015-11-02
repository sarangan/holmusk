'use strict';

var _ = require('lodash');

var utils = {
 capitalize: function(name) {
    if (typeof name != 'string') {
      return;
    }
    return name.split(' ').reduce(function(prev, cur) {
      return prev + ' ' + cur.charAt(0).toUpperCase() + cur.substring(1);
    }, '');
  },
  formatNumber: function(number) {
    return number.toString().length > 5 ? number.toPrecision(4) : number.toString();
  },
  formatFloat: function(str) {
    str = str.replace(/^0+/, '');
    if (str[0] == '.' || str.length == 0) str = '0' + str;
    return str;
  },
  getName: function(meal) {
    if (meal == null) return '';
    var tags = meal.data.tags;
    var name = '';
    for (var i = 0; i < tags.length; i++) {
      name += this.capitalize(tags[i].name) + (i == tags.length - 1 ? '' : ', ');
    }
    return name;
  },
  getPatientName: function(meal) {
    if (meal == null) return '';
    return this.capitalize(meal.firstName + (meal.lastName ? ' ' + meal.lastName : ''));
  },
  getPhotoUrl: function(meal) {
    if (meal == null) return '';
    return meal.data.photo.url || '';
  },
  getPortion: function(meal) {
    if (meal == null) return '';
    return this.capitalize(meal.data.portion);
  },
  getDescription: function(meal) {
    if (meal == null) return '';
    return meal.data.description || '';
  },
  getRating: function(meal) {
    if (meal == null) return 0;
    return meal.data.rating || 0;
  },
  getTimeAgo: function(meal) {
    return moment(meal.timestamp).fromNow();
  },
  getTimeEaten: function(meal) {
    return moment(meal.timestamp).format('h:mma');
  },
  getIsReviewed: function(meal) {
    return meal.data.isReviewed;
  },
  hasFood: function(listOfFoods, foodId) {
    var predicate = {
      foodId: foodId
    }
    return (_.findWhere(listOfFoods, predicate) != null);
  }
}

module.exports = utils;
