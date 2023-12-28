import React from 'react'

export default function Courses(props) {
  return (
    <>
        <td>{props.cart}</td>
         <td>{props.amount}</td>
         
   <td><button onClick={() => props.editView(props._id)}>Edit</button></td>
   
   <td><button onClick={() => props.deleteTheTransaction(props._id)}>Delete</button></td>

    </>
  )
}
