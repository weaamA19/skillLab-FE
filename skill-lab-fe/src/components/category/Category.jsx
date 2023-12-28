import React from 'react'

export default function Category(props) {
  return (
    <>
          <td>{props.name}</td>
          <td><button onClick={()=> props.editView(props._id)}>Edit</button></td>
          <td><button onClick={()=> props.deleteCategory(props._id)}>Delete</button></td>
        {/* <td>{...props}</td> */}
    </>
  )
}
