import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

function Viewstory() {
  const [storyDetails, setStoryDetails] = useState([]);
  const [sentenceDetails, setSentenceDetails] = useState([]);
  //FETCHING THE DATA FROM THE DB BASED ON THE CURRENT USER--------------------------

  useEffect(() => {
    const currentUserId = localStorage.getItem("id");
    axios
      .get(`http://localhost:3001/story/fetch?owner=${currentUserId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        if (response) {
          setStoryDetails(response.data.storyDetails);
        } else {
        }
      })
      .then((error) => {
        console.log(error);
      });
  }, []);

  //FETCHING THE SENTENCES FROM THE DB----------------------
  useEffect(() => {
    axios
      .get(`http://localhost:3001/sentence/fetch?`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setSentenceDetails(response.data.sentenceDetails);
      })
      .then((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="container">
        <u>
          <h2 className="text-center my-4">View Your Stories Here!</h2>
        </u>

        <table class="table table-bordered text-center">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Sentences of the story</th>
              <th scope="col">Comments</th>
            </tr>
          </thead>
          <tbody>
            {storyDetails?.length > 0 && storyDetails ? (
              storyDetails.map((items) => (
                <tr key={items._id}>
                  <th scope="row">{items.title}</th>
                  <td>
                    {items.sentences}
                    <br />
                    <br />
                    <span className={"text-success fw-bolder "}>
                      Posted by userID {items.owner}
                    </span>
                  </td>

                  {/* //SECTION FOR SHOWING COMMENTS----------------------- */}
                  <td>
                    {sentenceDetails
                      ? sentenceDetails.map((sentences) =>
                          sentences.storyID === items._id ? (
                            <>
                              <tr className="d-flex justify-content-center align-items-center text-center flex-column py-2">
                                {/* DISLAYING THE COMMENTS WHICH HAS BEEN POSTED BY THE USERS---------------------------------------------- */}
                                <td className=" ">{sentences.sentences}</td>
                                <span
                                  style={{
                                    color: "green",
                                    fontWeight: "bolder",
                                    fontSize: 12,
                                  }}
                                >
                                  By (user {sentences.userID})
                                </span>

                                {/* //Button for deleting the sentence ----------------------------- */}
                                <button
                                  type="button"
                                  className="mt-1"
                                  onClick={() => {
                                    // PASSING SENTENCE WHICH HAS TO BE DELETE ON BUTTON CLICK-------------
                                    const deleteObj = {
                                      data: {
                                        storyID: items._id,
                                      },
                                    };

                                    if (
                                      Number(localStorage.getItem("id")) ===
                                      sentences.userID
                                    ) {
                                      // Sending req to the server for deleting the {sentence}----------------------
                                      axios
                                        .delete(
                                          "http://localhost:3001/sentence/delete",
                                          deleteObj
                                        )
                                        .then((response) => {
                                          alert("deleted successfully");
                                          window.location.reload(true);
                                        })
                                        .catch((error) => {
                                          console.log(error);
                                        });
                                    } else {
                                      alert(
                                        "You have no permission to delete this sentence"
                                      );
                                    }
                                  }}
                                >
                                  <i class="bi bi-trash-fill"></i>
                                </button>
                              </tr>

                              <hr />
                            </>
                          ) : null
                        )
                      : null}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td className="text-danger">
                  Story not found. please add one for view
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Viewstory;
