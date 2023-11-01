import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function AddNewSentence() {
  const navigate = useNavigate();
  const [newSentence, setNewSentence] = useState();

  const params = useParams();

  const sentenceDetails = {
    sentences: newSentence,
    storyID: params.id,
    userID: localStorage.getItem("id"),
  };

  function addSentence() {
    axios
      .post("http://localhost:3001/sentence/save", sentenceDetails, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log(response);
        alert("sentence has been added successfully");
        navigate("/manipulatestory");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <div className="container">
        <label for="exampleFormControlTextarea1" className="mt-5">
          Add Your New Sentence Here!:
        </label>
        <div class="form-group">
          <textarea
            className="form-control bordered"
            id="exampleFormControlTextarea1"
            rows="3"
            style={{
              border: "2px solid black",
            }}
            autoFocus
            value={newSentence}
            onChange={(e) => {
              setNewSentence(e.target.value);
            }}
          ></textarea>
          <button
            type="button"
            className="btn btn-primary my-3"
            onClick={addSentence}
          >
            Add Sentence
          </button>
        </div>
      </div>
    </>
  );
}

export default AddNewSentence;
