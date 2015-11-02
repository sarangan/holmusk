'use strict';

var utils = require('../../utils/utils.js');

var FoodNutrientDetails = React.createClass({
  displayName: 'FoodNutrientDetails',
  mixins: [FluxMixin, StoreWatchMixin("SearchStore")],
  getInitialState: function() {
    return {
      numPortions: 1,
      portionIndex: 0
    }
  },
  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
      selectedObject: flux.stores.SearchStore.getSelectedObject(),
    }
  },
  updateNumPortions: function(e) {
    e.preventDefault();
    e.stopPropagation();
    var numPortions = utils.formatFloat(e.target.value);
    this.setState({
      numPortions: numPortions
    });
  },
  updateSelectedPortion: function(e) {
    e.preventDefault();
    e.stopPropagation();
    var portionIndex = parseInt(e.target.value);
    this.setState({
      portionIndex: portionIndex
    });
  },
  render: function() {
    var numPortions = this.state.numPortions;
    var portionIndex = this.state.portionIndex;
    var selectedObject = this.state.selectedObject;
    console.log("selected:zzz", selectedObject);

    var PortionOptions = [];
    var ImportantNutrients = [];
    var portions = [];
    var important = null;
    if (selectedObject != null) {
      portions = selectedObject.portions || [];
      important = portions[portionIndex].nutrients.important;
    }
    for (var i = 0; i < portions.length; i++) {
      PortionOptions.push(<option key={i} value={i} selected={portionIndex == i}>{portions[i].name}</option>);
    }
    console.log("important", important);
    for (var entry in important) {
      var name = entry;
      var quantity = important[name];
      ImportantNutrients.push(
        <div className="col-xs-12 col-sm-6" key={name}>
          <div className="row">
            <div className="col-xs-7">
              {utils.capitalize(name)}
            </div>
            <div className="col-xs-5 nutrient-quantity">
              {quantity == null ? 'N.A.' : utils.formatNumber(quantity.value * numPortions) + ' ' + quantity.unit}
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        <h1>Nutrition Facts</h1>
        <div className="row">
          <div className="col-xs-8">
            <div>
              <h5>Brand Name: {selectedObject.brand_name || 'N/A'}</h5>
              <h5>Name: {selectedObject.name || 'N/A'}</h5>
            </div>
            <div className="form-inline">
              Servings:
              <input className="form-control num-servings" type="number" min="0" step="0.5" value={numPortions} onChange={this.updateNumPortions}/>
              <select className="form-control" onChange={this.updateSelectedPortion}>
                {PortionOptions}
              </select>
            </div>
            <div className="container-fluid nutrient-wrapper">
              <hr className="horizontal-divider" />
              <div className="row">
                {ImportantNutrients}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = FoodNutrientDetails;
