import React from 'react'

export default function User(props) {
  return (
    <>
      <td></td>
      <td>{props.username}</td>
      <td>{props.emailAddress}</td>
      <td>{props.firstName} {props.lastName}</td>
      <td>
            <img src={"/uploads/"+props.avatar} alt="User Avatar" style={{ maxWidth: '100px' }} />
      </td>
      <td>{props.userType}</td>
    </>
  )
}
