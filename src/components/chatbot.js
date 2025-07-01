import React, { useState, useEffect, useRef } from "react";
 
const Chatbot = ({ query, setQuery, response, handleSearch, goBack }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatWindowRef = useRef(null);
  const isUserScrollingRef = useRef(false);
 
  // ✅ Send Message and Handle API
  const handleSend = async () => {
    if (!query.trim()) return;
 
    const newMessages = [...messages, { text: query, type: "question" }];
    setMessages(newMessages);
    setQuery("");
    setIsTyping(true);
 
    // ✅ API Response
    const apiResponse = await handleSearch();
    setIsTyping(false);
 
    if (apiResponse) {
      setMessages([...newMessages, { text: apiResponse, type: "answer" }]);
    }
  };
 
  // ✅ Scroll to Bottom (When Typing Only)
  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };
  console.log("messagesmessagesmessagesmessages,messages", messages);
  // ✅ Scroll on Typing Only
  useEffect(() => {
    scrollToBottom();
  }, [query]);
 
  // ✅ Detect User Manual Scroll
  useEffect(() => {
    const chatWindow = chatWindowRef.current;
 
    const handleScroll = () => {
      if (chatWindow) {
        isUserScrollingRef.current =
          chatWindow.scrollTop + chatWindow.clientHeight <
          chatWindow.scrollHeight - 10;
      }
    };
 
    if (chatWindow) {
      chatWindow.addEventListener("scroll", handleScroll);
    }
 
    return () => {
      if (chatWindow) {
        chatWindow.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
 
  // ✅ Handle Enter Press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };
 
  // ✅ Update Input and Trigger Scroll
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };
 
  return (
    <div className="chatbot-container">
      <div className="chatbot_header">
        <a onClick={goBack} className="back-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="back-icon"
          >
            <path d="M19 12H5"></path>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </a>
        <h2>Chatbot</h2>
      </div>
 
      {/* ✅ Chat Window */}
      <div className="chat-window" ref={chatWindowRef}>
        {messages?.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.type === "question" ? "user" : "bot"}`}
          >
            {msg.type === "answer" ? (
              <div dangerouslySetInnerHTML={{ __html: msg.text }} />
            ) : (
              msg.text
            )}
          </div>
        ))}
 
        {isTyping && (
          <div className="message bot typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>
 
      {/* ✅ Input Section */}
      <form onSubmit={(e) => e.preventDefault()} className="input-container">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="input__chat"
          placeholder="Type your message..."
        />
        <button type="button" onClick={handleSend}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="send-icon"
          >
            <path d="M22 2L11 13"></path>
            <path d="M22 2L15 22 11 13 2 9z"></path>
          </svg>
        </button>
      </form>
    </div>
  );
};
 
export default Chatbot;
