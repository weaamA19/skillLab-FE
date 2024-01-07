import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from 'axios'
import Courses from './Courses';
import CoursesCreateForm from './CoursesCreateForm';
import CoursesEditForm from './CoursesEditForm';


export default function CoursesList(props) {

  const [courses, setCourses] = useState([]);
  const [isEdit, setIsEdit] = useState(false)
  const [currentCourses, setCurrentCourses] = useState({})

  useEffect(() => {
    //call api
    loadCoursesList();
  }, []);

  const loadCoursesList = () => {
    Axios.get("/courses/index")
    .then((response) => {
      console.log(response);
      setCourses(response.data.courses);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const addCourses = (courses) => {
    Axios.post("/courses/add", courses)
    .then(res =>{
    console.log('Course has been Added') 
    loadCoursesList()
  })
   
    .catch(err => {

   console.log('Error cannot Add')
  console.log(err) })

  }

  const editTheView = (id) => {
   Axios.get(`/courses/edit?id=${id}`)
   .then((res) => {
  console.log(res.data.courses) 
  console.log('Loaded the Information') 
 let courses = res.data.courses   
setIsEdit(true)
setCurrentCourses(courses) 
})
   .catch(err => {
    console.log('error')
    console.log(err)
   })

  }


  const updateTheview = (courses) => {
Axios.put("/courses/update", courses )

.then(res => {
  console.log('Course has been Updated')
  console.log(res)
  loadCoursesList()
  setIsEdit(false)
})

.catch(err => {
  console.log('Cannot Update')
  console.log(err)
})
  }


  const deleteCourse = (id) => {
Axios.delete(`/courses/delete?id=${id}`)
.then(res => {
  console.log('Course has been Deleted')
  console.log(res)
  loadCoursesList()
})

.catch(err => {
  console.log('cannot delete')
  console.log(err)
})
  }

const allTheCourses = courses.map((course , index) => (

  <tr key={index}>  
 
    <Courses {...course}  editView = {editTheView} deleteTheCourse={deleteCourse}/>
  </tr>

))




  return (
    <div>
      <h2 className='text-center mt-4'>Courses List</h2>
       <div  className='row d-flex justify-content-center align-items-center text-center table table-bordered mb-2'>
       <div className='col-md-7 '>
         <table className="table table-stripes table mt-4 table border-top">
          <thead>
            <tr>
              <th>Category</th>
              <th>Title</th>
              <th>Duration</th>
              <th>Description</th>
              <th>Price</th>
             <th>Edit</th>
             <th>Delete</th>
            </tr>   
          </thead>
          <tbody>{allTheCourses}</tbody>
        </table>
        </div>
    </div>
    {(!isEdit) ? 
      <CoursesCreateForm addCourses={addCourses}></CoursesCreateForm>
      :
      <CoursesEditForm key={currentCourses._id} courses={currentCourses} updateTheview={updateTheview}></CoursesEditForm>
}
    </div>
  )
}
