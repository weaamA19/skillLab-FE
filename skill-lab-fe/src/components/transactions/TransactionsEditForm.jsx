import React from 'react'
import { useState } from 'react'

export default function TransactionsCreateForm(props) {

    const [editTransaction, setEditTransaction] = useState({})

    const handleChange = (event) => {
    const attributeToChange = event.target.name
    const newValue = event.target.value
    
    const transaction = {...editTransaction}
    transaction[attributeToChange] = newValue
    console.log(transaction)
    setEditTransaction(transaction)
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        props.editTransaction(editTransaction)
    }
    

  return (
    <div>
   <h1>Edit Transaction</h1>

<form onSubmit={handleSubmit} >


<div>
<label>Amount</label>
<input type='text' name='amount' onChange={handleChange} className='form-control'></input>
</div>

    <div>
        <input type='submit' value="Edit Transaction" className='btn btn-primary'></input>
    </div>
    </form>
</div>
  )
}
