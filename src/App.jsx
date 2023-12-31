import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ResponsiveAppBar from "./AppBar.jsx";
import LoginPage from "./LoginPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    console.log("User has logged in");
    setIsLoggedIn(true);
  };

  useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn);
  }, [isLoggedIn]);

  console.log("isLoggedIn (initial):", isLoggedIn);

  return (
    <Router>
      <div>
        {isLoggedIn && <ResponsiveAppBar />}
        {!isLoggedIn && <LoginPage onLogin={handleLogin} />}
      </div>
    </Router>
  );
}

export default App;
