import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease } from '../components/Counter';

const CounterContainer = ({ number, increase, decrease }) => {
  return (
    <Counter number={number} onIncrease={increase} onDecrease={decrease} />
  );
};
export default connect(
  state=>({
    number:state.Counter.number,
  }),
  dispatch=>({
    increase:()=>dispatch(increase()),
    decrease:()=>dispatch(decrease()),
  }),
)(CounterContainer);