'use strict';

var cx = React.addons.classSet;

var Star = React.createClass({
  displayName: 'Star',
  mixins: [FluxMixin, StoreWatchMixin("MealDetailsStore")],
  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
      rating: flux.stores.MealDetailsStore.getRating(),
      hoverRating: flux.stores.MealDetailsStore.getHoverRating()
    }
  },
  updateHoverRating: function(rating) {
    var flux = this.getFlux();
    flux.actions.MealDetailsActions.updateHoverRating(rating);
  },
  updateRating: function(rating, e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("update Rating", rating);
    var flux = this.getFlux();
    flux.actions.MealDetailsActions.updateRating(rating);
  },
  render: function() {
    var starNum = this.props.id;
    var id = 'star' + starNum;
    var rating = this.state.rating;
    var hoverRating = this.state.hoverRating;
    console.log("hoverRating:", hoverRating, "rating:", rating);
    var classes = cx({
      'fa': true,
      'fa-star': true,
      'rating-star': true,
      'inactive-star': !(hoverRating >= starNum),
      'active-star': hoverRating >= starNum
    });
    return (
      <div className="form-group" onChange={this.updateRating}>
      <label htmlFor={id}>
          <input type="radio" checked={starNum == rating} onChange={this.updateRating.bind(this, starNum)} id={id} name="starGroup" />
          <span className={classes} onMouseOver={this.updateHoverRating.bind(this, starNum)} onMouseLeave={this.updateHoverRating.bind(this, rating)}></span>
        </label>
      </div>
    )
  }
});

module.exports = Star;