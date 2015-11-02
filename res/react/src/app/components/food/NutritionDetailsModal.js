'use strict';

var utils = require('../../utils/utils.js');

var NutritionDetailsModal = React.createClass({
  displayName: 'NutritionDetailsModal',
  mixins: [FluxMixin, StoreWatchMixin("MealDetailsStore")],
  getInitialState: function() {
    return {
      showNutritionDetailsModal: false,
      selectedFood: null,
      numPortions: 1,
      portionIndex: 0
    }
  },
  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
      meal: flux.stores.MealDetailsStore.getMeal(),
    }
  },
  openNutritionDetailsModal: function(food, numPortions, portionIndex) {
    this.setState({
      showNutritionDetailsModal: true,
      selectedFood: food,
      numPortions: numPortions,
      portionIndex: portionIndex
    });
  },
  closeNutritionDetailsModal: function() {
    this.setState({
      showNutritionDetailsModal: false
    });
  },
  addFoodList: function(e) {
    e.preventDefault();
    e.stopPropagation();
    var flux = this.getFlux();
    console.log("zzz", this.state.numPortions);
    console.log("zzz", parseFloat(this.state.numPortions));
    if (isNaN(parseFloat(this.state.numPortions))) {
      console.log("not a number");
      alert("portions is not a number");
    } else {
      this.closeNutritionDetailsModal();
      var food = {
        foodId: this.state.selectedFood._id,
        portionIndex: this.state.portionIndex,
        numPortions: parseFloat(this.state.numPortions),
        details: this.state.selectedFood
      };
      flux.actions.MealDetailsActions.addFood(food);
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
    var meal = this.state.meal;
    var selectedFood = this.state.selectedFood;
    var opts = {
      photoUrl: utils.getPhotoUrl(meal),
      selectedFoodName: selectedFood == null ? '' : selectedFood.name
    };

    var numPortions = this.state.numPortions;
    var portionIndex = this.state.portionIndex;

    var PortionOptions = [];
    var ImportantNutrients = [];
    var portions = [];
    var important = null;
    if (selectedFood != null) {
      portions = selectedFood.portions || [];
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
      <Modal show={this.state.showNutritionDetailsModal} onHide={this.closeNutritionDetailsModal} bsSize="lg">
        <Modal.Header closeButton>
          <Modal.Title>Nutrition Facts</Modal.Title>
        </Modal.Header>
        <Modal.Body modalClassName="modal-body container-fluid">
          <div className="row">
            <div className="col-xs-4 nutrition-food">
              <img src={opts.photoUrl} />
            </div>

            <div className="col-xs-8">
              <div>
                <h5>{opts.selectedFoodName}</h5>
                <p>Confirmed by:</p>
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
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" bsStyle="primary" onClick={this.addFoodList}>Add</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

module.exports = NutritionDetailsModal;
