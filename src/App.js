import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import "./App.css";
import axios from "axios";
import { Credentials } from "./Credentials";

function App() {
  const [token, setToken] = useState("");
  const spotify = Credentials();
  useEffect(() => {
    console.log("getting token");
    console.log("id: " + process.env.REACT_APP_CLIENT_ID);
    console.log("secret: " + process.env.REACT_APP_CLIENT_SECRET);
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + btoa(spotify.ClientId + ":" + spotify.ClientSecret),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    }).then((tokenResponse) => {
      setToken("Bearer " + tokenResponse.data.access_token);
      console.log("token set : " + token);
    });
  }, [spotify.ClientId, spotify.ClientSecret]);

  return <>{<Dashboard token={token} />}</>;
}

export default App;
