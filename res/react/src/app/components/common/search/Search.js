'use strict';

var SearchBar = require('./SearchBar');
var SearchResult = require('./SearchResult');
var FoodNutrientDetails = require('../../views/FoodNutrientDetails');

var cx = React.addons.classSet;

var Search = React.createClass({
  displayName: 'Search',
  mixins: [FluxMixin, StoreWatchMixin("SearchStore")],
  getInitialState: function() {
    return {
      view: {
        'food': <FoodNutrientDetails {...this.props} />,
      }
    }
  },
  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
      searchResults: flux.stores.SearchStore.getSearchResults(),
      hoverResultIndex: flux.stores.SearchStore.getHoverResultIndex(),
      selectedObject: flux.stores.SearchStore.getSelectedObject()
    }
  },
  setHoverResultIndex: function(hoverResultIndex, e) {
    e.preventDefault();
    e.stopPropagation();
    var flux = this.getFlux();
    flux.actions.SearchActions.setHoverResultIndex(hoverResultIndex);
  },
  setSelectedObject: function(selectedIndex, e) {
    e.preventDefault();
    e.stopPropagation();
    var flux = this.getFlux();
    var searchResults = this.state.searchResults;
    flux.actions.SearchActions.setSelectedObject(searchResults[selectedIndex]);
  },
  render: function() {
    var SearchResultsList = [];
    var searchResults = this.state.searchResults;
    var selectedObject = this.state.selectedObject;
    if (searchResults != null && selectedObject == null) {
      for (var i = 0; i < searchResults.length; i++) {
        var classes = cx({
          'food-result': true,
          'looking-up': true,
          'active': i == this.state.hoverResultIndex
        });
        SearchResultsList.push(
          <div key={i}>
            <a className={classes} onMouseOver={this.setHoverResultIndex.bind(this, i)} onClick={this.setSelectedObject.bind(this, i)}>
              {searchResults[i].name}
            </a>
          </div>
        );
      }
    }
    return (
      <div id="search">
        <SearchBar />
        <SearchResult />
        {this.state.selectedObject ? this.state.view[this.props.view] : null}
      </div>
    )
  }
});

module.exports = Search;
