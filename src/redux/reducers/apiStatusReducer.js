import * as types from "../actions/actionTypes";
import initialState from "./initialState";

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

export default function apiCallStatusReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  if (action.type == types.BEGIN_API_CALL) {
    return state + 1;
  } else if (
     action.type===types.API_CALL_ERROR||
    actionTypeEndsInSuccess(action.type)//every reducer is called for a action , so if api calls are success so decrement the value
  ) {//so remember an action can be handeled by multiple reducers 
    return state - 1;
  }

  return state;
}
