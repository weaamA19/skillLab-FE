import React, { useState } from 'react'

export default function UserEditForm(props) {
  const [currentUser, setCurrentUser] = useState({ ...props.user }); 
  // const [image, setImage] = useState("");
  console.log(props);


  const handleChange = (event) => {
    const user = {...currentUser}
    user[event.target.name] = event.target.value;
    console.log(user);
    setCurrentUser(user);
  }

  const handleAvatarChange = (event) => {
    setCurrentUser({ ...currentUser, avatar: event.target.files[0] });
  }


  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append('user', JSON.stringify(currentUser))
    data.append('avatar', currentUser.avatar);
    props.updateUser(data);
    event.target.reset();
  }

  return (
    <div className='w-75 mx-auto'>
      <div>
        <h1>Edit Profile</h1>
      </div>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
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

        <div className='mb-4'>
          <label>Profile Image</label>
          <input type='file' className="form-control" onChange={handleAvatarChange} /> {/*value={currentUser.avatar} */}
        </div>

        <div className='d-flex justify-content-center mb-5'>
          <input type='submit' className="btn btn-dark" value="Update Profile"/>
        </div>
      </form>
    </div>
  )
}
