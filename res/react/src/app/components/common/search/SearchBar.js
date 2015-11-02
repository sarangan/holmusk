'use strict';

var SearchResult = require('./SearchResult');
var FoodServices = require('../../../services/FoodServices');

var SearchBar = React.createClass({
  displayName: 'SearchBar',
  mixins: [FluxMixin, StoreWatchMixin("SearchStore")],
  componentDidMount: function() {
    var flux = this.getFlux();
    flux.actions.SearchActions.reset();
  },
  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
      queryString: flux.stores.SearchStore.getQueryString(),
      selectedObject: flux.stores.SearchStore.getSelectedObject()
    }
  },
  setQueryString: function(e) {
    e.preventDefault();
    e.stopPropagation();
    var queryString = e.target.value;
    var flux = this.getFlux();
    flux.actions.SearchActions.setQueryString(queryString);
    FoodServices.searchFoods({
      query: queryString,
      pageNum: 0
    }).then(function(response) {
      console.log("response", response);
      flux.actions.SearchActions.setSearchResults(queryString, response);
    }).catch(function(err) {
      console.log("err", err);
    });
  },
  render: function() {
    return (
      <div id="search-bar" className="input-group">
        <span className="input-group-addon">
          <span className="fa fa-search"></span>
        </span>
        <input type="text" className="form-control" placeholder="Search" onChange={this.setQueryString}/>
      </div>
    )
  }
});

module.exports = SearchBar;
