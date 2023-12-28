import React from 'react'
import CoursesList from './components/courses/CoursesList'
import TransactionsList from './components/transactions/TransactionsList'

export default function App() {

  return (
    <div>
      <CoursesList></CoursesList>
      <TransactionsList></TransactionsList>
    </div>
  )
}
