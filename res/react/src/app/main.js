'use strict';

var React = require('react/addons');
var NotificationSystem = require('react-notification-system');
var ReactBoostrap = require('react-bootstrap');
var ReactRouter = require('react-router');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var utils = require('./utils/utils');

window.React = React;
window.NotificationSystem = NotificationSystem;
window.ReactRouter = ReactRouter;
window.Fluxxor = Fluxxor;
window.FluxMixin = FluxMixin;
window.StoreWatchMixin = StoreWatchMixin;
window.utils = utils;

window.Modal = ReactBoostrap.Modal;
window.Button = ReactBoostrap.Button;

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;

var Header = require('./components/common/Header');
var Login = require('./components/login/Login');
var Dashboard = require('./components/dashboard/Dashboard');
var Tools = require('./components/tools/Tools');
var MealDetails = require('./components/meal/MealDetails');

// stores
var LoginStore = require('./stores/LoginStore');
var MealStore = require('./stores/MealStore');
var MealDetailsStore = require('./stores/MealDetailsStore');
var FoodSearchStore = require('./stores/FoodSearchStore');
var NewFoodStore = require('./stores/NewFoodStore');
var FeedbackStore = require('./stores/FeedbackStore');

// common store
var SearchStore = require('./stores/common/SearchStore');


// actions
var LoginActions = require('./actions/LoginActions');
var MealActions = require('./actions/MealActions');
var MealDetailsActions = require('./actions/MealDetailsActions');
var FoodSearchActions = require('./actions/FoodSearchActions');
var NewFoodActions = require('./actions/NewFoodActions');
var FeedbackActions = require('./actions/FeedbackActions');

// common actions
var SearchActions = require('./actions/common/SearchActions');

var stores = {
  LoginStore: new LoginStore({
    _user: null
  }),
  MealStore: new MealStore({
    _meals: {
      'pending': [],
      'scored': [],
      'feedback': [],
      'not-food': []
    },
    _hasMore: {
      'pending': true,
      'scored': true,
      'feedback': true,
      'not-food': true
    },
    _pageNum: {
      'pending': 0,
      'scored': 0,
      'feedback': 0,
      'not-food': 0
    },
    _mode: 'pending'
  }),
  MealDetailsStore: new MealDetailsStore({
    _meal: null,
    _highLowList: ['carb', 'sugar', 'fat', 'protein', 'fibre', 'salt', 'portion']
  }),
  FoodSearchStore: new FoodSearchStore({
    _foodQuery: '',
    _matchedFoods: []
  }),
  NewFoodStore: new NewFoodStore({
    _name: '',
    _portions: []
  }),
  FeedbackStore: new FeedbackStore({
    _feedbackQuestions: []
  }),
  SearchStore: new SearchStore({
    _queryString: '',
    _selectedFood: null,
    _hoverResultIndex: -1,
    _searchResults: []
  })
};

var actions = {
  LoginActions: LoginActions,
  MealActions: MealActions,
  MealDetailsActions: MealDetailsActions,
  FoodSearchActions: FoodSearchActions,
  NewFoodActions: NewFoodActions,
  FeedbackActions: FeedbackActions,
  SearchActions: SearchActions
};

var flux = new Fluxxor.Flux(stores, actions);

var routes = (
  <Route handler={ReactRouter.RouteHandler}>
    <DefaultRoute handler={Dashboard} />
    <Route path="/login" handler={Login} />

    <Route path="/dashboard" handler={Dashboard} />
    <Route path="/patients/:userId/:mealId" handler={MealDetails} />
    <Route path="/tools" handler={Tools} />
  </Route>
);

$(document).ajaxError(function(event, jqxhr, settings, thrownError) {
  if (jqxhr.status == 401) {
    sessionStorage.removeItem('isLoggedIn');
    $(location).attr('href', "#/login");
  }
});

ReactRouter.run(routes, function(Handler) {
  React.render(<Handler flux={flux} />, document.getElementById('app'));
});
