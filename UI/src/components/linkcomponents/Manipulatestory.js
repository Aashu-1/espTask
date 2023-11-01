import axios from "axios";
import React from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Manipulatestory() {
  const navigate = useNavigate();
  const [storyDetails, setStoryDetails] = useState([]);
  const [sentenceDetails, setSentenceDetails] = useState([]);
  console.log(sentenceDetails);
  //FETCHING THE DATA FROM THE DB --------------------------

  useEffect(() => {
    axios
      .get(`http://localhost:3001/story/fetch?`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setStoryDetails(response.data.storyDetails);
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
      <div className="container table-responsive">
        <u>
          <h2 className="text-center my-5">View All Users' Stories Here!</h2>
        </u>
        <table class="table table-bordered text-center">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Post by owner</th>
              <th scope="col">Comments by All Users</th>
              <th scope="col">Add your comments</th>
            </tr>
          </thead>
          <tbody>
            {storyDetails ? (
              storyDetails.map((items) => (
                <tr>
                  <th scope="row">{items.title}</th>
                  <td>
                    {items.sentences}
                    <br />
                    <br />
                    <span className={"text-success fw-bolder "}>
                      Posted by userID {items.owner}
                    </span>
                  </td>
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
                  <td></td>

                  {/* //COLUMN FOR MANIPULATING THE COMMENTS------------------------------------------------------------------------------------------ */}
                  <td>
                    {/* //Button for adding new sentences using sentence api----------------------------- */}
                    <button
                      type="button"
                      className="btn btn-primary my-2 bg-primary text-white"
                      onClick={() => {
                        navigate(
                          `/addnewsentence/${
                            items.sentences ? items.sentences : " "
                          }/${items._id}`
                        );
                      }}
                    >
                      Add new comments
                    </button>

                    {/* //Button for deleting the whole story -------------------------------------------------------- */}
                    <br />
                    <button
                      type="button"
                      className="my-2 btn btn-danger"
                      onClick={() => {
                        // PASSING SENTENCE WHICH HAS TO BE DELETE ON BUTTON CLICK-------------
                        const deleteStoryObj = {
                          data: {
                            _id: items._id,
                          },
                        };
                        //checking if the user who wants to delete the story is the owner of the story or not ------
                        if (
                          Number(localStorage.getItem("id")) === items.owner
                        ) {
                          // Sending req to the server for deleting the {sentence}----------------------
                          axios
                            .delete(
                              "http://localhost:3001/story/delete",
                              deleteStoryObj
                            )
                            .then((response) => {
                              swal(
                                "Successfully Deleted",
                                "Story has been deleted",
                                "success"
                              );
                              window.location.reload(true);
                            })
                            .catch((error) => {
                              console.log(error);
                            });
                        } else {
                          swal(
                            "Sorry!",
                            "You have no permission to delete someone's story",
                            "error"
                          );
                        }
                      }}
                    >
                      Delete Story
                    </button>

                    {/* //--------------------------------------------------------------------------------------------------- */}
                    <br />
                    <p style={{ fontSize: 12, paddingTop: 5 }}>
                      ( Only owner can delete the whole story )
                    </p>
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

export default Manipulatestory;
