import React, {useState} from 'react'
import { Link } from "react-router-dom";

export default function Signup(props) {
  const [newUser, setNewUser] = useState({});
  const [avatar, setAvatar] = useState(null);

    const handleChange = (e) => { 
        const user = { ...newUser }
        user[e.target.name] = e.target.value;
        console.log(user);
        setNewUser(user);
  }
  
  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
}
    const registerHandler = (e) => {
      e.preventDefault();
      const data = new FormData();
      data.append('user' , JSON.stringify(newUser))
      data.append('avatar', avatar);
      props.register(data)
      e.target.reset();
    }
    return (
      <div className="signup vh-100 d-flex align-items-center z-n1"> 
      <div className='bg-light signup-content rounded-5 d-flex flex-column justify content-center align-items-center'> 
            <h1 className="w-75 text-danger text-center mb-4 mt-3">Create new Account</h1>
            <form onSubmit={registerHandler} encType='multipart/form-data'> 
            <div className="d-flex gap-3 mx-5">
            <div className="mb-2">
          <label>First Name</label>
          <input type='text' name='firstName' onChange={handleChange} className='form-control'></input>
        </div>

        <div>
          <label>Last Name</label>
          <input type='text' name='lastName' onChange={handleChange} className='form-control'></input>
        </div>
        </div>

        <div className="mx-5">
          <label>Username</label>
          <input type='text' name='username' onChange={handleChange} className='form-control'></input>
        </div>

        <div className="mx-5">
          <label>Email Address</label>
          <input type='email' name='emailAddress' onChange={handleChange} className='form-control'></input>
        </div>

        <div className="mx-5 mb-4">
          <label>Password</label>
          <input type='password' name='password' onChange={handleChange} className='form-control'></input>
            </div>
            
        <div className='mx-5 mb-4'>
          <label>Profile Image</label>
          <input type='file' className="form-control" onChange={handleAvatarChange} />
        </div>
            
        <div className="mx-5 mb-3">
          <input type='submit' value='Register' className='btn btn-danger w-100 rounded-pill'></input>
        </div>
        <div>
          <p className="text-danger text-center mb-3">Already Registered? <Link to="/signin">Login</Link></p>
        </div>
      </form>
      </div>
      </div>
  )
}
