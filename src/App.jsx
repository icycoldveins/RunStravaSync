import React from "react";
import ResponsiveAppBar from "./AppBar.jsx"; // Import the ResponsiveAppBar component
import Home from "./Home.jsx";
import { HomeMax } from "@mui/icons-material";
function App() {
  return (
    <div>
      <ResponsiveAppBar />
      <Home></Home>
    </div>
  );
}
export default App;
