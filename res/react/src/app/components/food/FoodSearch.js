'use strict';

var FoodServices = require('../../services/FoodServices');

var InfiniteScroll = require('react-infinite-scroll')(React);
var cx = React.addons.classSet;

var FoodSearch = React.createClass({
  displayName: 'FoodSearch',
  mixins: [FluxMixin, StoreWatchMixin("FoodSearchStore", "MealDetailsStore")],
  getInitialState: function() {
    return {
      pageStart: 0,
      lastPage: 0
    }
  },
  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
      foodQuery: flux.stores.FoodSearchStore.getFoodQuery(),
      matchedFoods: flux.stores.FoodSearchStore.getMatchedFoods(),
      hasMore: flux.stores.FoodSearchStore.getHasMore(),
      hoverFoodIndex: flux.stores.FoodSearchStore.getHoverFoodIndex(),
      suggestedFoods: flux.stores.MealDetailsStore.getSuggestedFoods(),
      addedFoods: flux.stores.MealDetailsStore.getAddedFoods()
    }
  },
  openNutritionDetailsModal: function(index, type, e) {
    e.preventDefault();
    e.stopPropagation();
    var food = null;
    var numPortions = 1;
    var portionIndex = 0;
    if (type == "suggestion") {
      var suggestedFoods = this.state.suggestedFoods;
      FoodServices.getFoodById({
        foodId: suggestedFoods[index].foodId
      }).then(function(response) {
        food = response;
        console.log("suggested:", food);
        this.props.openNutritionDetailsModal(food, numPortions, portionIndex);
      }.bind(this)).catch(function(err) {
        console.log("err", err);
      });
    } else {
      food = this.state.matchedFoods[index];
      console.log("matched:", food);
      this.props.openNutritionDetailsModal(food, numPortions, portionIndex);
    }
  },
  openNewFoodModal: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.openNewFoodModal();
  },
/*  navigateResult: function(index, e) {
    console.log("navigate index:", index, e);
    e.preventDefault();
    e.stopPropagation();
    var resultContainer = $('#food-results');
    var resultItem = $('.food-result.looking-up');
    var itemHeight = resultItem.outerHeight();
    var itemMargin = (resultItem.outerHeight(true) - itemHeight) / 2;
    var containerHeight = resultContainer.height();
    switch (e.keyCode) {
      case 38:
        if (index - 1 >= 0) {
          this.updateHoverFoodIndex(index - 1, e);
          var maxScrollTop = (index - 1) * (itemHeight + itemMargin);
          if (resultContainer.scrollTop() > maxScrollTop) {
            resultContainer.scrollTop(maxScrollTop);
          }
        }
        break;
      case 40:
        if (index + 1 < matchedFoods.length) {
          this.updateHoverFoodIndex(index + 1, e);
          var minScrollTop = (index + 2) * (itemHeight + itemMargin) + itemMargin - containerHeight;
          if (resultContainer.scrollTop() < minScrollTop) {
            resultContainer.scrollTop(minScrollTop);
          }
        }
        break;
      case 13:
        this.openNutritionModal(index, e);
        break;
    }
  },*/
  handleSearch: function(e) {
    e.preventDefault();
    e.stopPropagation();
    var query = e.target.value;
    var flux = this.getFlux();
    flux.actions.FoodSearchActions.updateQuery(query);
    if (!query || query == '') {
      this.setState({
        lastPage: 0
      });
    }
    this.setState({
      pageStart: this.state.lastPage
    });
    FoodServices.searchFoods({
      query: query,
      pageNum: 0
    }).then(function(response) {
      console.log("response", response);
      flux.actions.FoodSearchActions.setFoods(query, response);
    }).catch(function(err) {
      console.log("err", err);
    });
  },
  updateHoverFoodIndex: function(index, e) {
    e.preventDefault();
    e.stopPropagation();
    var flux = this.getFlux();
    flux.actions.FoodSearchActions.updateHoverFoodIndex(index);
  },
  loadMore: function(lastPage) {
    var page = lastPage - this.state.pageStart;
    if (page <= 100) {
      this.state.lastPage = lastPage;
      var flux = this.getFlux();
      FoodServices.searchFoods({
        query: this.state.foodQuery,
        pageNum: page
      }).then(function(response) {
        console.log("responseLoad", page, response, this.state.hasMore, this.state.hoverFoodIndex);
        flux.actions.FoodSearchActions.addFoods(response);
        flux.actions.FoodSearchActions.updateHoverFoodIndex(this.state.hoverIndex + 18);
      }.bind(this)).catch(function(err) {
        console.log("err", err);
      });
    } else {
      this.setState({
        hasMore: false
      });
    }
  },
  render: function() {
    //  generate food list
    var addedFoods = this.state.addedFoods;
    var MatchedFoodList = [];
    var matchedFoods = this.state.matchedFoods;
    var hoverFoodIndex = this.state.hoverFoodIndex;
    if (matchedFoods != null) {
      for (var i = 0; i < matchedFoods.length; i++) {
        var matchedFood = matchedFoods[i];
        var classes = cx({
          'food-result': true,
          'looking-up': true,
          'active': i == this.state.hoverFoodIndex
        });
        //console.log("matchedFood:", matchedFood);
        if (utils.hasFood(addedFoods, matchedFood._id)) continue;
        MatchedFoodList.push(
          <div key={i}>
            <a className={classes} onMouseOver={this.updateHoverFoodIndex.bind(this, i)} onClick={this.openNutritionDetailsModal.bind(this, i, "matched")}>
              {matchedFood.name}
            </a>
          </div>
        );
      }
    }

    var FoodSuggestions = [];
    var suggestedFoods = this.state.suggestedFoods;
    var foodExist = "food-suggested-exist suggested";
    var foodNotExist = "food-suggested-not-exist suggested";
    for (var i = 0; i < suggestedFoods.length; i++) {
      var suggestedFood = suggestedFoods[i];
      //console.log("suggestedFood:", suggestedFood, addedFoods);
      if (suggestedFood.foodId && utils.hasFood(addedFoods, suggestedFood.foodId)) continue;
      FoodSuggestions.push(
        <a key={i} className={suggestedFood.foodId ? foodExist : foodNotExist} dataToggle="modal" onClick={suggestedFood.foodId ? this.openNutritionDetailsModal.bind(this, i, "suggestion") : null}>
          {suggestedFood.name}
        </a>);
    }
    return (
      <div>
        <div>
          <div>
            <p>Food Look up</p>
            <div className="input-group">
              <span className="input-group-addon">
                <span className="fa fa-search"></span>
              </span>
              <input type="text" className="form-control" placeholder="Search" onChange={this.handleSearch} />
              <span className="input-group-btn">
                {this.state.foodQuery ? <Button bsStyle="success" onClick={this.openNewFoodModal}>New food item</Button> : null}
              </span>
            </div>
          </div>
          <div id="food-results" className="food-result-wrapper">
            {this.state.foodQuery ? <InfiniteScroll loader={<div className="loader">Loading ...</div>} loadMore={this.loadMore} hasMore={this.state.hasMore} threshold={(this.state.hoverFoodIndex * 50 + 300)}>
              {MatchedFoodList}
            </InfiniteScroll> : null}
            {!this.state.foodQuery ? FoodSuggestions : null}
          </div>
        </div>
      </div>
    )
  }

});

module.exports = FoodSearch;

// ng-model="foodQuery" ng-change="search()" ng-keydown="navigateResults($event)"
/*
<span className="input-group-btn">
          {foodQuery ? <button className="btn btn-success" ng-click="showDbFoodCreation(foodQuery)">New food item</button> : null}
        </span>*/
