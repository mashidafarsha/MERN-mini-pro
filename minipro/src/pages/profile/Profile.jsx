import React, { useState,useEffect } from "react";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {useSelector,useDispatch} from "react-redux"
import { setUserDetails } from "../../features/userSlice";
import axios from "axios";
import "./profile.css";


function Profile() {
  const user = useSelector((state)=>state.user)
  console.log(user,"wwwwwwwwww");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies([]);

  useEffect(() => {
    console.log(user,"kkkkkk");
    const verifyUser = async () => {
      if (!cookie.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          { withCredentials: true }
        );
        console.log(data);
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        }
        // else{
        //   toast(`Hi ${data.user}` ,{theme:"dark"})
        // }
      }
    };
    verifyUser();
  }, [cookie, navigate, removeCookie]);




 
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          userId: "" + user.id,
        },
        withCredentials: true,
      };
    try {
        const formData = new FormData();
       
        formData.append("image", image);
       

      const data = await axios.post(
        "http://localhost:4000/upload-image",
        formData,
         config
      );
      console.log(data,"data");
      if (data.status) {
        console.log("ooooooooooo");
        dispatch(
          setUserDetails({
            name: data.data.users.name,
            id: data.data.users._id,
            image: data.data.users.image,
          })
        );
       
       
      }
      
      
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="card">
      <div className="image_card">
        <img
          style={{ objectFit: "cover" }}
          width={"100%"}
          height={"100%"}
          src={
            image
              ? URL.createObjectURL(image) ?? ""
              : `http://localhost:4000/${user.image ? user.image : ""}`
          }
          alt=""
        />
      </div>
      <div className="userName">
        <h2>{user.name}</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="">
          <div className="mb-3">
            <input
              name="image"
              className="form-control form-control-sm"
              id="formFileSm"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              type="file"
            />
          </div>
          <div className="btn_div">
            <button className="back_btn"><Link to="/">Back</Link></button>
            <button type="submit" className="sub_btn">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Profile;
