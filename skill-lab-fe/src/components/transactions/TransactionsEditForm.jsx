import React from 'react'
import { useState } from 'react'

export default function TransactionsCreateForm(props) {

    const [editTransaction, setEditTransaction] = useState(props.transactions)

    const handleChange = (event) => {
    const attributeToChange = event.target.name
    const newValue = event.target.value
    
    const updateTransaction = {...editTransaction}
    updateTransaction[attributeToChange] = newValue
    console.log(updateTransaction)
    setEditTransaction(updateTransaction)
    }
    

    const handleSubmit = (event) => {
      event.preventDefault()
      props.updateTheview(editTransaction)
      event.target.reset()
  }
    

  return (
    <div>
   <h1>Edit Transaction</h1>

<form onSubmit={handleSubmit} >


<div>
<label>Amount</label>
<input type='text' name='amount' value={editTransaction.amount} onChange={handleChange} className='form-control'></input>
</div>

    <div>
        <input type='submit' value="Edit Transaction" className='btn btn-primary'></input>
    </div>
    </form>
</div>
  )
}
