const express = require("express");
const axios = require("axios");
const session = require("express-session");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

mongoose;
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

// Initialize the OpenAI instance with your API key
const OpenAI = require("openai").default; // Use CommonJS syntax and access the default export

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is correctly set in your environment variables
});

app.post("/api/generate-suggestions", async (req, res) => {
  try {
    const { activities } = req.body; // Expecting an array of activity objects

    // Filter to include only running and weight lifting activities
    const filteredActivities = activities.filter(
      (activity) =>
        activity.type === "Run" || activity.type === "WeightTraining"
    );

    // Format the prompt with filtered activity information
    const activityDetails = filteredActivities
      .map((activity) => {
        let activityInfo = `Activity: ${activity.name}`;
        if (activity.type === "Run") {
          activityInfo += `, Distance: ${activity.distance} meters, Duration: ${activity.duration} minutes`;
        } else if (activity.type === "WeightTraining") {
          activityInfo += `, Exercises: ${activity.exercises.join(
            ", "
          )}, Duration: ${activity.duration} minutes`;
        }
        return activityInfo;
      })
      .join("\n");
    const prompt = `Given the detailed information on the user's recent running and weight lifting activities listed below, please provide comprehensive training suggestions. These suggestions should enhance performance, ensure balanced development, and reduce injury risk, considering the intensity, volume, and variety needed for progressive improvement.\n\nActivity Details:\n${activityDetails}\n\nHere are some suggestions:`;

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0613",
      messages: [
        {
          role: "system",
          content: `Based on the following activities, generate training suggestions:\n${prompt}`,
        },
      ],
      max_tokens: 400, // Adjust the max_tokens value as needed
      n: 1,
      stop: null,
      temperature: 0.7,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    const suggestion = chatCompletion.choices[0].message.content.trim();

    res.json({ suggestion });
  } catch (error) {
    console.error("Error generating suggestions:", error);
    res.status(500).json({ message: "Failed to generate suggestions" });
  }
});

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

module.exports = app; // Export the app instance
