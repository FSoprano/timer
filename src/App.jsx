import React, {Component} from 'react';
import './App.css';
import Timer from './Timer';

class App extends Component {
  state = {
    time: 0,
    show: true,
  };
  getClickHandler() {
      return () => {
        this.setState({ time: Math.floor(Math.random() * 10) });
      };
  }
  getToggleShowHandler() {
    return () => this.setState(state => ({ time:state.time, show: !state.show}));
    /* Wird state.show auf false gesetzt, wird auch die Komponenente entfernt. Und bei 
     einer entfernten Komponente kann man keinen state mehr aktualisieren. 
     Daher kommt es zu einer Fehlermeldung auf der Konsole, wenn componentWillUnmount 
     nicht verwendet wird.*/
  }
  
  render() {
    return (
      <div className="App">
        {this.state.show && <Timer time={this.state.time} />}
        <button onClick={ this.getClickHandler() }>Set</button>
        <button onClick={this.getToggleShowHandler()}>Toggle</button>
      </div>    
    );
  }
}
export default App;
