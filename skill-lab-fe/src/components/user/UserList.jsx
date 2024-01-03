import { Axios } from 'axios';
import React, { useEffect, useState } from 'react'
import User from './User';
import UserEditForm from './UserEditForm';

export default function UserList() {
    const [users, setUsers] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [currentUser, setCurrentUser] = useState({})

    const authHeader = {
        headers: {
             "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }

    useEffect(() => {
        //call api
        loadUsersList();
      }, []);

      const loadUsersList = () => {
        Axios.get(`user/index`, authHeader)
        .then((response) => {
            console.log(response);
            setUsers(response.data.user)
        })
        .catch((err) => {
            console.log(err);
        })
      }

      const editView = (id) => {
        console.log(id);
        Axios.get(`user/edit?id=${id}`)
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
        Axios.put('user/update', user)
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
        Axios.delete(`user/delete?id=${id}`, authHeader)
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

      const allUsers = users.map((user, index) => {
        <tr key={index}>
          <User {...user} editView={editView} deleteUser={deleteUser}/>
        </tr>
      })
  return (
    <div>
      <h1>User List</h1>
      <div>
        <table>
          <tbody>
            <tr>
              <th>User Image</th>              
              <th>Username</th>
              <th>Name</th>
              <th>Email Address</th>
              <th>Role</th>
            </tr>
            {allUsers}
          </tbody>
        </table>
      </div>

        {(isEdit) && <UserEditForm key={currentUser._id} user={currentUser} updateUser={updateUser}/>}

    </div>
  )
}
