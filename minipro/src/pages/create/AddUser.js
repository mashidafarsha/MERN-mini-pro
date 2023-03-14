import React, { useState } from 'react'
import "./adduser.css"
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom'

function AddUser() {
  const navigate=useNavigate();
   const [values,setValues]=useState({
    name:"",
    email: "",
    phone:"",
    password: "",
   }) 
  
const handleSubmit=(e)=>{
  e.preventDefault();
  console.log(values);
  axios
      .post(
        "http://localhost:4000/admin/add-user",
        { ...values },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.status) {
          toast.success(response.data.message, {
            position: "top-center",

          });
                  
        } else {
          toast.error(response.data.errors.message, {
            position: "top-center",
          });
        }
      });
      navigate('/admin')
}
  return (
    <div className="containerss">
      <div className="wrapper">
        <div className="title">
          <span>ADD USER</span>
        </div>

        <form  onSubmit={handleSubmit}>
          <div className="row">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={(e)=>{
              setValues({...values,name:e.target.value})
              }}
              
            />
          </div>
          <div className="row">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e)=>{
                setValues({...values,email:e.target.value})
                }}
            />
          </div>
          <div className="row">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={(e)=>{
                setValues({...values,phone:e.target.value})
                }}
            />
          </div>
          <div className="row">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e)=>{
                setValues({...values,password:e.target.value})
                }}
            />
          </div>

          <div className="row button">
            <input type="submit" value="ADD USER" />
          </div>
        </form>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default AddUser