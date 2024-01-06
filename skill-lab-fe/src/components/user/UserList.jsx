import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import User from './User';
import UserEditForm from './UserEditForm';

export default function UserList() {
    const [users, setUsers] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [currentUser, setCurrentUser] = useState({})

    const setHeader = ()=> {
      const authheader = {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
          }
      }
      return authheader;
    };

    useEffect(() => {
        //call api
        loadUsersList();
      }, []);

      const loadUsersList = () => {
        Axios.get('/user/index', setHeader())
        .then((response) => {
            console.log(response);
            setUsers(response.data.users)
        })
        .catch((err) => {
            console.log(err);
        })
      }

      const editView = (id) => {
        console.log(id);
        Axios.get(`/user/edit?id=${id}`)
        .then(res => {
          console.log("Loaded User Information");
          let user = res.data.editUser;
          setIsEdit(!isEdit);
          setCurrentUser(user)
        })
        .catch((err) => {
          console.log("Error Loading User Information");
          console.log(err);
        })
      }

      const updateUser = (user) => {
        Axios.put('/user/update', user)
        .then((res) => {
          console.log("user Updated Successfully!");
          console.log(res);
          loadUsersList();
          setIsEdit(false);
        })
        .catch((err) => {
          console.log("Error Updating User Information");
          console.log(err);
        })
      }

      const deleteUser = (id) => {
        Axios.delete(`/user/delete?id=${id}`, setHeader())
        .then((res) => {
          console.log("User Deleted Successfully");
          console.log(res);
          loadUsersList();
        })
        .catch((err) => {
          console.log("Error Deleting User");
          console.log(err);
        })
      }
      
      const allUsers = users.map((users) => {
        <tr key={users._id}>
          <User {...users} editView={editView} deleteUser={deleteUser}/>
        </tr>
      })
  return (
    <div>
      <h1>User List</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>User Image</th>              
              <th>Username</th>
              <th>Name</th>
              <th>Email Address</th>
              <th>Role</th>
            </tr>
            </thead>
            <tbody>
            {allUsers}
          </tbody>
        </table>
      </div>

        {(isEdit) && <UserEditForm key={currentUser._id} user={currentUser} updateUser={updateUser}/>}

    </div>
  )
}
