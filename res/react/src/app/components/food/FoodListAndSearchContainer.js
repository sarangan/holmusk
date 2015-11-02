'use strict';

var NutritionDetailsModal = require('./NutritionDetailsModal');
var NewFoodModal = require('./NewFoodModal');
var FoodList = require('./FoodList');
var FoodSearch = require('./FoodSearch');

var FoodListAndSearchContainer = React.createClass({
  displayName: 'FoodListAndSearchContainer',
  mixins: [FluxMixin],
  openNutritionDetailsModal: function(food, numPortions, portionIndex) {
    this.refs.nutritionDetailsModal.openNutritionDetailsModal(food, numPortions, portionIndex);
  },
  openNewFoodModal: function() {
    this.refs.newFoodModal.openNewFoodModal();
  },
  render: function() {
    return (
      <div className="col-xs-12 col-md-7">
        <FoodList openNutritionDetailsModal={this.openNutritionDetailsModal} openNewFoodModal={this.openNewFoodModal} />
        <FoodSearch openNutritionDetailsModal={this.openNutritionDetailsModal} openNewFoodModal={this.openNewFoodModal} />
        <NutritionDetailsModal ref="nutritionDetailsModal" />
        <NewFoodModal ref="newFoodModal" />
      </div>
    )
  }
});

module.exports = FoodListAndSearchContainer;