import React from "react";
import "./adminHome.css";
import Table from "react-bootstrap/Table";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setUserDetails } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import {useCookies} from 'react-cookie'

function AdminHome() {
  const [users, setUser] = useState([]);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [cookie, setCookie, removeCookie] = useCookies([]);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("");
  const [allUsers, setAllUsers] = useState([]);


  const verifyUser = async () => {
    if (!cookie.adminjwt) {
      navigate("/admin-login");
    } else {
      const { data } = await axios.get(
        "http://localhost:4000/admin",
        {},
        { withCredentials: true }
      );
      console.log(data,'879465132');
      if (!data.status) {
         
        removeCookie("adminjwt");
        navigate("/admin-login");
       
       }
      // else{
      //   toast(`Hi ${data.user}` ,{theme:"dark"})
      // }
    }
  };

  
  useEffect(() => {
      verifyUser();
      getUserDetails();
    }, []);
    
 

  function getUserDetails() {
    axios
      .get("http://localhost:4000/admin/user-list", { withCredentials: true })
      .then((response) => {
        console.log(response, "kkkkkkkkkkk");
        setUser(response.data.userList);
      });
  }


  const filterData = (e) => {
    if (e.target.vlaue != "") {
      setValue(e.target.value);
      const filterUsers = allUsers.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setSearch([...filterUsers]);
    } else {
      setValue(e.target.value);
      setAllUsers([...allUsers]);
    }
  };



  function deleteUser(userId){
    console.log("start");
    axios
       .delete(
         `http://localhost:4000/admin/delete-user/${userId}`,
    { withCredentials: true }
    ).then((response)=>{
      
      if (response.data.status) {
        getUserDetails();
      } else {
        toast.error(response.data.message, {
          position: "top-center",
        });
      }
    })
  
  }

  return (
    <div>
      <h1 className="heading">Users List</h1>

      <div className="btnctr">
        <input
          type="text"
          id="search"
          value={value}
          name="search"
          onChange={filterData}
          className="form-control"
          placeholder="search.."
        />
 <button className="addBtn"  onClick={() => {
            dispatch(
              setUserDetails({
                name: null,
                id: null,
                image: null,
                token: null,
              })
            );
            removeCookie("adminjwt");
            navigate("/admin-login");
          }}>Logout</button>
        <button className="addBtn"><Link to='/add-user'>Add User</Link></button>
      </div>
      <div className="container">
        <div className="row">
          <div className="row">
            <Table
              style={{ width: "100%", color: "white" }}
              bordered
              striped="columns"
            >
              <thead className="">
                <tr className="">
                  <th>No</th>
                  <th>FirsName</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {users &&
                  users.map((user, key) => {
                    return (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                          <button className="editBtn" onClick={()=>{
                            dispatch(
                              setUserDetails({
                                name: user.name,
                                email: user.email,
                                phone: user.phone,
                                id: user._id,
                                image: user.image,
                              })
                            )
                             navigate('/edit-user')
                          }}>Edit</button>
                          <button className="deleteBtn" onClick={()=>{
                            deleteUser(user._id)
                          }}>Delete</button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
    
  );
}

export default AdminHome;
