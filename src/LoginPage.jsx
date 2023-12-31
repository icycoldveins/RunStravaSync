import React from "react";
import StravaLoginButton from "./StravaLoginButton.jsx";
import StravaAuthHandler from "./StravaAuthHandler.jsx";

function LoginPage({ onLogin }) {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <StravaLoginButton />
      <StravaAuthHandler onLogin={onLogin} />
    </div>
  );
}

export default LoginPage;
