import React, { useState } from "react";
import "./OTPPopup.css";

const OTPPopup = ({ isOpen, onClose, onSubmit }) => {
  const [otp, setOTP] = useState("");

  const handleChange = (e) => {
    setOTP(e.target.value);
  };

  const handleSubmit = () => {
    if (otp.length === 4) {
      onSubmit(otp);
      setOTP("");
    } else {
      alert("Please enter a valid OTP.");
    }
  };

  return (
    <div className={`otp-popup ${isOpen ? "open" : ""}`}>
      <div className="otp-popup-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h3>Enter OTP Received on Email to Start Chatboat</h3>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={handleChange}
          className="otp-input"
        />
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default OTPPopup;
