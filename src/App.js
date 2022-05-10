import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import "./App.css";

function App() {
  const [token, setToken] = useState("");
  useEffect(() => {
    const callToken = async () => {
      try {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let urlToken = "";
        if (urlParams.has("code")) {
          urlToken = urlParams.get("code");
          setToken("Bearer " + urlToken);
          window.history.pushState({}, document.title, "/");
          console.log("Storing: " + token);
        }
        if (token == "" && urlToken == "") {
          window.location.replace("http://localhost:5000/auth/login");
        }
      } catch (e) {
        console.log(e);
      }
    };
    callToken();
  }, [process.env.REACT_APP_CLIENT_ID, process.env.REACT_APP_CLIENT_SECRET]);

  return <>{token !== "" ? <Dashboard token={token} /> : null}</>;
}

export default App;
