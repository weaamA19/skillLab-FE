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
   <h2 className='text-center'>Edit Transaction</h2>

<form onSubmit={handleSubmit} >

   <div className='row d-flex justify-content-center align-items-center'>
<div className='col-md-6'>
<label>Amount</label>
<input type='text' name='amount' value={editTransaction.amount} onChange={handleChange} className='form-control'></input>
</div>
   </div>

<br></br>

<div className='row d-flex justify-content-center align-items-center text-center'>
    <div className='col-md-6'>
        <input type='submit' value="Edit Transaction" className='btn btn-secondary'></input>
    </div>

 </div>
    </form>
    <br></br>
</div>
  )
}
