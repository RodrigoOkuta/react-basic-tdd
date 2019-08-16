import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    counter: 0
  };

  handleIncrementClick = () => {
    this.setState(prevState => ({ counter: prevState.counter + 1 }));
  };

  render() {
    const { counter } = this.state;

    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">The currently counter is: {counter}</h1>
        <button
          data-test="increment-button"
          onClick={this.handleIncrementClick}
        >
          Increment Counter
        </button>
      </div>
    );
  }
}

export default App;
