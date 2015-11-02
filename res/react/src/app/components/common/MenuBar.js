'use strict';

var AuthServices = require('../../services/AuthServices');

var MenuBar = React.createClass({
  displayName: 'MenuBar',
  handleSignOut: function(e) {
    AuthServices.logout().then(function(response) {
      console.log("logout res", response);
    }).catch(function(err) {

    });
  },
  render: function() {
    return (
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav navbar-left">
          <li><a href="#/dashboard">DASHBOARD</a></li>
          <li><a href="#/patients">PATIENTS</a></li>
          <li><a href="#/tools">TOOLS</a></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><a href="#/login" onClick={this.handleSignOut}>Sign out</a></li>
        </ul>
      </div>
    )
  }
});

module.exports = MenuBar;
