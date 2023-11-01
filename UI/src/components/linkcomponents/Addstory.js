import axios from "axios";
import React from "react";
import { useState } from "react";

export default function Addstory() {
  const [title, setTitle] = useState("");
  const [sentence, setSentence] = useState("");

  //FUNCTION FOR HANDLING OR SAVING STORY DETAILS-------------------

  function handleStory() {
    //validation for empty values only-----------------
    if (!title || !sentence) {
      return false;
    }

    //details to be saved in the db

    const storyDetails = {
      title: title,
      sentences: sentence,
      owner: localStorage.getItem("id"),
    };

    //if not empty then add the story to the api-------

    axios
      .post("http://localhost:3001/story/save", storyDetails, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log(response);
        alert("story saved");
        setTitle("");
        setSentence("");
      })
      .catch((error) => {
        alert("already exists. please select another title", error);
        setTitle("");
        setSentence("");
      });
    // // Adding sentence to the sentence api-------

    // axios
    //   .post("http://localhost:3001/sentence/save", { sentences: sentence })
    //   .then((response) => {
    //     console.log(response);
    //     alert("sentence has been added successfully");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  return (
    <>
      <div className="container">
        <u>
          <h2 className="text-center my-3">Create Your Own Story</h2>
        </u>
        <div
          className="row my-3 d-flex justify-content-center align-items-center p-5"
          style={{ backgroundColor: "#00000042" }}
        >
          <div className="col-md-7">
            <form>
              <div class="form-group">
                <label for="title" className="my-2">
                  Title :
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="Enter Title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>

              <label for="exampleFormControlTextarea1" className="my-2">
                Sentence :
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                value={sentence}
                onChange={(e) => {
                  setSentence(e.target.value);
                }}
              ></textarea>

              <button
                type="button"
                className="btn btn-primary my-3"
                style={{ background: "#594747", border: "#00000042" }}
                onClick={handleStory}
              >
                Add story
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
