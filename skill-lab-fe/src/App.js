import React, { useState, useEffect} from 'react'
import logo from './logo.svg';
import CoursesList from './components/courses/CoursesList'
import TransactionsList from './components/transactions/TransactionsList'
import CategoryList from './components/category/CategoryList'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './index.css';
import Axios from 'axios';
import CartList from './components/cart/CartList';
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Signup from './components/user/Signup';
import Signin from './components/user/Signin';
import {jwtDecode} from 'jwt-decode';
import Categories from './components/home/categories'
import CourseDetails from './components/home/courseDetails'
import CoursesByCategory from './components/home/coursesByCategory';
import FileUpload from './components/home/installingMulter';
import Home from './components/home/home';
import UserIndex from './components/user/UserIndex';
import UserEditForm from './components/user/UserEditForm';
import CartTotal from './components/cart/CartTotal';
import PlaceOrder from './components/cart/PlaceOrder';
import MyCourses from './components/user/MyCourses';

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
    Axios.post("/user/signup", user)
    .then(res => {
      console.log(res);
    })
    .catch(err =>{
      console.log(err);
    })
  }

  const loginHandler = (cred) => {
    Axios.post("/user/signin", cred)
    .then(res => {
      console.log(res.data.token);
      let token = res.data.token;

      if (token != null) {
        localStorage.setItem("token", token);
        const user = getUser();
        console.log(user);
        user ? setIsAuth(true) : setIsAuth(false)
        user? setUser(user) : setUser(null)

        // Load user data after setting authentication state
        loadUserData();
      }
    })
    .catch(err =>{
      console.log(err);
      setIsAuth(false)
      setUser(null)
    })
  }

  const loadUserData = () => {
    const userId = getUser()?.id;
    console.log(userId)
    Axios.get(`/user/signedin?id=${userId}`)
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

  const isAdmin = userData.userType === "1";



  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark z-0 align-items-center justify-content-center justify-content-md-between py-3 mb-4 nav-style">
      <div className="container-fluid">
      <a class="navbar-brand col-lg-3 me-0"><Link to="/categories"> <img src={logo} className='img-sizing' alt="logo"/></Link>
      </a>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#skillLab-nav" aria-controls="skillLab-nav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      
      { isAuth ? (
      <>

      <div className="collapse d-lg-flex navbar-collapse" id="skillLab-nav">
      <ul className="navbar-nav col-lg-8 col-md-auto mb-2 justify-content-center mb-md-0">
         <li className="nav-item">
                <a className="nav-link active" aria-current="page"><Link to='/categories' className='text-decoration-none text-light'>Home</Link></a>
              </li>
              {isAdmin ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link"><Link to='/category' className='text-decoration-none text-light'>Categories</Link></a>
                  </li>

                  {/* <li className="nav-item"> */}
                    {/* <a className="nav-link text-light"><Link to='/category' className='text-decoration-none text-light'>Add Category</Link></a> */}
                  {/* </li> */}

                  <li className="nav-item">
                    <a className="nav-link"><Link to='/courses' className='text-decoration-none text-light'>Courses</Link></a>
                  </li>

                  {/* <li className="nav-item">
                    <a className="nav-link text-light">Add Course</a>
                  </li> */}

                  <li className="nav-item">
                    <a className="nav-link"><Link to='/cart/index' className='text-decoration-none text-light'>Cart</Link></a>
                  </li>
                </>
              ):(
                <>
                  <li className="nav-item">
                    <a className="nav-link"><Link to='/category' className='text-decoration-none text-light'>Categories</Link></a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link"><Link to='/courses' className='text-decoration-none text-light'>Courses</Link></a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link"><Link to='/cart/index' className='text-decoration-none text-light'>Cart</Link></a>
                  </li>
                </>
                )}


  

              {/* <li className="nav-item">
              <a className="nav-link"><Link to='/logout' onClick={onLogoutHandler}>Logout</Link></a>
              </li> */}


      </ul>

      <div class="d-lg-flex col-lg-4 justify-content-lg-end z-3">
      <div className="dropdown text-end">
          <a href="#" className="d-block text-decoration-none dropdown-toggle text-light" data-bs-toggle="dropdown" aria-expanded="false">
              {userData.username}
              <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle ms-2"/>
          </a>
          <ul class="dropdown-menu text-small z-3">
          <li><a className="dropdown-item"><Link to='/profile' className='text-decoration-none text-dark'>Profile</Link></a></li>
            <li><a className="dropdown-item"><Link to='/cart/index' className='text-decoration-none text-dark'>Cart</Link></a></li>
            <li><a className="dropdown-item"><Link to='/mycourses' className='text-decoration-none text-dark'>My Orders</Link></a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#"><Link to='/logout' onClick={onLogoutHandler}>Sign out</Link></a></li>
          </ul>
        </div>
        </div>
        </div>
        </>
	):(
    <>
    <div className="collapse d-lg-flex navbar-collapse" id="skillLab-nav">
      <ul className="navbar-nav col-lg-9 col-md-auto mb-2 justify-content-center mb-md-0 gap-5">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page"><Link to="/" className='text-decoration-none text-light me-4'>Home</Link></a>
        </li>
        <li className="nav-item">
          <Link to="/categories" className="text-decoration-none text-light me-4"><a className="btn btn-light me-4">Our Courses</a></Link>
        </li>

        <li className="nav-item">
        <a className="nav-link"><Link to='/signin' className="text-decoration-none text-light me-4">Login</Link></a>
        </li>
        <li className="nav-item">
          <a className="nav-link"><Link to='/signup'className="text-decoration-none text-light">Sign Up</Link></a>
        </li>
      </ul>
      

    
      {/* <div className="col-md-3 text-end d-flex g-2">
      <a className="nav-link"><Link to='/signin' className="text-decoration-none text-light me-3">Login</Link></a>
      <a className="nav-link"><Link to='/signup'className="text-decoration-none text-light">Sign Up</Link></a>
      </div> */}
      </div>
        </>
    )}
    </div>
    </nav>

    <div>
        <Routes>
        <Route path='/' element={<Home/> }/>
          <Route path='/category' element={isAuth ? <CategoryList user = {userData}/> : <Signin login={loginHandler}/>}/>
          <Route path='/courses' element={isAuth ? <CoursesList user = {userData}/> : <Signin login={loginHandler}/>}/>
          <Route path='/cart/index' element={isAuth ? <CartList user = {userData}/> : <Signin login={loginHandler}/>}/>
          <Route path='/profile' element={userData ?<UserIndex getUser={getUser} user={userData}/>:""}/>
          <Route path='/editProfile' element={<UserEditForm getUser={getUser} user={userData}/>}/>
          {/* <Route path='/signin' element={isAuth ? <CoursesList/> : <Signin login={loginHandler}/>}/> */}

          {/* <Route path='/' element={isAuth ? <Home/> : <Signin login={loginHandler}/>}/> */}
          <Route path='/signup' element={<Signup register={registerHandler}/>}/>
          <Route path='/signin' element={isAuth ? <Categories /> : <Signin login={loginHandler} />} />
          <Route path='/categories' element={<Categories/> }/>
          <Route path='/transactions' element={TransactionsList}></Route>

          {/* Donot Change the folloing Paths */}
          <Route path="/courses/detail/:id" element={<CourseDetails />} />
          <Route path="/courses/coursesByCategory/:categoryId" element={<CoursesByCategory />} />
          <Route path="/transactions/:cartId" element={<CartTotal />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path='/mycourses' element={isAuth ? <MyCourses/> : <Signin login={loginHandler}/>}/>


        </Routes>
      </div>

      {/* <CoursesList></CoursesList> */}
      {/* <TransactionsList></TransactionsList> */}
      {/* <CategoryList></CategoryList> */}
      {/* <CartList></CartList> */}
      {/* <Categories></Categories> */}
     {/* <Home></Home> */}
      {/* <CartTotal /> */}
      {/* <FileUpload /> */}
    </div>
  )
}
