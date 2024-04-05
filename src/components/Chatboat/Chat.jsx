import React from "react";
import { useState } from "react";
import * as api from "../../api";
import "./Chat.css";

const Chat = () => {
  const [newQuestion, setNewQuestion] = useState("");
  const [storedValues, setStoredValues] = useState([]);

  const askGPT = async (prompt) => {
    const response = await api.instance.post("/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    return response?.data?.choices[0]?.message;
  };

  const handleSubmit = async () => {
    const response = await askGPT(newQuestion);
    setStoredValues([
      {
        question: newQuestion,
        answer: response.content,
      },
      ...storedValues,
    ]);
    document.getElementById("questionInput").value = "";
  };

  const enterHandle = (e) => {
    setNewQuestion(e.target.value);
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <>
      <div className="chatbot">
        <div className="chatbot-messages">
          {storedValues.map((message, index) => (
            <div key={index}>
              <h5>{message?.question}</h5>
              <div className={`message`} style={{ textAlign: "end" }}>
                {message?.answer}
              </div>
            </div>
          ))}
        </div>
        <div className="chatbot-input">
          <input
            id="questionInput"
            type="text"
            name="message"
            placeholder="Type your message..."
            onChange={(e) => enterHandle(e)}
          />
          <button onClick={() => handleSubmit()}>Send</button>
        </div>
      </div>
    </>
  );
};

export default Chat;
