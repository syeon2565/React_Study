import React, { Component } from "react";
import "./ValidationSample.css";

class RefSample extends Component {
  input = React.createRef();
  hanleFocus = () =>{
    this.input.current.focus();
  }
  render() {
    return (
      <div>
        <input ref={this.input}/>
      </div>
    )
  }
}
export default RefSample;
