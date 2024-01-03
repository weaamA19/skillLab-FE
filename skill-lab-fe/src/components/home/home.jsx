import React, { useState } from 'react'
import video from '../../video/video.mp4'
import '../home/home.css'
import Axios from 'axios'
import Signin from '../user/Signin'
import Signup from '../user/Signup'
import { Routes, Route, Link } from "react-router-dom"

export default function Home() {



  return (
    <>
    <body class="text-center">
    <main role="main" className="inner-cover">
    
     
    <h1 className="cover-heading">Unleash Talents</h1>
    <p className="lead">Unlock Your Potential, One Course at a Time!</p>
    <p className="lead d-flex gap-2 align-items-center justify-content-center">
      
      <Link to = "/signin"  className="btn btn-lg btn-secondary">Sign In</Link>
      <Link to = "/signup" className="btn btn-lg btn-secondary">Sign up</Link>
      
    </p>
          
       

  </main>

  <div className='videoContent'>
  <video autoPlay loop muted >
        <source src={video} typeof='video/mp4'></source>
      </video>
  </div>




      </body>
    </>
  )
}
