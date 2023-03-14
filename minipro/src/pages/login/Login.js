import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserDetails } from "../../features/userSlice";

import "./login.css";

function Login() {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   if (user.token) {
  //     navigate("/");
  //   }
  //   if (admin && adminState.token) {
  //     navigate("/admin");
  //   }
  // }, []);

  const generateError = (err) => {
    toast.error(err, {
      position: "top-center",
    });
  };

  const handleSubmit = async (e) => {
    console.log("iam here");
    e.preventDefault();
    try {
      let { data } = await axios.post(
        "http://localhost:4000/login",
        { ...values },
        { withCredentials: true }
      );

      if (data) {
        if (data.errors) {
          console.log(data.errors);
          if (data.errors.email) generateError(data.errors.email);
          else if (data.errors.password) generateError(data.errors.password);
        }else{
          dispatch(
            setUserDetails({
              name: data.user.name,
              id: data.user._id,
              image: data.user.image.path,
              token: data.token,
            })
          );
        }

        
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2>Login Account</h2>
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

export default Login;
