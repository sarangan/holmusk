'use strict';

var cx = React.addons.classSet;

var SearchResult = React.createClass({
  displayName: 'SearchResult',
  mixins: [FluxMixin, StoreWatchMixin("SearchStore")],
  getInitialState: function() {
    return {
      showSelectedResult: true,
      numPortions: 1
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
      <div id="food-results" className="food-result-wrapper">
        {SearchResultsList}
      </div>
    )
  }
});

module.exports = SearchResult;
