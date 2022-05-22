import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import "./App.css";
import axios from "axios";

function App() {
  const [auth, setAuth] = useState({
    token: "",
    type: "noScope",
    expiry: null,
  });
  const [expiry, setExpiry] = useState(null);

  useEffect(() => {
    const getNoScopeToken = async () => {
      try {
        const tokenResponse = await axios(
          "https://accounts.spotify.com/api/token",
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization:
                "Basic " +
                btoa(
                  process.env.REACT_APP_CLIENT_ID +
                    ":" +
                    process.env.REACT_APP_CLIENT_SECRET
                ),
            },
            data: "grant_type=client_credentials",
            method: "POST",
          }
        );
        console.log(
          "Setting noScope token: " + tokenResponse.data.access_token
        );
        setAuth({
          token: "Bearer " + tokenResponse.data.access_token,
          type: "noScope",
          expiry: null,
        });
      } catch (e) {
        console.log(e);
      }
    };
    const timeNow = new Date();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let urlToken = "";
    // if code in url set everything up
    if (urlParams.has("code")) {
      urlToken = urlParams.get("code");
      console.log("Setting withScope token: " + urlToken);
      // expires in 50 mins (spot api allows 60 mins)
      let expiryDate = timeNow.setSeconds(timeNow.getSeconds() + 3000);
      setAuth({
        token: "Bearer " + urlToken,
        type: "withScope",
        expiry: expiryDate,
      });
      localStorage.setItem("token", "Bearer " + urlToken);
      localStorage.setItem("expiry", expiryDate);
      window.history.pushState({}, document.title, "/");
      console.log("Storing: " + auth.token);
    }
    // if no token with scope set but one available in local storage then set states
    else if (
      auth.token == "" &&
      localStorage.getItem("token") &&
      timeNow.getTime() < localStorage.getItem("expiry")
    ) {
      setAuth({
        token: localStorage.getItem("token"),
        type: "withScope",
        expiry: localStorage.getItem("expiry"),
      });
    }
    // if there is a token in local token that has expired, delete states and local storage
    else if (
      localStorage.getItem("token") &&
      timeNow.getTime() >= auth.expiryDate &&
      auth.type == "noScope"
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("expiry");
      getNoScopeToken();
    }
    // else get a normal no scope token
    else if (auth.token == "") {
      getNoScopeToken();
    }
  });

  return (
    <>
      {auth.token !== "" ? <Dashboard auth={auth} setAuth={setAuth} /> : null}
    </>
  );
}

export default App;
