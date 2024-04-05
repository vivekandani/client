import React from "react";
import { useSelector } from "react-redux";

import "../../App.css";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import HomeMainbar from "../../components/HomeMainbar/HomeMainbar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";

const Questions = ({ slideIn, handleSlideIn }) => {
  const currentTheme = useSelector((state) => state.themeReducer);

  return (
    <div className={`home-container-1 ${currentTheme.theme}`}>
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <div className="home-container-2">
        <HomeMainbar />
        <RightSidebar />
      </div>
    </div>
  );
};

export default Questions;
