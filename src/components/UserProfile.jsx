import React from "react";
import { useLocation } from "react-router-dom";

const UserProfile = () => {
  const location = useLocation();
  const userData = location.state?.userData;

  if (!userData) {
    return <div>Loading user profile...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>
        Name: {userData.firstName} {userData.lastName}
      </p>
      <img src={userData.profile} alt={`${userData.firstName}'s profile`} />
      {/* Add more fields to display as needed */}
    </div>
  );
};

export default UserProfile;
