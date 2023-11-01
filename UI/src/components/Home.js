import React from "react";

function Home() {
  return (
    <>
      <div
        className="container-fluid"
        style={{ background: "#dee3e8", height: "100vh", bottom: 0 }}
      >
        <div className="row d-flex justify-content-center  ">
          <div className="col-md-4 d-flex justify-content-center align-items-center flex-column mt-5">
            <h1>Welcome to StoryMaker.com</h1>
            <p className="my-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione
              quaerat excepturi iure quibusdam blanditiis fugit quasi quisquam
              eligendi? Autem aliquid est deleniti earum necessitatibus minus
              cupiditate ullam distinctio magni nihil, odio sunt eius.
            </p>
          </div>
          <div className="col-md-6 mt-5">
            <div
              id="carouselExampleIndicators"
              class="carousel slide"
              data-ride="carousel"
            >
              <ol class="carousel-indicators">
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="0"
                  class="active"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="1"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="2"
                ></li>
              </ol>
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img
                    class="d-block w-100"
                    src="./assets/images/carousel-1.jpg"
                    alt="First slide"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
