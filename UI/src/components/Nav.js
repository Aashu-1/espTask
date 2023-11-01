import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [nav, setNav] = useState();
  const [doRender, setDoRender] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token") == undefined) {
      setNav(
        <>
          {setDoRender("CHANGED")}
          <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
              <div className="container-fluid">
                <a className="navbar-brand" style={{ fontSize: 26 }}>
                  StoryMaker.com
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        aria-current="page"
                        style={{ cursor: "pointer" }}
                        to={"/"}
                      >
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        style={{ cursor: "pointer" }}
                        to={"register"}
                      >
                        Register
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        style={{ cursor: "pointer" }}
                        to={"login"}
                      >
                        Login
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </>
      );
    } else {
      setNav(
        <>
          {setDoRender("CHANGED")}
          <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
              <div className="container-fluid">
                <a className="navbar-brand">StoryMaker.com</a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        aria-current="page"
                        style={{ cursor: "pointer" }}
                        to={"addstory"}
                      >
                        Add Story
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        aria-current="page"
                        style={{ cursor: "pointer" }}
                        to={"viewstory"}
                      >
                        View Your Story
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        style={{ cursor: "pointer" }}
                        to={"manipulatestory"}
                      >
                        Manipulate Story
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        style={{ cursor: "pointer" }}
                        to={"logout"}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </>
      );
    }
  });
  return <>{nav}</>;
}

export default Navbar;
