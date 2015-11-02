'use strict';

var Search = require('../../../../common/search/Search');

var ScoreFood = React.createClass({
  displayName: 'ScoreFood',
  mixins: [FluxMixin],
  getInitialState: function() {
    return {
    }
  },
  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
    };
  },
  render: function() {
    return (
      <div id="scoreFood">
        <p>Score Food</p>
        <Search view="food" {...this.props}/>
      </div>
    )
  }
});

module.exports = ScoreFood;
