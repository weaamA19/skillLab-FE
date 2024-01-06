import React from 'react'

export default function User(props) {
  return (
    <>
      <td></td>
      <td>{props.username}</td>
      <td>{props.firstName} {props.lastName}</td>
      <td>{props.emailAddress}</td>
      <td>{props.userType === "1" ? "Admin" : "Student"}</td>
    </>
  )
}
