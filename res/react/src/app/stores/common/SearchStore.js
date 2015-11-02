'use strict';

var SearchConstants = require('../../constants/common/SearchConstants');

var SearchStore = Fluxxor.createStore({
  displayName: 'SearchStore',

  initialize: function(options) {
    this._queryString = options._queryString || '';
    this._selectedObject = options._selectedObject || null;
    this._hoverResultIndex = options._hoverResultIndex || -1;
    this._searchResults = options._searchResults || [];
    this.bindActions(
      SearchConstants.RESET, this.reset,
      SearchConstants.SET_QUERY_STRING, this.setQueryString,
      SearchConstants.SET_SELECTED_OBJECT, this.setSelectedObject,
      SearchConstants.SET_SEARCH_RESULTS, this.setSearchResults,
      SearchConstants.SET_HOVER_RESULT_INDEX, this.setHoverResultIndex
    );
  },
  reset: function() {
    this._queryString = '';
    this._selectedObject = null;
    this.emit("change");
  },
  setQueryString: function(payload) {
    this._queryString = payload._queryString;
    this._selectedObject = null;
    this.emit("change");
  },
  setSelectedObject: function(payload) {
    this._selectedObject = payload._selectedObject;
    this.emit("change");
  },
  setSearchResults: function(payload) {
    var queryString = payload._queryString;
    var searchResults = payload._searchResults;
    if (this._queryString == queryString) {
      this._searchResults = searchResults;
    }
    this.emit("change");
  },
  setHoverResultIndex: function(payload) {
    this._hoverResultIndex = payload._hoverResultIndex;
    this.emit("change");
  },
  getQueryString: function() {
    return this._queryString;
  },
  getSelectedObject: function() {
    return this._selectedObject;
  },
  getSearchResults: function() {
    return this._searchResults;
  },
  getHoverResultIndex: function() {
    return this._hoverResultIndex;
  }
});

module.exports = SearchStore;
