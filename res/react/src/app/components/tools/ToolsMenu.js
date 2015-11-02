'use strict';

var cx = React.addons.classSet;

var ToolsMenu = React.createClass({
  displayName: 'ToolsMenu',
  getInitialState: function() {
    return {
      menu: [
        {
          firstLevel: {
            stateName: 'food',
            menuName: 'Food',
            isActive: false
          },
          secondLevel: [{
            stateName: 'scoreFood',
            menuName: 'Score Food'
          }]
        }
      ]
    }
  },
  componentDidMount: function() {
    $('.nav-second-level').hide();
    $(".first-dropdown").on("click", function(e) {
      e.preventDefault();
      $('.nav-second-level').hide();
      $(this).parent().siblings().removeClass('active')
      $(this).parent().toggleClass('active');
      if ($(this).parent().hasClass('active')) {
        $(this).next('.nav-second-level').show();
      }
    });
  },
  changeState: function(state, e) {
    e.preventDefault();
    var newMenu = this.state.menu;
    for (var i = 0; i < newMenu.length; i++) {
      if (newMenu[i].firstLevel.stateName == state) {
        newMenu[i].firstLevel.isActive = !newMenu[i].firstLevel.isActive;
      } else newMenu[i].firstLevel.isActive = newMenu[i].firstLevel.isActive;
    }
    this.setState({
      menu: newMenu
    });
    this.props.changeState(state);
  },
  render: function() {
    var Menu = [];
    var menu = this.state.menu;
    var state = this.props.state;
    for (var i = 0; i < menu.length; i++) {
      var SecondMenu = [];
      var isActive = menu[i].firstLevel.isActive;
      for (var j = 0; j < menu[i].secondLevel.length; j++) {
        var secondLevelCx = cx({
          'selected': state == menu[i].secondLevel[j].stateName,
          'not-selected': state != menu[i].secondLevel[j].stateName
        });
        isActive = isActive || (state == menu[i].secondLevel[j].stateName);
        SecondMenu.push(
          <li className={secondLevelCx} key={j}>
            <a id="second-dropdown" className="dropdown-toggle" onClick={this.changeState.bind(this, menu[i].secondLevel[j].stateName)}>
              <span className="tools-menu-text second-level">{menu[i].secondLevel[j].menuName}</span>
            </a>
          </li>
        );
      }
      var firstLevelCx = cx({
          'selected': state == menu[i].firstLevel.stateName,
          'not-selected': state != menu[i].firstLevel.stateName,
          'active': isActive
      });
      Menu.push(
        <li className={firstLevelCx} key={i}>
          <a className="dropdown-toggle first-dropdown" onClick={this.changeState.bind(this, menu[i].firstLevel.stateName)}>
            <span className="tools-menu-text">{menu[i].firstLevel.menuName}</span>
            <span className="fa arrow"></span>
          </a>
          <ul className="nav nav-second-level collapse">
            {SecondMenu}
          </ul>
        </li>
      );
    };
    return (
      <div id="tools-sidebar" className="sidebar right" dataSidebar="true" dataSidebarScroll="true" dataSidebarHover="true">
        <ul className="nav nav-list tools-main-container">
          {Menu}
        </ul>
      </div>
    )
  }
});

module.exports = ToolsMenu;
