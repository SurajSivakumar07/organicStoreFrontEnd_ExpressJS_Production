import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../Context";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../../Redux/actions/action";
import axios from "axios";

// import "./login.css"
export default function Signup(props) {
  // const [name, yup] = useContext(UserContext);

  const { name, setName, dup1, dup2 } = useContext(UserContext);

  const [user, setUser] = useState();

  const dispatch = useDispatch();

  const [namedup, setNameDup] = useState();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // const getId = async () => {
  //   axios.get("http://localhost:8080/users/register").then((res) => {
  //     res.data.filter((items) => {
  //       if (items.email.includes(email)) {
  //         console.log(res);
  //         localStorage.setItem("userId", items.id);
  //         dispatch(checkLogin(true));
  //         localStorage.setItem("isLoggedin", true);
  //       }
  //     });
  //   });
  // };

  const signupHandler = (e) => {
    e.preventDefault();

    axios
      .post(
        "https://orgranicstorebackendexpressproduction.onrender.com/users/register",
        {
          username: email,
          password: password,
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setName(true);
          dispatch(checkLogin(true));

          localStorage.setItem("name", res.data.newUser.username.split("@")[0]);

          localStorage.setItem("isLoggedin", true);

          props.Trigger(false);
          localStorage.setItem("userId", res.data.newUser._id);
          dispatch(checkLogin(true));
          localStorage.setItem("isLoggedin", true);

          // getId();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return props.trigger ? (
    <>
      <div className="login">
        <div className="login-wrap">
          <h1>Signup</h1>

          <h1 onClick={() => props.Trigger(false)}>
            <i class="fa-regular fa-circle-xmark"></i>
          </h1>
        </div>

        <form className="fromInput" onSubmit={signupHandler}>
          <input
            type="text"
            placeholder="Enter your Name"
            onChange={(e) => {
              setNameDup(e.target.value);
              setUser(e.target.value);
            }}
            required
          />

          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br></br>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br></br>

          <input type="submit" id="login-btn" />
        </form>
      </div>
    </>
  ) : (
    ""
  );
}
