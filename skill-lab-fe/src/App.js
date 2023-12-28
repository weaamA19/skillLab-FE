import React, { useState, useEffect} from 'react'
import CoursesList from './components/courses/CoursesList'
import TransactionsList from './components/transactions/TransactionsList'
import CategoryList from './components/category/CategoryList'
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from 'axios'
import CartList from './components/cart/CartList'
import { Routes, Route, Link } from "react-router-dom"

// CartList

export default function App() {

  return (
    <div>

<nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>


  
        <a className="navbar-brand" href="#">SkillLab</a>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Categories</a>
              </li>

             
             
              <li className="nav-item">
                <a className="nav-link" href="#">Sign In</a>
              </li>
              
              <li className="nav-item">
                <a className="nav-link" href="#">Sign Out</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">Sign Up</a>
              </li>


            </ul>
          </div>
     
      </div>
    </nav>

      <CoursesList></CoursesList>
      <TransactionsList></TransactionsList>
      {/* <CategoryList></CategoryList> */}
      {/* <CartList></CartList> */}
    </div>
  )
}
