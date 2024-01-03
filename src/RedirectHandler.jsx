import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StravaRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      // Send the code to your backend
      fetch("/api/exchange_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Store the access token and user data in your app's state
          // You can also navigate to another page if needed
          navigate("/dashboard"); // Example navigation to a dashboard page
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      // Navigate to login page if there's no code
      navigate("/login");
    }
  }, [navigate]);

  return null;
};

export default StravaRedirectHandler;
