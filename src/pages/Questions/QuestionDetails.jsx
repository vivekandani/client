import React, { useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import Avatar from "../../components/Avatar/Avatar";
import DisplayAnswer from "./DisplayAnswer";
import "./Questions.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteQuestion,
  postAnswer,
  voteQuestion,
} from "../../actions/question";
import moment from "moment";
import copy from "copy-to-clipboard";

function QuestionDetails() {
  const { id } = useParams();
  const Navigate = useNavigate();

  const questionsList = useSelector((state) => state.questionsReducer);
  const [Answer, setAnswer] = useState("");
  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  const location = useLocation();
  const url = "https://stack-overflow-clone-ws.netlify.app";
  const handlePostAnswer = (e, answerLength) => {
    e.preventDefault();
    if (User === null) {
      alert("Login or Signup to answer a Question");
      Navigate("/Auth");
    } else {
      if (Answer === "") {
        alert("Enter an Answer before submitting");
      } else {
        dispatch(
          postAnswer({
            id,
            noOfAnswers: answerLength + 1,
            answerBody: Answer,
            userAnswered: User.result.name,
            userId: User.result._id,
          })
        );
        setAnswer("");
      }
    }
  };

  const handleShare = () => {
    copy(url + location.pathname);
    alert("Copied Url :" + url + location.pathname);
  };

  const handleDelete = () => {
    dispatch(deleteQuestion(id, Navigate));
  };

  const handleUpVote = () => {
    dispatch(voteQuestion(id, "upVote", User.result._id));
  };
  const handleDownVote = () => {
    dispatch(voteQuestion(id, "downVote", User.result._id));
  };
  return (
    <div className="question-details-page ">
      {questionsList.data === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {questionsList.data
            ?.filter((question) => question._id === id)
            .map((question) => (
              <div key={question._id}>
                <section className="question-details-container">
                  <h1>{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <img
                        src={upvote}
                        alt=""
                        width={18}
                        onClick={handleUpVote}
                      />
                      <p>{question.upVote.length - question.downVote.length}</p>
                      <img
                        src={downvote}
                        alt=""
                        width={18}
                        onClick={handleDownVote}
                      />
                    </div>
                    <div style={{ width: "100%" }}>
                      <p className="question-body">{question.questionBody}</p>
                      <div className="question-detail-tags">
                        {question.questionTags.map((tag) => (
                          <p key={tag}>{tag}</p>
                        ))}
                      </div>
                      <div className="question-actions-user">
                        <div>
                          <button type="button" onClick={handleShare}>
                            Share
                          </button>
                          {User?.result?._id === question?.userId && (
                            <button type="button" onClick={handleDelete}>
                              Delete
                            </button>
                          )}
                        </div>
                        <div>
                          <p>asked {moment(question.askedOn).fromNow()}</p>
                          <Link
                            to={`/Users/${question?.userId}`}
                            className="user-link"
                            style={{ color: "#0086d8" }}
                          >
                            <Avatar
                              backgroundColor="orange"
                              px="8px"
                              py="5px"
                              style={{ color: "#0086d8" }}
                            >
                              {" "}
                              {question.userPosted.charAt(0).toUpperCase()}{" "}
                            </Avatar>
                            <div>{question.userPosted}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {question?.noOfAnswers !== 0 && (
                  <section>
                    <h3>{question.noOfAnswers} Answers</h3>
                    <DisplayAnswer
                      key={question._id}
                      question={question}
                      handleShare={handleShare}
                    />
                  </section>
                )}
                <section className="post-ans-container">
                  <h3 className=""> Your Answer</h3>

                  <form
                    onSubmit={(e) => {
                      handlePostAnswer(e, question.answer.length);
                    }}
                  >
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      onChange={(e) => setAnswer(e.target.value)}
                    ></textarea>
                    <input
                      type="submit"
                      className="post-ans-btn"
                      value={"Post Your Answer"}
                    />
                  </form>
                  <p>
                    Browse Other Question tagged
                    {question.questionTags.map((tag) => (
                      <Link to={"/Tags"} key={tag} className="ans-tags">
                        {" "}
                        {tag}{" "}
                      </Link>
                    ))}{" "}
                    or
                    {
                      <Link
                        to={"/AskQuestion"}
                        style={{ textDecoration: "none", color: "#009dff" }}
                      >
                        ask your own question.
                      </Link>
                    }
                  </p>
                </section>
              </div>
            ))}
        </>
      )}
    </div>
  );
}

export default QuestionDetails;
