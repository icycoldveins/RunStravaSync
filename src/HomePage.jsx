import React, { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

function HomePage() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {user && <p>Welcome back, {user.firstname}!</p>}
    </div>
  );
}

export default HomePage;
