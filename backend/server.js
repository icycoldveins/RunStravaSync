const express = require("express");
const axios = require("axios");
const session = require("express-session");
require("dotenv").config();
const cors = require("cors");
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
// Check environment variables
if (
  !process.env.STRAVA_CLIENT_ID ||
  !process.env.STRAVA_CLIENT_SECRET ||
  !process.env.SESSION_SECRET
) {
  console.error(
    "Missing required environment variables. Please check your .env file."
  );
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true in production if using HTTPS
  })
);

app.post("/api/exchange_token", async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ message: "Authorization code is missing" });
  }

  console.log(`Authorization code: ${code}`);

  try {
    const tokenResponse = await axios.post(
      "https://www.strava.com/oauth/token",
      {
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
      }
    );

    if (!tokenResponse.data || !tokenResponse.data.access_token) {
      console.error("Invalid response from Strava API:", tokenResponse.data);
      return res
        .status(500)
        .json({ message: "Invalid response from Strava API" });
    }

    const accessToken = tokenResponse.data.access_token;

    // Fetch user profile data using the access token
    const userProfileResponse = await axios.get(
      "https://www.strava.com/api/v3/athlete",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    // Fetch user running activities using the access token
    const userActivitiesResponse = await axios.get(
      "https://www.strava.com/api/v3/athlete/activities?type=Run",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    console.log("User Activities:", userActivitiesResponse.data); // Log the user activities

    res.json({
      token: tokenResponse.data,
      userProfile: userProfileResponse.data,
      userActivities: userActivitiesResponse.data,
    });
  } catch (error) {
    console.error(
      "Error during token exchange, profile retrieval, or activities retrieval:",
      error.response?.data || error.message
    );
    res.status(500).json({
      message:
        "Internal server error during token exchange, profile retrieval, or activities retrieval",
    });
  }
});

// Example endpoint to fetch Strava activities
app.get("/api/strava/activities", async (req, res) => {
  const accessToken = req.query.accessToken;
  const type = "Run"; // Fetch only running activities

  try {
    const activitiesResponse = await axios.get(
      "https://www.strava.com/api/v3/athlete/activities?type=Run",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    res.json(activitiesResponse.data);
  } catch (error) {
    console.error(
      "Error fetching Strava activities:",
      error.response?.data || error.message
    );
    res.status(500).json({ message: "Error fetching Strava activities" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
