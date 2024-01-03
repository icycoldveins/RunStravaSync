import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StravaBar from "./StravaBar";
import StravaLoginButton from "./StravaLoginButton";

const App = () => {
  return (
    <Router>
      <div>
        <StravaBar />
        <StravaLoginButton/>
      </div>
    </Router>
  );
};

export default App;
