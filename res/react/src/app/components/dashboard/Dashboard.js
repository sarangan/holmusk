'use strict';

var Header = require('../common/Header');
var MealCard = require('./MealCard');

var MealServices = require('../../services/MealServices');

var InfiniteScroll = require('react-infinite-scroll')(React);

var Dashboard = React.createClass({
  displayName: 'Dashboard',
  mixins: [ReactRouter.Navigation, FluxMixin, StoreWatchMixin("MealStore")],
  statics: {
    willTransitionTo: function(transition, state) {
      if (!sessionStorage.getItem('isLoggedIn')) {
        return transition.redirect('/login');
      }
    }
  },
  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
      meals: flux.stores.MealStore.getMeals(),
      hasMore: flux.stores.MealStore.getHasMore(),
      pageNum: flux.stores.MealStore.getPageNum(),
      mode: flux.stores.MealStore.getMode()
    };
  },
  toggleMode: function(mode, e) {
    e.preventDefault();
    e.stopPropagation();
    var flux = this.getFlux();
    flux.actions.MealActions.setMode(mode);
  },
  loadMore: function() {
    console.log("LOAD MORE");
    var flux = this.getFlux();
    var mode = this.state.mode;
    MealServices.getMeals({
      pageNum: this.state.pageNum[mode],
      mode: mode
    }).then(function(response) {
      console.log("response", response);
      if (response.success) {
        var newMeals = response.data;
        console.log("newMeals:", newMeals);
        flux.actions.MealActions.addMeals({
          mode: mode,
          meals: newMeals
        });
      }
    }.bind(this)).catch(function(err) {
      console.log("error: getMeals", err);
    }.bind(this));
  },
  render: function() {
    //  pending or scored mode
    var mode = this.state.mode;
    var pendingClassName = null;
    var scoredClassName = null;
    var feedbackClassName = null;
    var notFoodClassName = null;
    if (mode == 'pending') {
      pendingClassName = 'active';
    } else if (mode == 'scored') {
      scoredClassName = 'active';
    } else if (mode == 'feedback') {
      feedbackClassName = 'active';
    } else if (mode == 'not-food') {
      notFoodClassName = 'active';
    }

    //  generate meal list
    console.log("meals:", this.state.meals);
    var MealList = [];
    var meals = this.state.meals[mode];
    var hasMore = this.state.hasMore[mode];
    if (meals != null) {
      for (var i = 0; i < meals.length; i++) {
        var meal = meals[i];
        MealList.push(
          <MealCard meal={meal} showPast={false} key={i} />
        );
      }
    }
    return (
      <div>
        <Header mode="signedin"/>
        <div id="dashboard" className="container-fluid">
          <div className="row">
            <ul className="col-xs-12 dashboard-nav nav nav-tabs">
              <li role="presentation" className={pendingClassName} onClick={this.toggleMode.bind(this, 'pending')}><a href='#/dashboard'>Pending</a></li>
              <li role="presentation" className={scoredClassName} onClick={this.toggleMode.bind(this, 'scored')}><a href='#/dashboard'>Scored</a></li>
              <li role="presentation" className={feedbackClassName} onClick={this.toggleMode.bind(this, 'feedback')}><a href='#/dashboard'>Feedback</a></li>
              <li role="presentation" className={notFoodClassName} onClick={this.toggleMode.bind(this, 'not-food')}><a href='#/dashboard'>Not Food</a></li>
            </ul>
          </div>
          {this.state.mode == 'scored' ?
          <div className="container-fluid">
          </div>
          : null}
          <div className="row food-item-wrapper">
            <InfiniteScroll loader={<div className="loader">Loading ...</div>} loadMore={this.loadMore} hasMore={hasMore}>
              {MealList}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Dashboard;
