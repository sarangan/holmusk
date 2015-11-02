'use strict';

var Header = require('../common/Header');
var SideBar = require('./SideBar');

var MealServices = require('../../services/MealServices');
var Food = require('./food/Food');
var ScoreFood = require('./food/secondLevel/scoreFood/ScoreFood');

var InfiniteScroll = require('react-infinite-scroll')(React);

var cx = React.addons.classSet;

var Tools = React.createClass({
  displayName: 'Tools',
  mixins: [ReactRouter.Navigation, FluxMixin, StoreWatchMixin("MealStore")],
  statics: {
    willTransitionTo: function(transition, state) {
      if (!sessionStorage.getItem('isLoggedIn')) {
        return transition.redirect('/login');
      }
    }
  },
  getInitialState: function() {
    return {
      state: '',
      view: {
        'food': <Food {...this.props} />,
        'scoreFood': <ScoreFood {...this.props} />
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
  changeState: function(state) {
    this.setState({
      state: state
    });
  },
  render: function() {
    var view = ScoreFood;
    return (
      <div id="tools">
        <Header mode="signedin"/>
        <SideBar {...this.props} changeState={this.changeState} state={this.state.state}/>
        <div id="tools-main-content">
          <div id="tools-main-container">
            {this.state.view[this.state.state]}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Tools;
