import { combineReducers } from 'redux';
import Counter from '../components/Counter';
import Todos from '../components/Todos';

const rootReducer = combineReducers({
  Counter,
  Todos,
});

export default rootReducer;
