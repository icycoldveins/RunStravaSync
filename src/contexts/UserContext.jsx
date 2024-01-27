import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const initialUserState = JSON.parse(sessionStorage.getItem("user")) || null;
  const initialUserActivitiesState = JSON.parse(sessionStorage.getItem("userActivities")) || [];

  const [user, setUser] = useState(initialUserState);
  const [userActivities, setUserActivities] = useState(initialUserActivitiesState);

  // Function to fetch and update user activities
  const fetchAndSetUserActivities = (accessToken) => {
    // Replace with your API endpoint for fetching user activities
    fetchUserActivities(accessToken)
      .then((activityData) => {
        setUserActivities(activityData);
        sessionStorage.setItem("userActivities", JSON.stringify(activityData)); // Store userActivities in session storage
      })
      .catch((error) => {
        console.error("Error fetching user activities:", error);
      });
  };

  useEffect(() => {
    if (user && user.accessToken) {
      // Fetch user activities when user data is available
      fetchAndSetUserActivities(user.accessToken);
    }
  }, [user]);

  // The value that will be given to the context
  const contextValue = {
    user,
    setUser,
    userActivities,
    setUserActivities,
    fetchAndSetUserActivities,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

// Create a custom hook for using the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
