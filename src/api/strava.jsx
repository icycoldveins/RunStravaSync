export const fetchUserActivities = async (accessToken) => {
  try {
    const response = await fetch("https://www.strava.com/api/v3/athlete/activities", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching user activities from Strava:", error);
    throw error; // Handle or log the error as needed
  }
};

