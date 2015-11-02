'use strict';

var cx = React.addons.classSet;

var Nutrient = React.createClass({
  displayName: 'Nutrient',
  mixins: [FluxMixin, StoreWatchMixin("MealDetailsStore")],
  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
      mealNutrient: flux.stores.MealDetailsStore.getMealNutrient(),
      goodBadOrder: flux.stores.MealDetailsStore.getGoodBadOrder()
    }
  },
  updateNutrient: function(type, nutrient, e) {
    console.log("update nutrient", type, nutrient, e);
    e.preventDefault();
    e.stopPropagation();
    var mealNutrient = this.state.mealNutrient;
    console.log("meal nutrient:", mealNutrient[nutrient]);
    var flux = this.getFlux();
    if (mealNutrient[nutrient] == type) {
      flux.actions.MealDetailsActions.updateNutrient(null, nutrient);
    } else {
      flux.actions.MealDetailsActions.updateNutrient(type, nutrient);
    }
  },
  render: function() {
    var Group = [];
    var nutrient = this.props.nutrient;
    var types = this.props.types;
    var mealNutrient = this.state.mealNutrient;
    var goodBadOrder = this.state.goodBadOrder;
    console.log("mealNutrient", mealNutrient);
    for (var i = 0; i < types.length; i++) {
      var labelClasses = cx({
        'good-bad-inactive': mealNutrient[nutrient] != types[i],
        'good-active': ((mealNutrient[nutrient] == types[i]) && (goodBadOrder[nutrient][i] == 'good')),
        'bad-active': ((mealNutrient[nutrient] == types[i]) && (goodBadOrder[nutrient][i] == 'bad')),
      });
      Group.push(
        <div className="col-xs-6 form-group" key={'group' + nutrient + i}>
          <label className={labelClasses}>
            <input type="radio" onChange={this.updateNutrient.bind(this, types[i], nutrient)} name="nutrientGroup" />
            {utils.capitalize(types[i])}
            <br /> {utils.capitalize(nutrient)}
          </label>
        </div>
      );
    }
    return (
      <div className="col-xs-4 good-bad-wrapper">
        {Group}
      </div>
    )
  }
});

module.exports = Nutrient;