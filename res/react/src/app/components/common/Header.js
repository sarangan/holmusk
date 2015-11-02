'use strict';

var MenuBar = require('./MenuBar');

var Header = React.createClass({
  displayName: 'Header',
  render: function() {
    return (
      <nav className="navbar">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" dataToggle="collapse" dataTarget="#navbar" ariaExpanded="false" ariaControls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#/">
              <img id="nav-logo" alt="Brand" src={"./static/img/logo.png"} />
            </a>
          </div>
          { this.props.mode !== "login" ? <MenuBar /> : null }
        </div>
      </nav>
    );
  }
});

module.exports = Header;