import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios'
import "./login/login.css"
function Register() {

  const navigate=useNavigate()
  const [values, setValues] = useState({
    name:"",
    email: "",
    phone:"",
    password: "",
  });

  const generateError = (err) => {
    toast.error(err, {
      position: "top-center",
    });
  };

console.log(values);
  const handleSubmit = async (e) => {
    console.log("iam here")
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/register",
       {...values},{withCredentials:true});
      console.log(data, "kkkkkk");
      if (data) {
        if (data.errors) {
          console.log(data.errors);
          if (data.errors.email) generateError(data.errors.email);
          else if (data.errors.password) generateError(data.errors.password);
        } else {
          navigate('/')
        }
      }
    } catch (err) {
    
      console.log(err);
    }
  };

 
  return (
    <div className="container">
      <h2>Register Account</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="name">Name</label>
          <input
            type="name"
            name="name"
            
           onChange={(e)=>
            setValues({ ...values, name: e.target.value })}
            placeholder="Email"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            
           onChange={(e)=>
            setValues({ ...values, email: e.target.value })}
            placeholder="Email"
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="phone"
            name="phone"
            
           onChange={(e)=>
            setValues({ ...values, phone: e.target.value })}
            placeholder="Email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            
            onChange={(e)=>
              setValues({ ...values, password: e.target.value })}
            placeholder="Password"
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an Account? <Link to="/login">Login</Link>
        </span>
        <ToastContainer />
      </form>
      
    </div>
  );
}

export default Register;
