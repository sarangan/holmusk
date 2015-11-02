'use strict';

var GenericConstants = require('../constants/GenericConstants');

var API_URL = GenericConstants.API_URL;

var FeedbackConstants = {
  GET_FEEDBACK_QUESTIONS_URL: API_URL + 'feedback-questions',
  GET_FEEDBACK_QUESTIONS: 'GET_FEEDBACK_QUESTIONS',
  SET_FEEDBACK_QUESTIONS: 'SET_FEEDBACK_QUESTIONS'
}

module.exports = FeedbackConstants;
