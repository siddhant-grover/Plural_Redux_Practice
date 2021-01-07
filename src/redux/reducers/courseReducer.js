import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.CREATE_COURSE_SUCCESS:
      return [...state, { ...action.course }];
    case types.UPDATE_COURSE_SUCCESS:
      return state.map(course => { //map return a new array . i am replacing the elem with the matching course.id
       return course.id === action.course.id ? action.course : course
      }
      );
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;//replace state with what we get from API 

    case types.DELETE_COURSE_OPTIMISTIC:
      return state.filter(course => course.id !== action.course.id);//returns a new array of courses with 1 course ommited 
    default:
      return state;
  }
}
