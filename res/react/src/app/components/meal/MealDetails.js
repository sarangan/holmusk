'use strict';

var Header = require('../common/Header');
var FoodListAndSearchContainer = require('../food/FoodListAndSearchContainer');
var RatingContainer = require('./RatingContainer');
var MealHistory = require('./MealHistory');
var Feedback = require('./Feedback');
var MealFeedback = require('./MealFeedback');

var MealServices = require('../../services/MealServices');
var MealDetailsServices = require('../../services/MealDetailsServices');
var MealDetailsConstants = require('../../constants/MealDetailsConstants');
var FoodServices = require('../../services/FoodServices');

var cx = React.addons.classSet;

var async = require('async');

var MealDetails = React.createClass({
  displayName: 'MealDetails',
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
    var userId = this.props.params.userId;
    var mealId = this.props.params.mealId;
    var flux = this.getFlux();
    flux.actions.MealDetailsActions.setMeal({
      meal: null
    });
    MealDetailsServices.getMealById({
      mealId: mealId
    }).then(function(response) {
      console.log("response:", response);
      if (response.success) {
        var meal = response.data;
        console.log("meal:", meal);
        flux.actions.MealDetailsActions.setMeal({
          meal: meal
        });
        var cnt = 0;
        async.waterfall([
          function(done) {
            var addedFoods = meal.data.review.tags;
            addedFoods.forEach(function(addedFood) {
              var foodId = addedFood.foodId;
              FoodServices.getFoodById({
                foodId: foodId
              }).then(function(response) {
                console.log("response:", response, addedFood);
                addedFood.details = response;
                cnt++;
                if (cnt == addedFoods.length) return done(null, addedFoods);
              }).catch(function(err) {
                return done(err);
              });
            });
          }
        ], function(err, addedFoods) {
          if (err) {
            console.log("err", err);
          } else {
            console.log("all foods", addedFoods);
            flux.actions.MealDetailsActions.updateAddedFoods(addedFoods);
          }
        });
        //  meal.data.review.tags = addedFoods;
      }
    }.bind(this)).catch(function(err) {
      console.log("error: getMealById", err);
    });
  },
  setRatingVisible: function(e) {
    this.setState({
      ratingVisible: true
    });
  },
  unsetRatingVisible: function(e) {
    this.setState({
      ratingVisible: false
    });
  },
  submitReview: function(e) {
    e.preventDefault();
    e.stopPropagation();
    try {
      var flux = this.getFlux();
      var meal = this.state.meal;
      var rating = this.state.rating;
      var highLowList = this.state.highLowList;
      var fruitServings = this.state.fruitServings;
      var vegServings = this.state.vegServings;
      var addedFoods = this.state.addedFoods;
      var initialState = meal.data.state;

      var feedbackQuestions = this.state.feedbackQuestions;
      var food = {
        id: meal.id
      };
      food.rating = rating;
      //  state is not-food
      var hasFeedback = false;
      for (var i = 0; i < feedbackQuestions.length; i++) {
        hasFeedback = hasFeedback || feedbackQuestions[i].isActive;
      }
      if (feedbackQuestions[0].isActive) {
        food.state = "not-food";
      } else if (hasFeedback) {
        food.state = "feedback";
      } else {
        if (rating) {
          food.state = "scored";
        } else food.state = "pending";
      }
      for (var i = 0; i < highLowList.length; i++) {
        var nutrient = highLowList[i];
        //if (meal.data.review[nutrient]) {
        food[nutrient] = meal.data.review[nutrient];
        //}
      }
      food.fruitServings = parseFloat(fruitServings);
      food.vegServings = parseFloat(vegServings);
      if (isNaN(food.fruitServings) || isNaN(food.vegServings)) {
        throw "Fruit servings or vegetable servings is not a number."
      }
      food.tags = addedFoods;
      food.tags.map(function(tag) {
        delete tag.details
        return tag;
      });
      console.log("submit", food);
      MealServices.submitReview({
        mealId: meal.id,
        food: food
      }).then(function(response) {
        console.log("meal submit review:", response);
        flux.actions.MealActions.updateMeal({
          initialState: initialState,
          meal: response.data
        });
        this.transitionTo('/dashboard');
      }.bind(this)).catch(function(err) {
        throw err;
      });
    } catch (err) {
      console.log("error", err);
    }
  },
  addFeedback: function(str, e) {
    e.preventDefault();
    e.stopPropagation();
  },
  render: function() {
    var meal = this.state.meal;
    var opts = {
      name: utils.getName(meal),
      patientName: utils.getPatientName(meal),
      photoUrl: utils.getPhotoUrl(meal),
      portion: utils.getPortion(meal),
      description: utils.getDescription(meal),
      rating: utils.getRating(meal),
      reviewer: meal == null || !meal.reviewer? 'N/A' : meal.reviewer,
      lastReviewed: meal == null || !meal.reviewer? 'N/A' : meal.lastReviewed
    };
    var SmallStars = [];
    for (var i = 1; i <= MealDetailsConstants.NUM_STARS; i++) {
      var classes = cx({
        'fa': true,
        'fa-star': true,
        'inactive-star': !(opts.rating >= i),
        'active-star': opts.rating >= i
      });
      SmallStars.push(<span className={classes} key={i}></span>);
    }
    return (
      <div>
        <Header mode="signedin"/>
        <div className="container-fluid detailed-view">
          <div className="row">
            <div className="col-xs-12 top-bar">
              <span>Patients &nbsp;&nbsp; > &nbsp;&nbsp; {opts.patientName}</span>
              <div className="pull-right">
                <Button type="submit" onClick={this.submitReview}>Submit</Button>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-5 big-food">
              <div className="row">
                <div className="col-xs-12 image col-sm-offset-2 col-sm-8 col-md-offset-0 col-md-12" onMouseOver={this.setRatingVisible} onMouseLeave={this.unsetRatingVisible}>
                  <img src={opts.photoUrl} />
                  <div className="rating-wrapper form-inline">
                    {this.state.ratingVisible ? <RatingContainer /> : null}
                  </div>
                </div>
              </div>
              <Feedback />
              <div className="row">
                <div className="col-xs-12 name">
                  <p>{opts.name}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-3 user-rating-type">
                  <p>Portion size</p>
                </div>
                <div className="col-xs-9">
                  <p>{opts.portion}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-3 user-rating-type">
                  <p>Description</p>
                </div>
                <div className="col-xs-9">
                  <p>{opts.description}</p>
                </div>
              </div>

              <div className="row">
                <div className="col-xs-3 user-rating-type">
                  <p>Rating</p>
                </div>
                <div className="col-xs-9">
                  {SmallStars}
                </div>
              </div>
              <div className="row">
                <div className="col-xs-3 user-rating-type">
                  <p>Last Reviewer</p>
                </div>
                <div className="col-xs-9">
                  <p>{opts.reviewer}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-3 user-rating-type">
                  <p>Last Reviewed</p>
                </div>
                <div className="col-xs-9">
                  <p>{opts.lastReviewed}</p>
                </div>
              </div>
            </div>

            <FoodListAndSearchContainer />
          </div>
          <hr className="horizontal-divider" />

          <MealHistory />
        </div>
      </div>
    )
  }
});

module.exports = MealDetails;
