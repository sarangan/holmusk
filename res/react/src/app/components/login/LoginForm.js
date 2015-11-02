'use strict';

var AuthServices = require('../../services/AuthServices');

var LoginForm = React.createClass({
  displayName: 'LoginForm',
  mixins: [ReactRouter.Navigation, React.addons.LinkedStateMixin, FluxMixin],
  getInitialState: function() {
    return {
      email: '',
      password: ''
    }
  },
  handleLogin: function(e) {
    e.preventDefault();
    e.stopPropagation();
    var flux = this.getFlux();
    AuthServices.login({
      email: this.state.email,
      password: this.state.password
    }).then(function(response) {
      console.log("AuthServices login response:", response);
      if (response.success) {
        console.log(response.data.roles);
        var roles = response.data.roles;
        var isNutritionist = false;
        for (var i = 0; i < roles.length; i++) {
          if (roles[i] == "nutritionist") {
            isNutritionist = true;
          }
        }
        if (isNutritionist) {
          flux.actions.LoginActions.loginUser({
            userMetaData: response.data
          });
          this.transitionTo('/dashboard');
        } else {
          this.props.addNotification('error', "Login error, not a nutritionist");
        }
      } else {
        this.props.addNotification('error', response.data.message);
      }
    }.bind(this)).catch(function(err) {
      console.log("AuthServices login error:", err);
      this.props.addNotification('error', err.responseJSON.message);
    }.bind(this));
  },
  render: function() {
    return (
      <div id="login-form" className="col-xs-12 col-md-offset-3 col-md-6">
        <form name="loginForm" onSubmit={this.handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input className="form-control" type="email" id="email" valueLink={this.linkState('email')} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input className="form-control" type="password" id="password" valueLink={this.linkState('password')} />
          </div>
          <Button type="submit">Login</Button>
        </form>
      </div>
    )
  }
});

module.exports = LoginForm;
