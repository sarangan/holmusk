'use strict';

var FeedbackConstants = require('../constants/FeedbackConstants');

var FeedbackStore = Fluxxor.createStore({
  displayName: 'FeedbackStore',

  initialize: function(options) {
    this._feedbackQuestions = options._feedbackQuestions || [];
    this.bindActions(
      FeedbackConstants.SET_FEEDBACK_QUESTIONS, this.setFeedbackQuestions,
      FeedbackConstants.GET_FEEDBACK_QUESTIONS, this.getFeedbackQuestions
    );
  },
  setFeedbackQuestions: function(payload) {
    this._feedbackQuestions = payload._feedbackQuestions;
    this.emit("change");
  },
  getFeedbackQuestions: function() {
    return this._feedbackQuestions;
  }
});

module.exports = FeedbackStore;
