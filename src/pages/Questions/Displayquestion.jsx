import React from "react";
import "../../App.css";
import { useSelector } from "react-redux";

import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import QuestionDetails from "./QuestionDetails";
import "./Questions.css";

const Displayquestion = ({ slideIn, handleSlideIn }) => {
  const currentTheme = useSelector((state) => state.themeReducer);

  return (
    <div className={`home-container-1 ${currentTheme.theme}`}>
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <div className="home-container-2">
        <QuestionDetails />
        <RightSidebar />
      </div>
    </div>
  );
};

export default Displayquestion;
