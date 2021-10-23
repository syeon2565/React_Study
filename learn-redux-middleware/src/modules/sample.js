import { handleActions } from "redux-actions";
import * as api from "../lib/api";
import createRequestThunk from "../lib/createRequestThunk";

// 액션타입 선언 
const GET_POST = "sample/GET_POST";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";
const GET_POST_FAILURE = "sample/GET_POST_FAILURE";

const GET_USERS = "sample/GET_USERS";
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";
const GET_USERS_FAILURE = "sample/GET_USERS_FAILURE";

export const getPost = createRequestThunk(GET_POST, api.getPost);
export const getUsers = createRequestThunk(GET_USERS, api.getUsers);

// 초기 상태를 선언합니다.
// 요청의 로딩중 상태는 loading 이라는 객체에서 관리합니다.

const initialState = {
  post:null,
  users:null
};

const sample = handleActions(
  {
    [GET_POST_SUCCESS]:(state,action)=>({
      ...state,
      post:action.payload
    }),
    [GET_USERS_SUCCESS]:(state,action)=>({
      ...state,
      users:action.payload
    })
  },
  initialState
);

export default sample;