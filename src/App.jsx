import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ResponsiveAppBar from "./AppBar.jsx";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!sessionStorage.getItem("isLoggedIn")
  );
  const handleLogin = () => {
    console.log("User has logged in");
    setIsLoggedIn(true);
    sessionStorage.setItem("isLoggedIn", "true");
  };

  useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn);
  }, [isLoggedIn]);

  console.log("isLoggedIn (initial):", isLoggedIn);

  return (
    <Router>
      <UserProvider>
        <div>
          {isLoggedIn && <ResponsiveAppBar />}
          {isLoggedIn ? <HomePage /> : <LoginPage onLogin={handleLogin} />}
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
