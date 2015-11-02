'use strict';

var SearchConstants = require('../../constants/common/SearchConstants');

var SearchActions = {
  reset: function() {
    this.dispatch(SearchConstants.RESET);
  },
  setQueryString: function(queryString) {
    this.dispatch(SearchConstants.SET_QUERY_STRING, {
      _queryString: queryString
    });
  },
  setSelectedObject: function(selectedObject) {
    this.dispatch(SearchConstants.SET_SELECTED_OBJECT, {
      _selectedObject: selectedObject
    });
  },
  setSearchResults: function(queryString, searchResults) {
    this.dispatch(SearchConstants.SET_SEARCH_RESULTS, {
      _queryString: queryString,
      _searchResults: searchResults
    });
  },
  setHoverResultIndex: function(hoverResultIndex) {
    this.dispatch(SearchConstants.SET_HOVER_RESULT_INDEX, {
      _hoverResultIndex: hoverResultIndex
    });
  }
}

module.exports = SearchActions;
