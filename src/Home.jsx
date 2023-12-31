import React from "react";
import Button from "@mui/material/Button"; // Importing Button from Material-UI

const Home = () => {
  const CLIENT_ID = "Your_Strava_Client_ID";
  const REDIRECT_URI = encodeURIComponent("Your_Redirect_URI_After_Login");
  const STRAVA_AUTH_URL = `http://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=read,activity:read&approval_prompt=force`;

  const handleLogin = () => {
    window.location.href = STRAVA_AUTH_URL;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Welcome to RunnerSync</h1>
      {/* Using Material-UI Button with styling */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Log in with Strava
      </Button>
    </div>
  );
};

export default Home;
