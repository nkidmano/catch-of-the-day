import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import Fish from "./Fish";
import sampleFishes from "../sample-fishes";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  };

  componentDidMount() {
    const { params } = this.props.match;
    // 1. Reinstate our localstorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // 1. Take a copy of existing fishes state
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish to fishes varible by using Date.now()
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set new fishes object to state by using setState()
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of existing fishes state
    const fishes = { ...this.state.fishes };
    // 2. Update the state
    fishes[key] = updatedFish;
    // 3. Set that state
    this.setState({ fishes });
  };

  deleteFish = key => {
    // 1. Take a copy of exsisting fishes state
    const fishes = { ...this.state.fishes };
    // 2. Update the state
    fishes[key] = null;
    // 3. Set that state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    // 1. Take a copy of state
    const order = { ...this.state.order };
    // 2. Either add or update the order or update the number in out order
    order[key] = order[key] + 1 || 1;
    // 3. Call setStage to update our stage object
    this.setState({ order });
  };

  removeFromOrder = key => {
    // 1. Take a copy of state
    const order = { ...this.state.order };
    // 2. Remove that item from order
    delete order[key];
    // 3. Call setStage to update our stage object
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seadfood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          removeFromOrder={this.removeFromOrder}
          fishes={this.state.fishes}
          order={this.state.order}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
