import "./App.css";
import { Component } from "react";
import React from "react";
// import MyComponent from './MyComponent';
import IterationSample from "./IterationSample";

class App extends Component {
  render() {
    return (
      <div>
        <IterationSample/>
        
      </div>)
  }
}
// const App = () => <MyComponent/>
//위와 아래는 같은 의미를 나타냄.
export default App;
