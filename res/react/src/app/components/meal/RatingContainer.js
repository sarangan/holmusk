'use strict';

var Star = require('./Star');
var HighLowList = require('./HighLowList');
var utils = require('../../utils/utils.js');

var MealDetailsConstants = require('../../constants/MealDetailsConstants');

var RatingContainer = React.createClass({
  displayName: 'RatingContainer',
  mixins: [FluxMixin, StoreWatchMixin("MealDetailsStore")],
  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
      meal: flux.stores.MealDetailsStore.getMeal(),
      fruitServings: flux.stores.MealDetailsStore.getFruitServings(),
      vegServings: flux.stores.MealDetailsStore.getVegServings()
    };
  },
  updateFruitServings: function(e) {
    e.preventDefault();
    e.stopPropagation();
    var fruitServings = utils.formatFloat(e.target.value);
    var flux = this.getFlux();
    flux.actions.MealDetailsActions.updateFruitServings(fruitServings);
  },
  updateVegServings: function(e) {
    e.preventDefault();
    e.stopPropagation();
    var vegServings = utils.formatFloat(e.target.value);
    var flux = this.getFlux();
    flux.actions.MealDetailsActions.updateVegServings(vegServings);
  },
  render: function() {
    var Stars = [];
    var fruitServings = this.state.fruitServings;
    var vegServings = this.state.vegServings;
    for (var i = 1; i <= MealDetailsConstants.NUM_STARS; i++) {
        Stars.push(<Star id={i} key={i}/>);
    }
    return (
      <div className="rating-container" onMouseOver={this.setRatingVisible} onMouseLeave={this.unsetRatingVisible}>
        <div className="row rating">
          <div className="col-xs-12 star-wrapper">
            Rating:
            {Stars}
          </div>

          <HighLowList />

          <div className="col-xs-12 quantity-rating-wrapper">
            <div className="row">
              <div className="col-xs-6">
                <div>Fruit servings</div>
                <input className="quantity-rating" type="number" min="0" step="0.5" value={fruitServings} onChange={this.updateFruitServings} />
              </div>
              <div className="col-xs-6 quantity-rating-wrapper">
                <div>Vegetable servings</div>
                <input className="quantity-rating" type="number" min="0" step="0.5" value={vegServings} onChange={this.updateVegServings} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = RatingContainer;
