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
    {/* style="height: 450px;" */}
    {/* <section className="py-5 text-center container-fluid w-100 home-view pt-0">
    <div className="row py-lg-5 trans-background d-flex justify-content-center align-items-center">
      <div className="col-lg-6 col-md-8 mx-auto">
        <h1 className="fw-light trans-background-content mb-4">Unleash Talents</h1>
        <p className="lead trans-background-content ">Unlock Your Potential, One Course at a Time!</p>
        <p>
        <Link to = "/signin"  className="btn btn-lg btn-light">Sign In</Link>
      <Link to = "/signup" className="btn btn-lg btn-light">Sign up</Link>
        </p>
      </div>
    </div>
</section> */}
    {/* <body class="text-center"> */}
    <main role="main" className="inner-cover text-center">
    
     
    <h1 className="cover-heading">Unleash Talents</h1>
    <p className="lead">Unlock Your Potential, One Course at a Time!</p>
    <p className="lead d-flex gap-2 align-items-center justify-content-center">
      
      <Link to = "/signin"  className="btn btn-lg btn-secondary rounded-pill">Sign In</Link>
      <Link to = "/signup" className="btn btn-lg btn-secondary rounded-pill">Sign up</Link>
      
    </p>
          
       

  </main>

  <div className='videoContent z-n1'>
      <video autoPlay loop muted className="w-100 object-fit-scale">
        <source src={video} typeof='video/mp4'></source>
      </video>
  </div>




      {/* </body> */}
    </>
  )
}
