import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "./contexts/UserContext.jsx";

function StravaAuthHandler({ onLogin }) {
  const location = useLocation();
  const [authStatus, setAuthStatus] = useState("pending");
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");

    if (!code) {
      console.log("No authorization code found in URL.");
      setAuthStatus("error");
      return;
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
        setUser(data.userProfile); // Assuming userProfile contains the user data
        localStorage.setItem("user", JSON.stringify(data.userProfile));
        setAuthStatus("success");
        console.log("Authentication was successful");
        if (typeof onLogin === "function") {
          onLogin(); // Call onLogin if it's a function
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
      {authStatus === "success" && user && (
        <div>
          <p>Authentication Successful!</p>
          <p>
            Welcome, {user.firstname} {user.lastname}
          </p>
          {/* Display other user details as needed */}
        </div>
      )}
      {authStatus === "error" && (
        <p>Authentication Failed. Please check the console for more details.</p>
      )}
    </div>
  );
}

export default StravaAuthHandler;
