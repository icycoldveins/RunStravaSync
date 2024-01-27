import React from "react";

const StravaLoginButton = () => {
  const handleLogin = () => {
    const clientId = import.meta.env.VITE_STRAVA_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_STRAVA_REDIRECT_URI;
    const responseType = "code";
    const scope = "read,activity:read_all,profile:read_all";
    const authUrl = `http://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
    
    window.location.href = authUrl;
  };

  return <button onClick={handleLogin}>Login with Strava</button>;
};

export default StravaLoginButton;
