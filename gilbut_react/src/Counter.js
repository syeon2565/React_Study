import React from "react";
import { Component } from "react";

class Counter extends Component {
  state = {
    number: 0,
    fixednumber: 0,
  };
  render() {
    const { number, fixednumber } = this.state;
    return (
      <div>
        <h1>{number}</h1>
        <h2>바뀌지 않는 값 : {fixednumber}</h2>
        <button
          onClick={() => {
            this.setState(
              {
                number: number + 1,
              },
              () => {
                console.log("방금 setState호출");
                console.log(this.state);
              }
            );
          }}
        >
          +1
        </button>
      </div>
    );
  }
}

export default Counter;
