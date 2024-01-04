import React from 'react'

export default function Category(props) {
  return (
    <>
          <td>{props.name}</td>
          <td><button onClick={()=> props.editView(props._id)} className='btn btn-link'>
          <i class="bi bi-pencil-fill"></i>
            </button></td>


          <td><button onClick={()=> props.deleteCategory(props._id)} className='btn btn-link'>
          <i className="bi bi-trash"></i>
            </button></td>
       
    </>
  )
}
