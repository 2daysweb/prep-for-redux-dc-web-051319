import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './logo.svg';
import './App.css';
import {createStore} from 'redux'



let initialState = {
  count:0
}

let reducer = (oldState = initialState, action) => {
  console.log("OldState", oldState, "Action", action)
  switch (action.type) {
    case "INCREMENT":
      return { count: oldState.count + action.payload};
    case "DECREMENT":
      return {count: oldState.count - action.payload};
    default:
      return oldState
  }
};

let store = createStore(reducer)
console.log(store.getState())

class App extends Component {
  componentDidMount(){
    store.subscribe(() => this.forceUpdate())
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Counter />
      </div>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
    );
  }
}

class Counter extends Component {

  increment = (num) => {
    store.dispatch( { type: "INCREMENT", payload: num })
  };

  decrement = (num) => {
    store.dispatch ( { type: "DECREMENT", payload:num})
  };

  renderDescription = () => {
    const remainder = store.getState().count % 5;
    const upToNext = 5 - remainder;
    return `The current count is less than ${store.getState().count + upToNext}`;
  };

  render() {
    return (
      <div className="Counter">
        <h1>{store.getState().count}</h1>
        <button onClick={()=>this.decrement(1)}> - 1 </button>
        <button onClick={()=>this.increment(1)}> + 1</button>
        <h3>{store.getState().count}</h3>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
