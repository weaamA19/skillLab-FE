import React, { useEffect } from 'react'
import { useState } from 'react'
import Axios from 'axios'

export default function CoursesEditForm(props) {

    const [editCourse, setEditCourse] = useState(props.courses)
    const [categories, setCategories] = useState([]);

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
console.log(categories)

    const handleChange = (event) => {
    const attributeToChange = event.target.name
    const newValue = event.target.value
    
    const updatedcourse = {...editCourse}
    updatedcourse[attributeToChange] = newValue
    console.log(updatedcourse)
    setEditCourse(updatedcourse)
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        props.updateTheview(editCourse)
        event.target.reset()
    }
    




  return (
    <div>

<h2 className='text-center'>Edit Course</h2>

<form onSubmit={handleSubmit} >

  <>
  <div className='row d-flex justify-content-center align-items-center'>
<div className='col-md-6'>
<label>Category</label>
<select name="category_id" onChange={handleChange} className="form-control">
  {categories.map((category) => (
    <option key={category._id} value={category._id}>{category.name}</option>
  ))}
</select>
</div>
</div>


<div className='row d-flex justify-content-center align-items-center'>
<div className='col-md-6'>
<label>Title</label>
<input type='text' name='title' value={editCourse.title} onChange={handleChange} className='form-control'></input>
</div>
</div>


<div className='row d-flex justify-content-center align-items-center'>
<div className='col-md-6'>
    <label>Duration</label>
    <input type='string' name='duration' value={editCourse.duration} onChange={handleChange} className='form-control'></input>
</div>
</div>


<div className='row d-flex justify-content-center align-items-center'>
<div className='col-md-6'>
    <label>Description</label>
    <input type='text' name='description' value={editCourse.description} onChange={handleChange} className='form-control'></input>
</div>
</div>


<div className='row d-flex justify-content-center align-items-center'>
<div  className='col-md-6'>
    <label>Price</label>
    <input type='number' name='price' value={editCourse.price}  onChange={handleChange} className='form-control'></input>
</div>
</div>

<br></br>

<div className='row d-flex justify-content-center align-items-center text-center'>
    <div  className='col-md-6'>
        <input type='submit' value="Edit Course" className='btn btn-secondary'></input>
    </div>
    </div>
<br></br>
    </>
    </form>
    </div>
  )
}
