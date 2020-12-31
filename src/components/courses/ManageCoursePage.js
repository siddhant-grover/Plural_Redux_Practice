import React,{useEffect,useState} from "react"; 
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import {newCourse} from "../../../tools/mockData"

        
function ManageCoursePage ({ courses, authors, loadAuthors, loadCourses, saveCourse ,history, ...props}) {

    const[course,setCourse] = useState({...props.course});//our form will need state to hold the form field values before they are saved 
    const[errors,setErrors] = useState({});

    useEffect(()=>{ 
       
        if (courses.length === 0) {
            loadCourses().catch(error =>{ 
            alert("loading courses failed"+ error);
            })
          }
        else{
            setCourse({ ...props.course });//this will copy the course passed in on props to state anytime  a new course is passed in 
        }
          if (authors.length === 0) {
             loadAuthors().catch(error =>{ 
              alert("loading authors failed"+ error);
              })
          }
    }, [props.course] );//useEffect accepts a function that it will call , 2nd arg is [] array of items for it to watch 
    //[props.course] we want useEffect ot run anytime when a new course is passed in on props
//when props change we need to update our component's state
//before , state was only passing once to CourseForm at the beginning before useEffect

    function handleChange(event) {//a simgle change handler for all form fields , each input has a name corresponding to property it displays 
        // no 2 way binding in react so we need to define a change handler to make the fields typable 

        const { name, value} = event.target;//destructuring of target field as it has two properties named as 'name' and 'value'

        setCourse(prevCourse => ({
          ...prevCourse,//accesing the prev local state
         [name]: name === "authorId" ? parseInt(value, 10) : value/*we are using js computed property syntax , ita allows us to referance a property via a variable*/ 
        }));
      }
      //event returns numbers as strings , so we use parseInt to convert to integer

      function handleSave(event){// saveCourse already dispatched in mapStateToprops
          event.preventDefault();
          saveCourse(course).then(()=>{
              history.push('/courses')//after save use react routers history to change the url 
          })
      }
    return ( 
        
    <CourseForm course={course} errors={errors} authors={authors} onChange={handleChange} onSave={handleSave}/>
    )

}
ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors:PropTypes.array.isRequired,
  loadAuthors:PropTypes.func.isRequired,
  loadCourses:PropTypes.func.isRequired,
  saveCourse:PropTypes.func.isRequired,
  history:PropTypes.object.isRequired
};

export function getCourseBySlug(courses, slug) {//fucn like these are called selectors as the collect data from redux store
    return courses.find(course => course.slug === slug) || null;//get the course requested 
  }
  
function mapStateToProps(state,ownProps) {//mapStateToProps run each time redux store state changes 
    const slug = ownProps.match.params.slug//refer app.js , to see route of this component 
    const course = slug && state.courses.length>0
    ? getCourseBySlug(state.courses,slug) : newCourse;// agar url slug hai to call func otherwise , course= newCourse (jo moackData.js se ara hai)
  return {
    course:course,
    courses:state.courses,
    authors: state.authors 
  }
}
const mapDispatchToProps = {//object way
      loadCourses,
      loadAuthors,
      saveCourse
  
  };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
