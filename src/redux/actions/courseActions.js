import * as types from "./actionTypes";
import * as courseApi  from "../../api/courseApi";
  
export function loadCoursesSuccess(courses){
  return {type:types.LOAD_COURSES_SUCCESS, courses}
}

export function createCourseSuccess(course) {//action creator
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}


export function  loadCourses(){//first thunk 
return function (dispatch){
  return courseApi.getCourses().then(courses=>{//api call gives us list of courses 
    dispatch(loadCoursesSuccess(courses));//dispatch an action 
  }).catch(error=>{
    throw error;
  })
}
}


export function saveCourse(course) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {//getState let us access the redux store data
    return courseApi
      .saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))//if there is an id we need to update 
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch(error => {
        throw error;
      });
  };
}

