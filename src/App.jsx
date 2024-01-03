import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StravaBar from "./StravaBar";
import StravaLoginButton from "./StravaLoginButton";
import StravaRedirectHandler from "./RedirectHandler";

const App = () => {
  return (
    <Router>
      <div>
        <StravaBar />
        <StravaLoginButton />
        <Routes>
          <Route path="/" element={<StravaRedirectHandler />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
