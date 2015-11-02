'use strict';

var NewFoodModal = React.createClass({
  displayName: 'NewFoodModal',
  mixins: [FluxMixin, StoreWatchMixin("MealDetailsStore", "NewFoodStore")],
  getInitialState: function() {
    return {
      showNewFoodModal: false
    }
  },
  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
      meal: flux.stores.MealDetailsStore.getMeal(),
      portions: flux.stores.NewFoodStore.getPortions()
    }
  },
  openNewFoodModal: function() {
    this.setState({
      showNewFoodModal: true
    });
  },
  closeNewFoodModal: function() {
    this.setState({
      showNewFoodModal: false
    });
  },
  addNewPortion: function(e) {
    e.preventDefault();
    e.stopPropagation();
  },
  updateNewFoodName: function(e) {
    e.preventDefault();
    e.stopPropagation();
    var name = e.target.value;
    var flux = this.getFlux();
    flux.actions.NewFoodActions.updateNewFoodName(name);
  },
  saveToDB: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.closeNewFoodModal();
    var flux = this.getFlux();
    //flux.actions.NewFoodActions.updateNewFoodName(name);
  },
  render: function() {
    var meal = this.state.meal;
    var opts = {
      photoUrl: utils.getPhotoUrl(meal)
    };
    return (
      <Modal show={this.state.showNewFoodModal} onHide={this.closeNewFoodModal} bsSize="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create a new food item</Modal.Title>
        </Modal.Header>
        <Modal.Body modalClassName="modal-body container-fluid">
          <div className="row">
            <div className="col-xs-4 big-food">
              <img src={opts.photoUrl} />
            </div>
            <div className="col-xs-8">
              <form>
                <div className="form-group">
                  <input className="form-control dbFood-name" type="text" placeholder="Food Name" onChange={this.updateNewFoodName} />
                </div>
              </form>
              <Button type="button" className="add-btn" onClick={this.addNewPortion}>
                <span className="fa fa-plus"></span> Add new portion
              </Button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" bsStyle="primary" onClick={this.saveToDB}>Save to database</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

module.exports = NewFoodModal;
