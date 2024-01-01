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
   <h1>Create Transaction</h1>

<form onSubmit={handleSubmit} >

<div>
<label>Amount</label>
<input type='Number' name='amount' onChange={handleChange} className='form-control'></input>
</div>

    <div>
        <input type='submit' value="Add Transaction" className='btn btn-primary'></input>
    </div>
    </form>
</div>
  )
}
