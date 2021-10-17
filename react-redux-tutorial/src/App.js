import React from 'react';
import CounterContainer from './containers/CounterContainer';
import TodosContainer from './containers/TotosContainer';

const App = () => {
  return (
    <div>
      <CounterContainer/>
      <hr />
      <TodosContainer />
    </div>
  );
};
export default App;
