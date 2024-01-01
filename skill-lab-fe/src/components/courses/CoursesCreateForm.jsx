import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import Axios from 'axios'
import Category from '../category/Category';
export default function CoursesCreateForm(props) {

    const [newCourse, setNewCourse] = useState({})

//doing this step to get data 
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      fetchCategories();
    }, []);
  
    // const fetchCategories = async () => {
    //   try {
    //     const response = await Axios.get("category/index")
    //     .then((res) => {
    //         console.log(res.data.categories)
    //         setCategories(res.data.categories);
    //     })
    //     .catch(err => {
    //         console.log("error")
    //         console.log(err)
    //     })
       
    //   } 
    //   catch (err) {
    //     console.error('Error fetching categories:', err);
    //   }
    // };

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
   <h1>Create Course</h1>

<form onSubmit={handleSubmit} >
<div>
<label>Category</label>
<select name="category_id" onChange={handleChange} className="form-control">
  {categories.map((category) => (
    <option key={category._id} value={category._id}>{category.name}</option>
  ))}
</select>



</div>

<div>
<label>Title</label>
<input type='text' name='title' onChange={handleChange} className='form-control'></input>
</div>

<div>
    <label>Duration</label>
    <input type='string' name='duration' onChange={handleChange} className='form-control'></input>
</div>


<div>
    <label>Description</label>
    <input type='text' name='description' onChange={handleChange} className='form-control'></input>
</div>

<div>
    <label>Price</label>
    <input type='string' name='price' onChange={handleChange} className='form-control'></input>
</div>

    <div>
        <input type='submit' value="Add Course" className='btn btn-primary'></input>
    </div>
    </form>
</div>
  )
}
