import React, { useState } from "react";
import Chatbot from "./components/chatbot";
import ApiSelector from "./components/ApiSelector";
import axios from "axios";
import "./App.css";
 
const App = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [selectedApi, setSelectedApi] = useState("");
  const [showApiSelector, setShowApiSelector] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
 
 
  const handleSearch = async () => {
    console.log("testindfen");
    try {
      let payload;
      let apiUrl;
 
      if (selectedApi === "query" || selectedApi === "other") {
        payload = {
          user_query: query, // ✅ set query as user_query
          session_id: "test-session-001", // ✅ added session_id
        };
        apiUrl = "https://chatbot.base2brand.com/rag-qa"; // ✅ updated API URL
      } else {
        return "Please select an API.";
      }
      console.log("payloadpayloadpayload>>", payload, apiUrl);
      const res = await axios.post(apiUrl, payload);
      const apiResponse =
        res.data.answer || res.data.summary || "No response from the API.";
 
      setResponse(apiResponse);
      console.log("resres", res);
      return apiResponse;
    } catch (error) {
      console.error("API Error:::", error);
      setResponse("Error fetching data");
      return "Error fetching data";
    }
  };
 
  // ✅ Radio button change pr chatbot ko open karo
  const handleApiChange = (api) => {
    setSelectedApi(api);
    setIsChatOpen(true); // Chatbot ko open karo
  };
  const handleIconClick = () => {
    if (isChatOpen) {
      // ✅ Agar chatbot open hai, toh close karo
      setIsChatOpen(false);
      setShowApiSelector(false);
    } else if (showApiSelector) {
      // ✅ Agar sirf radio buttons dikh rahe hain toh close karo
      setShowApiSelector(false);
    } else {
      // ✅ Kuch bhi open nahi toh radio buttons show karo
      setShowApiSelector(true);
    }
  };
  const handleGoBack = () => {
    setIsChatOpen(false);
    setShowApiSelector(true); // ✅ Radio ko open karo
  };
  return (
    <div className="app-container">
      {/* ✅ Chat icon ko tab tak dikhana jab tak chatbot open na ho */}
 
      <div className="chat-icon" onClick={handleIconClick}>
        {isChatOpen || showApiSelector ? "✖" : "💬"}
      </div>
 
      {/* ✅ Radio button selector ko icon pe click karte hi show karo */}
      {showApiSelector && !isChatOpen && (
        <div className="api-selector-wrapper chatbot-wrapper-selector">
          <ApiSelector
            selectedApi={selectedApi}
            setSelectedApi={handleApiChange} // ✅ Updated handler
          />
        </div>
      )}
 
      {/* ✅ Jab radio button select ho tab chatbot dikhao */}
      {isChatOpen && (
        <div className="chatbot-wrapper">
          <Chatbot
            query={query}
            setQuery={setQuery}
            response={response}
            handleSearch={handleSearch}
            goBack={handleGoBack}
          />
        </div>
      )}
    </div>
  );
};
 
export default App;
 
