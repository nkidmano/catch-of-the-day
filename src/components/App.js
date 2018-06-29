import React from "react";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  addFish = fish => {
    // 1. Take a copy of existing fishes state
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish to fishes varible by using Date.now()
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set new fishes object to state by using setState()
    this.setState({ fishes });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seadfood Market" />
        </div>
        <Order />
        <Inventory addFish={this.addFish} />
      </div>
    );
  }
}

export default App;
