import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function StravaAuthHandler() {
  const location = useLocation();
  const [authStatus, setAuthStatus] = useState("pending");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");

    if (code) {
      // Send code to the backend
      fetch("http://localhost:3001/api/exchange_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Token exchange response:", data);
          setAuthStatus("success");
          console.log("Authentication was successful"); // Add this line
          // Handle the response (store access token, user info, etc.)
        })
        .catch((error) => {
          console.error("Error in token exchange:", error);
          setAuthStatus("error");
        });
    } else {
      console.log("Authorization was not successful.");
      setAuthStatus("error");
      // Handle errors or denial
    }
  }, [location]);

  return (
    <div>
      {authStatus === "pending" && <p>Handling Strava Authentication...</p>}
      {authStatus === "success" && <p>Authentication Successful!</p>}
      {authStatus === "error" && (
        <p>Authentication Failed. Please try again.</p>
      )}
    </div>
  );
}

export default StravaAuthHandler;
