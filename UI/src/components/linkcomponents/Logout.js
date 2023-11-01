import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Logout</h2>
                <p className="card-text">Are you sure you want to log out?</p>
                <form method="post">
                  <button
                    type="button"
                    onClick={logout}
                    className="btn text-white my-3 px-5"
                    style={{
                      background: "#594747",
                      border: "#00000042",
                    }}
                  >
                    Logout
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Logout;
