import React from 'react'

export default function Courses(props) {
  return (
    <>
        <td>{props.category
}</td>
       {console.log(props)}
         <td>{props.title}</td>
         <td>{props.duration}</td>
         <td>{props.description}</td>
         <td>{props.price}</td>
         
   <td><button onClick={() => props.editView(props._id)}>Edit</button></td>
   <td><button onClick={() => props.deleteTheCourse(props._id)}>Delete</button></td>

    </>
  )
}
