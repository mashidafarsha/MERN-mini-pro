import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import{setAdminDetails} from  '../../features/adminSlice'

import axios from "axios";

function AdminLogin() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });


  const generateError = (err) => {
    toast.error(err, {
      position: "top-center",
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let { data } = await axios.post(
        "http://localhost:4000/admin/admin-login",
        { ...values },
        { withCredentials: true }
      );
      console.log(data,"data");
      if (data) {
        if (data.errors) {
          console.log(data.errors);
          if (data.errors.email) generateError(data.errors.email);
          else if (data.errors.password) generateError(data.errors.password);
        }else{
          dispatch(
            setAdminDetails({
              email: data.admin.email,
             
              token: data.token,
            })
          );
        }
    

        
      navigate("/admin");
    }
    } catch(err) {
        console.log(err);
    }
  };

  return (
    <div className="container">
      <h2>Admin Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            placeholder="Email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            placeholder="Password"
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an Account? <Link to="/register">Register</Link>
        </span>
        <ToastContainer />
      </form>
    </div>
  );
}

export default AdminLogin;
