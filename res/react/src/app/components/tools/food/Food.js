'use strict';

var Food = React.createClass({
  displayName: 'Food',
  mixins: [FluxMixin],
  getStateFromFlux: function() {
    return {

    }
  },
  render: function() {
    return (
      <span>This component allows nutritionist to update our food DB</span>
    )
  }
});

module.exports = Food;
