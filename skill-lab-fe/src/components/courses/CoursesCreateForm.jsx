import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import Axios from 'axios'
export default function CoursesCreateForm(props) {

    const [newCourse, setNewCourse] = useState({})

//doing this step to get data 
    const [categories, setCategories] = useState([]);
///debugging purposes
    console.log(categories)
    useEffect(() => {
      fetchCategories();
    }, []);
  

    const fetchCategories = () =>{
    
    Axios.get('category/index')
    .then((res) => {
        console.log(res.data.categories)
        setCategories(res.data.categories)
    })
    .catch((err) => {
        console.log("err")
        console.log(err)
    })

    }


    const handleChange = (event) => {
    const attributeToChange = event.target.name
    const newValue = event.target.value
    
    const course = {...newCourse}
    course[attributeToChange] = newValue
    console.log(course)
    setNewCourse(course)
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        props.addCourses(newCourse)
        event.target.reset()
    }
    

  return (
    <div>
   <h2 className='text-center'>Create Course</h2>

<form onSubmit={handleSubmit} >

<>
<div  className='row d-flex justify-content-center align-items-center'>
  <div className='col-md-6'>
<label>Category</label>
<select name="category_id" onChange={handleChange} className="form-control">
  {categories.map((category) => (
    <option key={category._id} value={category._id}>{category.name}</option>  
  ))}  
</select>
</div>

</div >

<div className='row d-flex justify-content-center align-items-center'>
<div className='col-md-6'>
<label>Title</label>
<input type='text' name='title' onChange={handleChange} className='form-control'></input>
</div>
</div>


<div className='row d-flex justify-content-center align-items-center'>
<div  className='col-md-6'>
    <label>Duration</label>
    <input type='string' name='duration' onChange={handleChange} className='form-control'></input>
</div>
</div>


<div className='row d-flex justify-content-center align-items-center'>
<div  className='col-md-6'>
    <label>Description</label>
    <input type='text' name='description' onChange={handleChange} className='form-control'></input>
</div>
</div>


<div  className='row d-flex justify-content-center align-items-center'>
<div  className='col-md-6'>
    <label>Price</label>
    <input type='string' name='price' onChange={handleChange} className='form-control'></input>
</div>
</div>

<br></br>

   <div  className='row d-flex justify-content-center align-items-center text-center' >
    <div  className='col-md-6'>
        <input type='submit' value="Add Course" className='btn btn-secondary '></input>
    </div>
    </div>
    </>
    <br></br>
    </form>

</div>
  )
}
