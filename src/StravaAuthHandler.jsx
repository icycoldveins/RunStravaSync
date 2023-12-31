import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function StravaAuthHandler({ onLogin }) {
  const location = useLocation();
  const [authStatus, setAuthStatus] = useState("pending");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");

    if (!code) {
      console.log("No authorization code found in URL.");
      setAuthStatus("error");
      return; // Exit early if no code is found
    }

    console.log("Authorization code:", code);

    fetch("http://localhost:3001/api/exchange_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Token exchange response:", data);
        setAuthStatus("success");
        console.log("Authentication was successful");
        if (typeof onLogin === "function") {
          onLogin(); // Safely call onLogin if it's a function
        } else {
          console.error("onLogin callback is not a function");
        }
      })
      .catch((error) => {
        console.error("Error in token exchange or network error:", error);
        setAuthStatus("error");
      });
  }, [location, onLogin]);

  return (
    <div>
      {authStatus === "pending" && <p>Handling Strava Authentication...</p>}
      {authStatus === "success" && <p>Authentication Successful!</p>}
      {authStatus === "error" && (
        <p>Authentication Failed. Please check the console for more details.</p>
      )}
    </div>
  );
}

export default StravaAuthHandler;
