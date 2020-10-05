import React, { useState, useEffect } from "react";

function App() {
  const [account, setCount] = useState("logged out");

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You are ${account}`;
  });

  return (
    <div>
      <p>You are {account}</p>
      <button
        onClick={() =>
          account === "logged out"
            ? setCount("logged in")
            : setCount("logged out")
        }
      >
        click me
      </button>
    </div>
  );
}

export default App;
