import React from "react";
import ResponsiveAppBar from "./AppBar.jsx"; // Import the ResponsiveAppBar component
import StravaLoginButton from "./StravaLoginButton.jsx";
function App() {
  return (
    <div>
      <ResponsiveAppBar />
      <h1>Welcome to My App</h1>
      <StravaLoginButton />
    </div>
  );
}
export default App;
