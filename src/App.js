import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import "./App.css";
import axios from "axios";
import { Credentials } from "./Credentials";

function App() {
  const [token, setToken] = useState("");
  const [gettingToken, setGettingToken] = useState(true);
  const spotify = Credentials();
  useEffect(async () => {
    console.log("getting token");
    console.log("id: " + process.env.REACT_APP_CLIENT_ID);
    console.log("secret: " + process.env.REACT_APP_CLIENT_SECRET);
    const callToken = async () => {
      const tokenResponse = await axios(
        "https://accounts.spotify.com/api/token",
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " + btoa(spotify.ClientId + ":" + spotify.ClientSecret),
          },
          data: "grant_type=client_credentials",
          method: "POST",
        }
      );
      setToken("Bearer " + tokenResponse.data.access_token);
      console.log("token set : " + token);
      setGettingToken(false);
    };
  }, [spotify.ClientId, spotify.ClientSecret]);

  return <>{!gettingToken ? <Dashboard token={token} /> : null}</>;
}

export default App;
