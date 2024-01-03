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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input type='text' value={currentUser.firstName} className="form-control" name='firstName' onChange={handleChange}></input>
        </div>

        <div>
          <label>Last Name</label>
          <input type='text' value={currentUser.lastName} className="form-control" name='lastName' onChange={handleChange}></input>
        </div>

        <div>
          <label>Username</label>
          <input type='text' value={currentUser.username} className="form-control" name='username' onChange={handleChange}></input>
        </div>

        <div>
          <label>Email Address</label>
          <input type='email' value={currentUser.emailAddress} className="form-control" name='emailAddress' onChange={handleChange}></input>
        </div>

        <div>
          <label>Password</label>
          <input type='password' value={currentUser.password} className="form-control" name='password' onChange={handleChange}></input>
        </div>

        <div>
          <input type='submit' className="btn btn-primary" value="Update Profile"/>
        </div>
      </form>
    </div>
  )
}
