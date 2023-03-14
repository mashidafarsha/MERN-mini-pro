import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import "../create/adduser.css"

function EditUser() {
   const navigate=useNavigate()
    const user = useSelector((state) => state.user);
    
    const [userData,setUserData]=useState(user)

const editUser=(e)=>{
    e.preventDefault();

    axios.put("http://localhost:4000/admin/edit-user",{...userData}).then((response)=>{
      if(response.data.status){
        toast.success(response.data.message, {
          position: "top-center",
        });
      }else{
        toast.error(response.data.message, {
          position: "top-center",
        });
      }
     })
     navigate('/admin')
}


  return (
    <div className="containerss">
      <div className="wrapper">
        <div className="title">
          <span>EDIT USER</span>
        </div>

        <form onSubmit={editUser} >
          <div className="row">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={userData.name}
              onChange={(e) => {
                setUserData({ ...userData, name: e.target.value });
              }}
              aria-describedby="name"
              placeholder="Enter name"
            />
           
             
          
          </div>
          <div className="row">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              value={userData.email}
              onChange={(e) => {
                setUserData({ ...userData, email: e.target.value });
              }}
              className="form-control"
            
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="row">
            <label htmlFor="phone">Phone</label>
            <input
              type="number"
              value={userData.phone}
              onChange={(e) => {
                setUserData({ ...userData, phone: e.target.value });
              }}
              className="form-control"
              id="phone"
              aria-describedby="phonehelp"
             
              placeholder="Enter phone number"
            />
          </div>

          <div className="row button">
          <button type='submit'>UPDATE USER</button>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default EditUser