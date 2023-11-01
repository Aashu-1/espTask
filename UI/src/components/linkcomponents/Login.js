import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    const condition_obj = {
      email: email,
      password: password,
    };

    if (!email || !password) {
      alert("please fill the required field")
      return false;
    }
    axios
      .post("http://localhost:3001/user/login", condition_obj)
      .then((response) => {
        setEmail("");
        setPassword("");
        localStorage.setItem("name", response.data.userDetails[0].name);
        localStorage.setItem("email", response.data.userDetails[0].email);
        localStorage.setItem("id", response.data.userDetails[0]._id);
        localStorage.setItem("token", response.data.token);
        alert(`welcome back ${localStorage.getItem("name")}`);
        navigate("/addstory");
      })
      .catch((error) => {
        console.log(error.response.data.msg);
        setEmail("");
        setPassword("");
      });
  };
  return (
    <>
      <div
        className="container mt-5 p-3"
        style={{ backgroundColor: "#00000042" }}
      >
        <h1 className="my-3 text-dark text-center text-bold my-2 py-4">
          Login Here!
        </h1>
        <form>
          <div className="form-group my-3">
            <label for="exampleInputEmail1">Email address</label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group my-3">
            <label for="exampleInputPassword1">Password</label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>

          <button
            type="button"
            className="btn text-white my-3 px-5"
            style={{
              background: "#594747",
              border: "#00000042",
            }}
            onClick={login}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
