'use strict';

var init = {
  unit: "",
  value: null
};

var NewFoodConstants = {
  UPDATE_NEW_FOOD_NAME: 'UPDATE_NEW_FOOD_NAME',
  ADD_NEW_PORTION: 'ADD_NEW_PORTION',

  IMPORTANT_FIELD: {
    dietary_fibre: init,
    trans: init,
    saturated: init,
    total_carbs: init,
    sodium: init,
    potassium: init,
    polyunsaturated: init,
    calories: init,
    sugar: init,
    total_fats: init,
    monounsaturated: init,
    cholesterol: init,
    protein: init
  }
}

module.exports = NewFoodConstants;