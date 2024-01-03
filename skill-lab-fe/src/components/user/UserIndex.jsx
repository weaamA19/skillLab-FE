import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import UserEditForm from './UserEditForm';

export default function UserIndex({user, getUser}) {
  const [isEdit, setIsEdit] = useState(false);
  const [userDetails, setUserDetails] = useState({user});

  let [getUserInfo,setUserInfo]=useState();

  useEffect(() => {
    // console.log(getUser().id);
    // getUserInfo = getUser();

    // getUserInfo = getUserInfo.id;
    setUserInfo(getUser());

    userInfo();


  },[])


  // {
  //   headers: {
  //     "Authorization": "Bearer " + localStorage.getItem("token")
  //   }
  const userInfo = () => {
  
    Axios.get(`user/signedin?id=${getUser().id}`)
    .then((res) => {
      console.log(res);
      setUserDetails(res.data.user)
    })
    .catch((err) => {
      console.log(err);
    })
  }
  console.log(userDetails);
  
  console.log("Get User Info", getUserInfo);

  const handleClick = () => {
    setIsEdit(!isEdit);
  }

  const updateUser = (user) => {
    Axios.put('user/update', user)
    .then((res) => {
      console.log("User Updated Successfully!");
      console.log(res);
      setIsEdit(false);

      setUserInfo(res.data.user)
      getUserInfo = res.data.user._id
      userInfo()
    })
    .catch((err) => {
      console.log("Error Updating User Information");
      console.log(err);
    })
  }


  return (
    <div>
      {getUserInfo && console.log(getUserInfo)}
      <h1>Profile</h1>
      {<div>First Name: {userDetails.firstName}</div>}
      {<div>Last Name: {userDetails.lastName}</div>}
      {<div>Username: {userDetails.username}</div>}
      {<div>Email Address: {userDetails.emailAddress}</div>}
      {<div>User Role:{userDetails.userType}</div>}
      <button onClick={handleClick}   >Edit Profile</button> 

      {isEdit && <UserEditForm user={userDetails} setIsEdit={setIsEdit} updateUser={updateUser}/>}   
    </div>
  )
}
