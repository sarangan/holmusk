'use strict';

var MealDetailsConstants = require('../../constants/MealDetailsConstants');

var cx = React.addons.classSet;

var MealFeedback = React.createClass({
  displayName: 'MealFeedback',
  mixins: [ReactRouter.Navigation, FluxMixin, StoreWatchMixin("MealDetailsStore")],
  render: function() {
    var MealFeedbackList = [];

    return (
      <div>
        {MealFeedbackList}
      </div>
    )
  }
});

module.exports = MealFeedback;
