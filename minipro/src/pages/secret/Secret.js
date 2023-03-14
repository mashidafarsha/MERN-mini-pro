import React, { useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { setUserDetails } from "../../features/userSlice";
import "./Secret.css";

function Secret() {
  const user = useSelector((state)=>state.user)
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookie.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          { withCredentials: true }
        );
        console.log(data,"rrrrrrrrrrrr");
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        }
       
      }
    };
    verifyUser();
  }, [cookie, navigate, removeCookie]);

 
  return (
    <div className="pCard_card">
      <div className="pCard_up">
        <img
          width={"100%"}
          style={{ objectFit: "cover" }}
          height={"100%"}
          src={user.image && `http://localhost:4000/${user.image}`}
          alt=""
        />
        <div className="pCard_text">
          <h2>{user.name}</h2>
        </div>
      </div>
      {/* <div className="pCard_down">
                <div class="file btn btn-lg btn-primary upload-btn">
                    Upload
                    <input className='upload-btn-input' type="file" name="file" />
                </div>
            </div> */}
      <div
        style={{ bottom: "45px" }}
        className="pCard_down d-flex justify-content-around"
      >
        <div  className="file btn btn-lg btn-danger btn-danger-shadow upload-btn"> <Link to='/login'>Login</Link></div>
        <div  className="file btn btn-lg btn-danger btn-danger-shadow upload-btn">
          <Link to="/profile">ChangePhoto</Link>
          {/* Change Photo */}
        </div>
        <div
          onClick={() => {
            dispatch(
              setUserDetails({
                name: null,
                id: null,
                image: null,
                token: null,
              })
            );
            removeCookie("jwt");
            navigate("/login");
          }}
          className="file btn btn-lg btn-danger btn-danger-shadow upload-btn"
        >
          Logout
        </div>
        
      </div>
    </div>
  );
}

export default Secret;
