import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList"
import { Redirect } from "react-router-dom";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false
  };
  componentDidMount(){

    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {//this ensures that we dont get data from API each nd everytime we load courses page 
    actions.loadCourses().catch(error =>{ // call to load our courses data 
    alert("loading courses failed"+ error);
    })//catch to catch errors might occur as loadCourses return a promise
  }

  if (authors.length === 0) {
     actions.loadAuthors().catch(error =>{ // call to load our author data when CoursesPage mounts
      alert("loading authors failed"+ error);
      })
  }
  }

  render() {
    return (
      <>
      {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-course"
          onClick={() => this.setState({ redirectToAddCoursePage: true })}
        >
          Add Course
        </button>
      <CourseList courses={this.props.courses}/>
   </>
    );
  }
}

CoursesPage.propTypes = {
  //dispatch:PropTypes.func.isRequired // automatically added to props if we remove mapDispatchToProps 
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  authors:PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0 // safety check , as course and author data are req seperatley and asyncrounsly , so we need to make sure we have the authr data when we use it in map
        ? []
        : state.courses.map(course => { //returns courses array with additional authorName property mapped acc to authorId
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.authorId).name
            };
          }),
    authors: state.authors 
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses:bindActionCreators(courseActions.loadCourses, dispatch),//bindActionCreators return an object mimicing an original obj but with each func wrapped in a call to dispatch 
      loadAuthors:bindActionCreators(authorActions.loadAuthors, dispatch)
    }
  };
}
/*object approach 
const mapDispatchToProps={
  createCourse:courseActions.createCourse
}
*/


export default connect(//connect returns a function , that function then calls our component 
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
