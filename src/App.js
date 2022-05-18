import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import "./App.css";
import axios from "axios";

function App() {
  const [auth, setAuth] = useState({ token: "", type: "noScope" });

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
        });
      } catch (e) {
        console.log(e);
      }
    };
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let urlToken = "";
    if (urlParams.has("code")) {
      urlToken = urlParams.get("code");
      console.log("Setting withScope token: " + urlToken);
      setAuth({ token: "Bearer " + urlToken, type: "withScope" });
      window.history.pushState({}, document.title, "/");
      console.log("Storing: " + auth.token);
    } else if (auth.token == "") {
      getNoScopeToken();
    }
  }, []);

  return (
    <>
      {auth.token !== "" ? <Dashboard auth={auth} setAuth={setAuth} /> : null}
    </>
  );
}

export default App;
