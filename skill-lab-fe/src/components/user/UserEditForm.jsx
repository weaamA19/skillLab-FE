import React, { useState } from 'react'

export default function UserEditForm(props) {
  const [currentUser, setCurrentUser] = useState(props.user);
  // const [image, setImage] = useState("");
  console.log(props);

  const handleChange = (e) => {
    const user = {...currentUser}
    user[e.target.name] = e.target.value;
    console.log(user);
    setCurrentUser(user);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.updateUser(currentUser);
    e.target.reset();
  }

  return (
    <div className='w-75 mx-auto'>
      <div>
        <h1>Edit Profile</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>First Name</label>
          <input type='text' value={currentUser.firstName} className="form-control" name='firstName' onChange={handleChange}></input>
        </div>

        <div className="mb-2">
          <label>Last Name</label>
          <input type='text' value={currentUser.lastName} className="form-control" name='lastName' onChange={handleChange}></input>
        </div>

        <div className="mb-2">
          <label>Username</label>
          <input type='text' value={currentUser.username} className="form-control" name='username' onChange={handleChange}></input>
        </div>

        <div className="mb-2">
          <label>Email Address</label>
          <input type='email' value={currentUser.emailAddress} className="form-control" name='emailAddress' onChange={handleChange}></input>
        </div>

        <div className="mb-4">
          <label>Password</label>
          <input type='password' value={currentUser.password} className="form-control" name='password' onChange={handleChange}></input>
        </div>

        <div className='d-flex justify-content-center mb-5'>
          <input type='submit' className="btn btn-dark" value="Update Profile"/>
        </div>
      </form>
    </div>
  )
}
