import React from 'react'

export default function User(props) {
  return (
    <>
       <td>
            <img src={"/uploads/"+props.avatar} alt="User Avatar" style={{ maxWidth: '100px' }} />
      </td>
      <td>{props.username}</td>
      <td>{props.firstName} {props.lastName}</td>
      <td>{props.emailAddress}</td>
      <td>{props.userType === "1" ? "Admin" : "Student"}</td>
      <td><button onClick={()=> props.editView(props._id)} className='btn btn-link'><i class="bi bi-pencil-fill"></i></button>
      </td>


      <td><button onClick={()=> props.deleteUser(props._id)} className='btn btn-link'><i className="bi bi-trash"></i></button>
      </td>
    </>
  )
}
