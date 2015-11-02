'use strict';

var FeedbackConstants = require('../constants/FeedbackConstants');

var FeedbackActions = {
  setFeedbackQuestions: function(feedbackQuestions) {
    this.dispatch(FeedbackConstants.SET_FEEDBACK_QUESTIONS, {
      _feedbackQuestions: feedbackQuestions
    });
  }
}

module.exports = FeedbackActions;
