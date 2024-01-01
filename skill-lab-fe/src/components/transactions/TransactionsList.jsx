import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from 'axios'
import Transactions from '../transactions/Transactions'
import TransactionsEditForm from '../transactions/TransactionsEditForm'
import TransactionsCreateForm from '../transactions/TransactionsCreateForm'


export default function TransactionsList(props) {

  const [transactions, setTransactions] = useState([]);
  const [isEdit, setIsEdit] = useState(false)
  const [currentTransactions, setCurrentTransactions] = useState({})

  useEffect(() => {
    // call api
    loadTransactionsList();
  }, []);

  const loadTransactionsList = () => {
    Axios.get("transactions/index")
    .then((response) => {
      console.log(response);
      setTransactions(response.data.transactions);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const addTransactions = (transactions) => {
    Axios.post("transactions/add", transactions)
    .then(res =>{
    console.log('Transaction has been Added') 
    loadTransactionsList()
  })
    
    
    .catch(err => {

   console.log('Error cannot Add')
  console.log(err) })

  }

  const editTheView = (id) => {
   Axios.get(`transactions/edit?id=${id}`)
   .then((res) => {

  console.log(res.data.transactions) 
  console.log('Done') 
 let transactions = res.data.transactions  
setIsEdit(true)
setCurrentTransactions(transactions) }
)

   .catch(err => {
    console.log('error')
    console.log(err)
   })


  }


  const updateTheview = (transaction) => {
Axios.put("transactions/update", transaction)
.then(res => {
  console.log('Transaction has been Updated')
  console.log(res)
  loadTransactionsList()
  setIsEdit(false)
})

.catch(err => {
  console.log('Cannot Update')
  console.log(err)
})
  }


  const deleteTransactions = (id) => {
Axios.delete(`transactions/delete?id=${id}`)
.then(res => {
  console.log('Transaction has been Deleted')
  console.log(res)
  loadTransactionsList()
})

.catch(err => {
  console.log('cannot delete')
  console.log(err)
})
  }

const allTheTransactions = transactions.map((transactions , index) => (

  <tr key={index}>  
    <Transactions {...transactions} editView = {editTheView} deleteTheTransaction={deleteTransactions}/>
  </tr>

))




  return (
    <div>

       <div>
         <table className="table table-stripes">
          <tbody>
            <tr>
            <th>Amount</th> 
             <th>Edit</th>
             <th>Delete</th>
            </tr>            
          </tbody>
          {allTheTransactions}
        </table>
    </div>
    {(!isEdit) ? 
      <TransactionsCreateForm addTransactions={addTransactions}></TransactionsCreateForm>
      :
      <TransactionsEditForm key={currentTransactions._id} transactions={currentTransactions} updateTheview={updateTheview}></TransactionsEditForm>
}
    </div>
  )
}
