import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import StravaAuthHandler from "./StravaAuthHandler";
import AppBar from "./AppBar";
import ErrorBoundary from "./ErrorBoundary";

function HomePageWrapper() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  return <HomePage />;
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppBar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePageWrapper />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
