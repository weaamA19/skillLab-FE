import React from 'react'
import { useState } from 'react'

export default function TransactionsCreateForm(props) {

    const [newTransaction, setNewTransaction] = useState({})

    const handleChange = (event) => {
    const attributeToChange = event.target.name
    const newValue = event.target.value
    
    const transaction = {...newTransaction}
    transaction[attributeToChange] = newValue
    console.log(transaction)
    setNewTransaction(transaction)
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        props.addTransactions(newTransaction)
    }
    
    

  return (
    <div>
   <h2 className='text-center'>Create Transaction</h2>

<form onSubmit={handleSubmit} >

<div className='row d-flex justify-content-center align-items-center'>
  <div  className='col-md-6'>
<label>Amount</label>
<input type='Number' name='amount' onChange={handleChange} className='form-control'></input>
  </div>
</div>

<br></br>

<div className='row d-flex justify-content-center align-items-center text-center'>
    <div  className='col-md-6'>
        <input type='submit' value="Add Transaction" className='btn btn-secondary'></input>
    </div>
   </div>
    </form>
    <br></br>
</div>

  )
}
