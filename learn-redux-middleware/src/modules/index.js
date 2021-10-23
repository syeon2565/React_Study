import { combineReducers } from "redux";
import counter, {counterSaga} from "./counter";
import sample, {sampleSaga} from "./sample";
import loading from "./loading";
import { all } from "@redux-saga/core/effects";

const rootReducer = combineReducers({
  counter,
  sample,
  loading
});

export function* rootSaga(){
  yield all([counterSaga(), sampleSaga()]);
}
export default rootReducer;
