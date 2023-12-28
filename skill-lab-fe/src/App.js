import React, { useState, useEffect} from 'react'
import CoursesList from './components/courses/CoursesList'
import TransactionsList from './components/transactions/TransactionsList'
import CategoryList from './components/category/CategoryList'
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from 'axios'
import CartList from './components/cart/CartList'

// CartList

export default function App() {

  return (
    <div>
      <CoursesList></CoursesList>
      <TransactionsList></TransactionsList>
      {/* test */}
      {/* <CategoryList></CategoryList> */}
      <CartList></CartList>
    </div>
  )
}
