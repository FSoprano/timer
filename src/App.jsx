import React, {Component} from 'react';
import './App.css';
import Timer from './Timer';

class App extends Component {
  state = {
    time: 0,
  }
  getClickHandler() {
      return () => {
        this.setState({ time: Math.floor(Math.random() * 10) });
      };
  }
  
  render() {
    return (
      <div className="App">
        <Timer time={this.state.time} />
        <button onClick={ this.getClickHandler() }>Set</button>
      </div>    
    );
  }
}
export default App;
