import "./App.css";
import { Component } from "react";
import React from "react";
// import MyComponent from './MyComponent';
import ScrollBox from "./ScrollBox";

class App extends Component {
  render() {
    return (
      <div>
        <ScrollBox ref={(ref)=>this.scrollBox=ref}/>
        <button onClick={()=>this.scrollBox.scrollToBottom()}>
          맨 밑으로
        </button>
      </div>)
  }
}
// const App = () => <MyComponent/>
//위와 아래는 같은 의미를 나타냄.
export default App;
