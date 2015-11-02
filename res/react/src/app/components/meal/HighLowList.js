'use strict';

var Nutrient = require('./Nutrient');

var HighLowList = React.createClass({
  displayName: 'HighLowList',
  mixins: [FluxMixin, StoreWatchMixin("MealDetailsStore")],
  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
      highLowList: flux.stores.MealDetailsStore.getHighLowList(),
      nutrientsTypes: flux.stores.MealDetailsStore.getNutrientsTypes()
    };
  },
  render: function() {
    var Nutrients = [];
    var highLowList = this.state.highLowList;
    var nutrientsTypes = this.state.nutrientsTypes;
    for (var nutrient of highLowList) {
      Nutrients.push(<Nutrient nutrient={nutrient} types={nutrientsTypes[nutrient]} key={nutrient}/>);
    }
    return (
      <div>
        {Nutrients}
      </div>
    )
  }
});

module.exports = HighLowList;