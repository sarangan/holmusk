'use strict';

var NewFoodConstants = require('../constants/NewFoodConstants');

var NewFoodStore = Fluxxor.createStore({
  displayName: 'NewFoodStore',

  initialize: function(opts) {
    this._name = opts._name || '';
    this._portions = opts._portions || [];

    this.bindActions(
      NewFoodConstants.UPDATE_NEW_FOOD_NAME, this.updateNewFoodName,
      NewFoodConstants.ADD_NEW_PORTION, this.addNewPortion
    );
  },
  updateNewFoodName: function(name) {
    this._name = name;
    this.emit("change");
  },
  addNewPortion: function() {
    this._portions.push({
      important: NewFoodConstants.IMPORTANT_FIELD,
      extra: [],
      unhandled: []
    });
    this.emit("change");
  },
  getName: function() {
  	return this._name;
  },
  getPortions: function() {
    return this._portions;
  }
});

module.exports = NewFoodStore;