'use strict';

var Promise = require('bluebird');
var _ = require('lodash');

var AJAXConstants = require('../constants/AJAXConstants');
var FeedbackConstants = require('../constants/FeedbackConstants');

var FeedbackServices = {
	getFeedbackQuestions: function(opts) {
		console.log("Get Feedbacks");
    console.log("   opts", opts);
    var options = {
      type: "GET",
      url: FeedbackConstants.GET_FEEDBACK_QUESTIONS_URL,
      contentType: "application/json",
      dataType: "json"
    };
    options = _.merge({}, options, AJAXConstants.defaultOptions);
    return Promise.resolve(
      $.ajax(options)
    );
	}
}

module.exports = FeedbackServices;
