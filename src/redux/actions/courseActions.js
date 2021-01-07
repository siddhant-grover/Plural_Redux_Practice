import * as types from "./actionTypes";
import * as courseApi  from "../../api/courseApi";
import {beginApiCall,apiCallError} from "./apiStatusActions";
  
export function loadCoursesSuccess(courses){
  return {type:types.LOAD_COURSES_SUCCESS, courses}
}

export function createCourseSuccess(course) {//action creator
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function deleteCourseOptimistic(course) {
  return { type: types.DELETE_COURSE_OPTIMISTIC, course };
}

export function  loadCourses(){//first thunk 
return function (dispatch){
  dispatch(beginApiCall())
  return courseApi.getCourses().then(courses=>{//api call gives us list of courses 
    dispatch(loadCoursesSuccess(courses));//dispatch an action via action creator
  }).catch(error=>{
    dispatch(apiCallError(error));
    throw error;
  })
}
}


export function saveCourse(course) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {//getState let us access the redux store data
    dispatch(beginApiCall())
    return courseApi
      .saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))//if there is an id we need to update 
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;//The throw statement throws (generates) an error. When an error occurs, JavaScript will normally stop, and generate an error message
      });
  };
}

export function deleteCourse(course) {
  return function(dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteCourseOptimistic(course));//immediate dispatching not waiting for api call
    return courseApi.deleteCourse(course.id);//api call
  };
}



