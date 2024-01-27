import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const StravaAuthRedirect = () => {
  const navigate = useNavigate();
  const { setUserActivities } = useContext(UserContext);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      exchangeToken(code);
    }
  }, []);

  const exchangeToken = async (code) => {
    const clientId = import.meta.env.VITE_STRAVA_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_STRAVA_CLIENT_SECRET;
    try {
      const response = await fetch("https://www.strava.com/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
          grant_type: "authorization_code",
        }),
      });
      const data = await response.json();
      if (data.access_token) {
        fetchUserData(data.access_token);
        fetchUserActivities(data.access_token);
      }
    } catch (error) {
      console.error("Error exchanging token:", error);
    }
  };

  const fetchUserData = async (accessToken) => {
    try {
      const response = await fetch("https://www.strava.com/api/v3/athlete", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userData = await response.json();
      console.log("User data:", userData); // Console output for debugging
      navigate("/user/profile", { state: { userData } });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchUserActivities = async (accessToken) => {
    try {
      const response = await fetch(
        "https://www.strava.com/api/v3/athlete/activities?type=Run",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const activitiesData = await response.json();
      console.log("Activities data:", activitiesData); // Console output for debugging
      setUserActivities(activitiesData); // Set the activities data in the context
    } catch (error) {
      console.error("Error fetching user activities:", error);
    }
  };

  return <div>Processing Strava authentication...</div>;
};

export default StravaAuthRedirect;
