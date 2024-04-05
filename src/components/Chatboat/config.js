// import { createChatBotMessage } from "react-chatbot-kit";

// const config = {
//   initialMessages: [createChatBotMessage(`Hello world`)],
// };
const config = {
  botName: "YourBotName",
  lang: "en",
  customStyles: {
    // Define any custom styles here
  },
  initialMessages: [
    {
      id: 1,
      type: "text",
      content: "Hello! How can I assist you today?",
    },
  ],
};
export default config;
