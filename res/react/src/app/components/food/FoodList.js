'use strict';

var NutritionDetailsModal = require('./NutritionDetailsModal');

var FoodList = React.createClass({
  displayName: 'FoodList',
  mixins: [FluxMixin, StoreWatchMixin("MealDetailsStore")],
  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
      addedFoods: flux.stores.MealDetailsStore.getAddedFoods()
    }
  },
  handleDeleteFood: function(food, e) {
    e.preventDefault();
    e.stopPropagation();
    var flux = this.getFlux();
    flux.actions.MealDetailsActions.deleteFood(food);
  },
  openNutritionDetailsModal: function(index, e) {
    e.preventDefault();
    e.stopPropagation();
    var addedFood = this.state.addedFoods[index];
    var food = addedFood.details;
    var numPortions = addedFood.numPortions;
    var portionIndex = addedFood.portionIndex;
    //console.log("open this food:", food, numPortions, portionIndex);
    this.props.openNutritionDetailsModal(food, numPortions, portionIndex);
  },
  render: function() {
    var addedFoods = this.state.addedFoods;
    var AddedFoodsList = [];
    for (var i = 0; i < addedFoods.length; i++) {
      var food = addedFoods[i];
      if (food) {
        var portionName = (food.details) ? food.details.portions[food.portionIndex].name : '';
        var numPortions = food.numPortions;
        console.log("food:", food);
        AddedFoodsList.push(
          <div className="food-result-added" key={food.foodId}>
            <a className="food-result added" onClick={this.openNutritionDetailsModal.bind(this, i)}>
              {food.details ? food.details.name : null}
              <span>: {numPortions} portion of {portionName}</span>
            </a>
            <button className="btn btn-default delete" onClick={this.handleDeleteFood.bind(this, food)}>
              <span className="fa fa-minus"></span>
            </button>
          </div>
        );
      }
    }
    return (
      <div>
        <p>Added food item</p>
        <div className="food-result-wrapper">
          {!addedFoods.length ? <div className="food-result">None</div> : null}
          {AddedFoodsList}
        </div>
      </div>
    )
  }
});

module.exports = FoodList;