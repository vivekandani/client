import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./RightSidebar.css";
import Widget from "./Widget.jsx";
import WidgetTags from "./WidgetTags.jsx";
import { FaRocketchat } from "react-icons/fa";
import Chat from "../Chatboat/Chat.jsx";
import OTPPopup from "./OTPPopup.jsx";
import { OTPVerificationEmail } from "../../actions/users.js";
import { verifyOTP } from "../../actions/users.js";

function RightSidebar() {
  var User = useSelector((state) => state.currentUserReducer);
  const currentTheme = useSelector((state) => state.themeReducer);
  const userVerified = useSelector((state) => state.OTPReducer.userVerified);
  const [displayChatbot, setDisplayChatbot] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const handleChatBotDisplay = () => {
    if (userVerified === true) {
      setDisplayChatbot(!displayChatbot);
    } else {
      dispatch(
        OTPVerificationEmail({
          _id: User?.result?._id,
          email: User?.result?.email,
        })
      );
      handleOpenPopup();
    }
  };
  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubmitOTP = async (otp) => {
    dispatch(
      verifyOTP({
        userId: User?.result?._id,
        otp: otp,
      })
    );
    if (userVerified === true) {
      setDisplayChatbot(true);
      handleClosePopup();
    } else {
      handleClosePopup();
    }
  };
  return (
    <aside className={`right-sidebar ${currentTheme.theme}`}>
      <div className="btn-container">
        <FaRocketchat
          onClick={() => {
            if (User?.result?._id) {
              handleChatBotDisplay();
            }
          }}
          className="chat-icon"
          style={{ color: "#0098ff", fontSize: "50px" }}
        />
      </div>
      <div className="chatboat-container">
        {displayChatbot && userVerified ? <Chat className="chatbot" /> : ""}
        {showPopup ? (
          <OTPPopup
            isOpen={showPopup}
            onClose={handleClosePopup}
            onSubmit={handleSubmitOTP}
          />
        ) : (
          ""
        )}
      </div>
      <Widget />
      <WidgetTags />
    </aside>
  );
}

export default RightSidebar;
