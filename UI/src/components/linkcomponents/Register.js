import React from "react";
import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function Register() {
  //DEFINING NAVIGATE

  const navigate = useNavigate();

  //STATES DEFINATION
  //---------------------------------------------------------------------------------------
  const [name, setName] = useState("");
  const [nameError, setnameError] = useState();
  const [email, setEmail] = useState("");
  const [emailError, setemailError] = useState();

  const [password, setPassword] = useState("");
  const [passwordError, setpasswordError] = useState();

  //-------------------------------------------------------------------------------------------------------
  //FORM SUBMIT VALIDATION VARIABLES
  var isValidEmail = true;
  var isValidPassword = true;

  var isValidName = true;

  // NAME VALIDATION
  //--------------------------------------------------------------------

  const isNameValid = () => {
    const regUser = /^[A-Z][0-9a-zA-Z_]{2,30}/;
    const testUsername = regUser.test(name);
    if (testUsername) {
      setnameError("");
      isValidName = true;
    } else if (name === "") {
      setnameError("please fill the required field");
    } else {
      setnameError("first varter must be capital");
      isValidName = false;
    }
  };

  // EMAIL VALIDATION
  //--------------------------------------------------------------------

  const isEmailValid = () => {
    const regEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,3}/;
    const testEmail = regEmail.test(email);
    if (testEmail) {
      isValidEmail = true;
      setemailError("");
    } else if (email === "") {
      setemailError("please fill the required field");
    } else {
      setemailError("please enter a valid email");
      isValidEmail = false;
    }
  };

  //BUTTON SUBMIT VALIDATION
  //---------------------------------------------------------------------------

  const validateRegister = () => {
    if (name === "") {
      setnameError("please fill the entry");
      isValidName = false;
    }
    if (email === "") {
      setemailError("please enter your email");
      isValidEmail = false;
    }
    if (password === "") {
      setpasswordError("please enter your password");
      isValidPassword = false;
    }

    //if all fields are filled then only submit the form
    if (isValidEmail && isValidName && isValidPassword) {
      //OBJECT FOR SENDING TO THE SERVER
      var userDetails = {
        name: name,
        email: email,
        password: password,
      };
      //----------------------------------------------------------------------------
      // SENDING DATA TO THE SERVER USING AXIOS WEB SERVICE
      axios
        .post("http://localhost:3001/user/save", userDetails)
        .then(() => {
          swal(
            "Congratulations!",
            "Your are registered successfully",
            "success"
          );

          setName("");
          setEmail("");
          setPassword("");
          navigate("/login");
        })
        .catch((err) => {
          if (err.response.data.status === false) {
            alert("invalid registration");
          }
        });
      //----------------------------------------------------------------------------
      console.log(userDetails);
    } else {
      console.log(isValidEmail);
      console.log(isValidName);
      console.log(isValidPassword);

      alert("please fill the required credentials");
    }
  };
  return (
    <div>
      <div>
        {/* Contact Start */}
        <div className="container-xxl py-5 ">
          <div className="container">
            <div
              className="row d-flex justify-content-center align-items-center "
              style={{ backgroundColor: "#00000042" }}
            >
              <div className="col-md-6 p-3">
                <h1 className="text-center my-2">Register Here!</h1>
                <div className="wow fadeInUp" data-wow-delay="0.2s">
                  <form>
                    <div className="row g-3 mt-3">
                      <div className="col-md-11">
                        <div className="form-floating">
                          {/* //NAME INPUT FIELD---------------------- */}
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                            onBlur={isNameValid}
                          />
                          <label htmlFor="name">Your Name</label>
                        </div>

                        <span
                          className="text-danger mx-2"
                          style={{ fontSize: 13 }}
                        >
                          {nameError}
                        </span>
                      </div>
                      <div className="col-md-11">
                        <div className="form-floating">
                          {/* //EMAIL INPUT FIELD---------------------- */}
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                            onBlur={isEmailValid}
                          />
                          <label htmlFor="email">Your Email</label>
                        </div>
                        <span
                          className="text-danger mx-2"
                          style={{ fontSize: 13 }}
                        >
                          {emailError}
                        </span>
                      </div>

                      <div className="col-md-11">
                        <div className="form-floating">
                          {/* //PASSWORD INPUT FIELD---------------------- */}
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                          <label htmlFor="password">Password</label>
                        </div>
                        <span
                          className="text-danger mx-2"
                          style={{ fontSize: 13 }}
                        >
                          {passwordError}
                        </span>
                      </div>
                      <div className="col-md-4">
                        <div className="form-floating">
                          {/* //BUTTON INPUT FIELD---------------------- */}
                          <button
                            className="btn text-white w-100 py-3"
                            style={{
                              background: "#594747",
                              border: "#00000042",
                            }}
                            type="button"
                            onClick={validateRegister}
                          >
                            Register Yourself
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact End */}
    </div>
  );
}

export default Register;
