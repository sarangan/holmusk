'use strict';

var Top = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-xs-12 img-container">
          <img src={this.props.opts.photoUrl} />
        </div>
      </div>
    )
  }
});

var Middle = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-xs-12 name">
          {this.props.opts.name}
        </div>
      </div>
    )
  }
});

var Bottom = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-xs-12 info">
          <img src="./static/img/user.png"></img>
          <span className="pull-right">{this.props.opts.timeAgo}</span>
          {this.props.opts.patientName}
        </div>
      </div>
    )
  }
});

var TopPast = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <span className="rate-status pull-right">
            <span className="label label-success" show={this.props.opts.isRated}>Scored</span>
            <span className="label label-danger" show={this.props.opts.isRated}>Pending</span>
          </span>
          <p className="time">{this.props.opts.timeEaten}</p>
        </div>
      </div>
    )
  }
});

var MiddlePast = React.createClass({
  render: function() {
    return (
      <div class="row">
        <div class="col-xs-12 img-container">
          <img src={this.props.opts.photoUrl} />
        </div>
      </div>
    )
  }
});

var BottomPast = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-xs-12 name">
          <span className="info pull-right">{this.props.opts.timeAgo}</span>
          {this.props.opts.name}
        </div>
      </div>
    )
  }
});

var MealCard = React.createClass({
  displayName: 'MealCard',
  render: function() {
    var meal = this.props.meal;
    var mealUrl = "#/patients/" + meal.userId + "/" + meal.id;
    var opts = {
      name: utils.getName(meal),
      patientName: utils.getPatientName(meal),
      photoUrl: utils.getPhotoUrl(meal),
      timeAgo: utils.getTimeAgo(meal),
      timeEaten: utils.getTimeEaten(meal),
      isRated: utils.getIsReviewed(meal)
    };
    return (
      <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6 food-item">
        <a href={mealUrl}>
          { this.props.showPast ? <TopPast opts={opts} /> : <Top opts={opts} /> }
          { this.props.showPast ? <MiddlePast opts={opts} /> : <Middle opts={opts} /> }
          { this.props.showPast ? <BottomPast opts={opts} /> : <Bottom opts={opts} /> }
        </a>
      </div>
    )
  }
});

module.exports = MealCard;
