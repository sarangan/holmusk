'use strict';

var NewFoodConstants = require('../constants/NewFoodConstants');

var NewFoodActions = {
  updateNewFoodName: function(name) {
    this.dispatch(NewFoodConstants.UPDATE_NEW_FOOD_NAME, name);
  },
  addNewPortion: function(portion) {
  	this.dispatch(NewFoodConstants.ADD_NEW_PORTION, portion);
  }
}

module.exports = NewFoodActions;