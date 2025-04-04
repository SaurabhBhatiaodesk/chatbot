import React from "react";

const ApiSelector = ({ selectedApi, setSelectedApi }) => {
  return (
    <div className="main__popup">
      <div className="header">
        <h2>Chat with us</h2>
       <p className="text-short">👋 Hi, message us with any questions. We're happy to help!</p>
      </div>
    <div className="api-selector">

      <div>
        <label>
          <input
            type="radio"
            value="query"
            name="radio" 
            onChange={(e) => setSelectedApi(e.target.value)} // ✅ Radio button change handle
          />
         Chat Now
        </label>
      </div>
      {/* <div>
        <label>
          <input
            type="radio"
            value="other"
            name="radio" 
            onChange={(e) => setSelectedApi(e.target.value)}
          />
          Other
        </label>
      </div> */}
      </div>
    </div>
  );
};

export default ApiSelector;
