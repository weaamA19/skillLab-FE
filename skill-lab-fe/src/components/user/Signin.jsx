import React, {useState} from 'react'
import { Link } from "react-router-dom";

export default function Signin(props) {
    const [newUser, setNewUser] = useState({});
    const handleChange = (e) => { 
        const user = { ...newUser }
        user[e.target.name] = e.target.value;
        console.log(user);
        setNewUser(user);
    }
    const loginHandler = (e) => {
        e.preventDefault();
        props.login(newUser)
        e.target.reset();
    }
    return (
        <div className="signin vh-100 d-flex align-items-center z-n1"> 
        <div className='bg-light h-75 signin-content rounded-5 d-flex flex-column justify content-center align-items-center'>
        <h1 className="w-75 text-danger text-center mb-4 mt-3">Login to your Account</h1>
        <form onSubmit={loginHandler}> 

        <div className='col-12 mb-3'>
          <label>Username or Email Address</label>
          <input type='text' name='identifier' onChange={handleChange} className='form-control '></input>
        </div>

        <div className='col-12 mb-4'>
          <label>Password</label>
          <input type='password' name='password' onChange={handleChange} className='form-control mb-2'></input>
        </div>

        <div className='col-12 mb-3'>
          <input type='submit' value='Login' className='btn btn-danger rounded-pill w-100 mb-3'></input>
        </div>
        <div>
          <p className="text-danger">Don't have an account? <Link to="/signup">Register</Link></p>
        </div>
      </form>
      </div>   
      </div>

  )
}
