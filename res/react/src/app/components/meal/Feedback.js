'use strict';

var MealDetailsConstants = require('../../constants/MealDetailsConstants');

var FeedbackServices = require('../../services/FeedbackServices.js');

var cx = React.addons.classSet;

var Feedback = React.createClass({
  displayName: 'Feedback',
  mixins: [ReactRouter.Navigation, FluxMixin, StoreWatchMixin("MealDetailsStore", "FeedbackStore")],
  getInitialState: function() {
    return {
      ratingVisible: false
    }
  },
  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
      meal: flux.stores.MealDetailsStore.getMeal(),
      rating: flux.stores.MealDetailsStore.getRating(),
      highLowList: flux.stores.MealDetailsStore.getHighLowList(),
      fruitServings: flux.stores.MealDetailsStore.getFruitServings(),
      vegServings: flux.stores.MealDetailsStore.getVegServings(),
      addedFoods: flux.stores.MealDetailsStore.getAddedFoods(),
      feedbackQuestions: flux.stores.FeedbackStore.getFeedbackQuestions()
    }
  },
  componentDidMount: function() {
    var flux = this.getFlux();
    FeedbackServices.getFeedbackQuestions({
    }).then(function(response) {
      console.log("response:", response);
      if (response.success) {
        var feedbackQuestions = response.data.feedbackQuestions || [];
        feedbackQuestions.unshift({
            tag: 'Not Food'
        });
        for (var i = 0; i < feedbackQuestions.length; i++) {
          feedbackQuestions[i].isActive = false;
        }
        flux.actions.FeedbackActions.setFeedbackQuestions(feedbackQuestions);
      }
    }.bind(this)).catch(function(err) {
      console.log("error: getFeedbacks", err);
    });
  },
  addNutritionistFeedback: function(idx, e) {
    var feedbackQuestions = this.state.feedbackQuestions;
    var flux = this.getFlux();
    feedbackQuestions[idx].isActive  = !feedbackQuestions[idx].isActive;
    flux.actions.FeedbackActions.setFeedbackQuestions(feedbackQuestions);
  },
  render: function() {
    var FeedbackList = [];
    var feedbackQuestions = this.state.feedbackQuestions;
    for (var i = 0; i < feedbackQuestions.length; i++) {
      var classes = cx({
        'feedback-button': true,
        'active': feedbackQuestions[i].isActive,
        'inactive': !feedbackQuestions[i].isActive
      });
      FeedbackList.push(<button className={classes} key={i} onClick={this.addNutritionistFeedback.bind(this, i)}>{feedbackQuestions[i].tag}</button>);
    }
    return (
      <div className="row">
        <div className="col-md-12 feedback-buttons">
          {FeedbackList}
        </div>
      </div>
    )
  }
});

module.exports = Feedback;
