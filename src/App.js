import React, { Component } from "react";

import "./App.css";

class App extends Component {
  state = {
    counter: 0,
    displayError: false
  };

  handleIncrementClick = () => {
    this.setState(prevState => ({
      counter: prevState.counter + 1,
      displayError: false
    }));
  };

  handleDecrementClick = () => {
    const { counter } = this.state;

    if (counter === 0) this.setState({ displayError: true });
    else
      this.setState(prevState => ({
        counter: prevState.counter - 1
      }));
  };

  render() {
    const { counter, displayError } = this.state;

    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">The currently counter is: {counter}</h1>
        <button
          data-test="increment-button"
          onClick={this.handleIncrementClick}
        >
          Increment Counter
        </button>

        <button
          data-test="decrement-button"
          onClick={this.handleDecrementClick}
        >
          Decrement Counter
        </button>

        {displayError && (
          <p data-test="error-display">Counter cannot be negative!</p>
        )}
      </div>
    );
  }
}

export default App;
