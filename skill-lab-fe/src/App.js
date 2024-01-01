import React, { useState, useEffect} from 'react'
import CoursesList from './components/courses/CoursesList'
import TransactionsList from './components/transactions/TransactionsList'
import CategoryList from './components/category/CategoryList'
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from 'axios'
import CartList from './components/cart/CartList'
import { Routes, Route, Link } from "react-router-dom"
import Signup from './components/user/Signup';
import Signin from './components/user/Signin';
import {jwtDecode} from 'jwt-decode';


// CartList

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({})

  const [userData, setUserData] = useState([])

  useEffect(() => {
    const user = getUser();
    console.log(user);

    if (user) {
      setIsAuth(true);
      setUser(user);
    }
    else {
      localStorage.removeItem("token");
      setIsAuth(false);
      setUser(null);
    }

    loadUserData();

  }, [])
  

  const registerHandler = (user) => {
    Axios.post("user/signup", user)
    .then(res => {
      console.log(res);
    })
    .catch(err =>{
      console.log(err);
    })
  }

  const loginHandler = (cred) => {
    Axios.post("user/signin", cred)
    .then(res => {
      console.log(res.data.token);
      let token = res.data.token;

      if (token != null) {
        localStorage.setItem("token", token);
        const user = getUser();
        console.log(user);
        user ? setIsAuth(true) : setIsAuth(false)
        user? setUser(user) : setUser(null)
      }
    })
    .catch(err =>{
      console.log(err);
      setIsAuth(false)
      setUser(null)
    })
  }

  const loadUserData = () => {
    Axios.get(`user/signedin?id=6591b65713f121a6156aa700`)
    .then(res => {
      console.log(res);
      setUserData(res.data.user)
    })
    .catch(err =>{
      console.log(err);
    })
  }


  const getUser = () => {
    const token = getToken();
    return token ? jwtDecode(token).user : null
  }

  const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
  }

  const onLogoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser(null);
  }

  const isAdmin = user && userData.userType === 1;
  
  // const isStudent = user && userData.userType === 2;

  return (
    <div>

<nav className="navbar navbar-expand-lg bg-body-tertiary">
{ isAuth ? (
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>


        
        <a className="navbar-brand">SkillLab</a>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <a className="nav-link active" aria-current="page">Home</a>
              </li>
              {isAdmin ? (
                <>
              <li className="nav-item">
                <a className="nav-link"><Link to='/'>Courses</Link></a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">Courses</a>
              </li>
              </>
              ):(
                <li className="nav-item">
                  <a className="nav-link" href="#">Categories</a>
                </li>
                )}
  

              <li className="nav-item">
              <a className="nav-link"><Link to='/logout' onClick={onLogoutHandler}>Logout</Link></a>
              </li>
            </ul>
          </div>

      </div>
       ) : (
        <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>


        
        <a className="navbar-brand" href="/">SkillLab</a>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="#">Categories</a>
              </li> */}

             
             
              <li className="nav-item">
                <a className="nav-link"><Link to='/signin'>Sign In</Link></a>
              </li>


              <li className="nav-item">
                <a className="nav-link"><Link to='/signup'>Sign Up</Link></a>
              </li>
            </ul>
          </div>

      </div>
       )
      }
    </nav>

    <div>
        <Routes>
          <Route path='/' element={isAuth ? <CoursesList/> : <Signin login={loginHandler}/>}/>
          <Route path='/signup' element={<Signup register={registerHandler}/>}/>
          <Route path='/signin' element={isAuth ? <CoursesList/> : <Signin login={loginHandler}/>}/>

        </Routes>
      </div>

      {/* <CoursesList></CoursesList>
      <TransactionsList></TransactionsList> */}
      {/* <CategoryList></CategoryList> */}
      {/* <CartList></CartList> */}
    </div>
  )
}
