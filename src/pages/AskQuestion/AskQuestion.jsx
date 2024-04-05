import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
import "./AskQuestion.css";
import { askQuestion } from "../../actions/question";

const AskQuestion = () => {
  const User = useSelector((state) => state.currentUserReducer);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState("");
  // const [selectedPlan, setSelectedPlan] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      askQuestion(
        {
          questionTitle,
          questionBody,
          questionTags,
          userPosted: User.result.name,
          userId: User?.result?._id,
        },
        navigate
      )
    );
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuestionBody(questionBody + "\n");
    }
  };

  // const handlePlanChange = (e) => {
  //   setSelectedPlan(e.target.value);
  //   makePayment(e.target.value, User.result._id);
  // };

  // const makePayment = async (data, id) => {
  //   const stripe = await loadStripe(
  //     "pk_test_51P0KfySGisJCwj2ATJUL2AnLt86vMLnDi4lfFVCzt1F8flYU8NF8CX5QguAGlkbAGnfa677yYKfTRd9ES1cnxRte00nTKdVpVx"
  //   );
  //   const body = { plan: data, _id: id };
  //   const headers = {
  //     "Content-Type": "application/json",
  //   };

  //   const response = await fetch("http://localhost:5000/user/subscription", {
  //     method: "POST",
  //     headers: headers,
  //     body: JSON.stringify(body),
  //   });

  //   const session = await response.json();
  //   console.log("session", session);
  //   const result = stripe.redirectToCheckout({
  //     sessionId: session.id,
  //   });

  //   if (result.error) {
  //     console.log(result.error);
  //   }
  // };
  const currentTheme = useSelector((state) => state.themeReducer);

  return (
    <div className={`ask-question ${currentTheme.theme}`}>
      <div className="ask-ques-container">
        <h1>Ask a public Question</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-quse-title">
              <h4>Title</h4>
              <p>
                Be specific and imagine you’re asking a question to another
                person
              </p>
              <input
                type="text"
                onChange={(e) => {
                  setQuestionTitle(e.target.value);
                }}
                id="ask-ques-title"
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
              />
            </label>
            <label htmlFor="ask-quse-body">
              <h4>Body</h4>
              <p>
                Include all the information someone would need to answer your
                question
              </p>
              <textarea
                type="text"
                onChange={(e) => {
                  setQuestionBody(e.target.value);
                }}
                onKeyDown={handleEnter}
                id="ask-ques-body"
              ></textarea>
            </label>
            <label htmlFor="ask-quse-tags">
              <h4>Tags</h4>
              <p>Add up to 5 tags to describe what your question is about</p>
              <input
                type="text"
                onChange={(e) => {
                  setQuestionTags(e.target.value.split(" "));
                }}
                id="ask-ques-tags"
                placeholder="e.g. (xml typescript wordpress)"
              />
            </label>
            <input
              type="submit"
              value="Review your Question"
              className="review-btn"
            />
          </div>
          {/* <div className="row">
            <h2>Choose a Plan:</h2>
            <label>
              <input
                type="radio"
                value="gold"
                checked={selectedPlan === "gold"}
                onChange={(e) => handlePlanChange(e)}
              />
              Gold Plan
            </label>
            <label>
              <input
                type="radio"
                value="silver"
                checked={selectedPlan === "silver"}
                onChange={(e) => handlePlanChange(e)}
              />
              Silver Plan
            </label>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
