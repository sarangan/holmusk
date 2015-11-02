'use strict';

var ToolsMenu = require('./ToolsMenu');

var SideBar = React.createClass({
  displayName: 'SideBar',
  mixins: [FluxMixin],
  statics: {
    willTransitionTo: function(transition, state) {
      if (!sessionStorage.getItem('isLoggedIn')) {
        return transition.redirect('/login');
      }
    }
  },
  getStateFromFlux: function() {
    return {

    }
  },
  render: function() {
    return (
      <div id="tools-menu">
        <div id="tools-main-menu">
          <ToolsMenu {...this.props} changeState={this.props.changeState} state={this.props.state}/>
        </div>
      </div>
    );
  }
});

module.exports = SideBar;
