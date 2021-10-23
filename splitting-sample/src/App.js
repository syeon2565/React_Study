import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component{
  state = {
    SplitMe:null
  };

  handleQuick =async()=>{
    const loadedModule = await import('./SplitMe');
    this.setState({
      SplitMe:loadedModule.default
    });
  };
  render(){
    const {SplitMe} = this.state;
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={this.handleQuick}> Hello React!</p>
        {SplitMe && <SplitMe />}
      </header>
    </div>
  );
}
}

 
export default App;
