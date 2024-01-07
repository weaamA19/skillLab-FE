import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import UserEditForm from './UserEditForm';

export default function UserIndex({user, getUser}) {
  const [isEdit, setIsEdit] = useState(false);
  const [userDetails, setUserDetails] = useState(user); 

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
  
    Axios.get(`/user/signedin?id=${getUser().id}`)
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
    Axios.put('/user/update', user,{
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
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
      <div className='row align-items-md-strech profile z-n1 h-75 w-100'>
        <div className='col-md-6 bg-body-secondary pt-5 pe-2 profile-section'> 
          <div>
            <h1 className="ms-4 mb-4">Profile</h1>
            <div className='d-flex flex-column justify-content-center align-items-center'>
              <img src={"/uploads/"+userDetails.avatar}  alt="Profile image" width="250" height="250" class="rounded-circle ms-2"/>

            </div>
          </div>
        </div>
      <div className='col-md-6 pt-5 profile-section my-auto'>
        <div>
      {<div className='border rounded-pill px-2 py-1 mb-3 w-75 mx-auto'><span className="text-secondary me-2"> First Name </span>  {userDetails.firstName}</div>}
      {<div className='border rounded-pill px-2 py-1 mb-3 mt-4 w-75 mx-auto'><span className="text-secondary me-2"> Last Name </span>  {userDetails.lastName}</div>}
      {<div className='border rounded-pill px-2 py-1 mb-3 mt-4 w-75 mx-auto'><span className="text-secondary me-2">Username </span>  {userDetails.username}</div>}
      {<div className='border rounded-pill px-2 py-1 mb-3 mt-4 w-75 mx-auto'><span className="text-secondary me-2"> Email Address </span>  {userDetails.emailAddress}</div>}
      {/* {<div >User Role:{userDetails.userType}</div>} */}
      <div className="d-flex justify-content-center mb-5">
        <button onClick={handleClick}  className='btn btn-secondary' > Edit Profile</button> 
      </div>


      {isEdit && <UserEditForm user={userDetails} setIsEdit={setIsEdit} updateUser={updateUser}/>} 
      </div>
      </div>
      </div>  
    </div>
  )
}
