import * as types from "../actions/actionTypes";
import initialState from "./initialState"

export default function authorReducer(state = initialState.authors, action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;//replace state with what we get from API 
    default:
      return state;
  }
}
//if this is a new reducer update the root reducer, single reducer is just a slice of store
//reducer retuns the updated state that is stored in store , so now updated state of this slice of store is the value returned by action.authors