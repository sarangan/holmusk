'use strict';

var Header = require('../common/Header');
var LoginForm = require('./LoginForm');

var Login = React.createClass({
  displayName: 'Login',
  mixins: [FluxMixin],
  addNotification: function(level, message) {
    this.refs.notificationSystem.addNotification({
      message: message,
      level: level,
      position: 'tc'
    });
  },
  render: function() {
    return (
      <div>
        <NotificationSystem ref="notificationSystem" />
        <Header mode="login"/>
        <div className="container">
          <div className="row">
            <LoginForm addNotification={this.addNotification} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Login;
