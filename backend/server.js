const express = require("express");
const axios = require("axios");
const session = require("express-session");
require("dotenv").config();
const cors = require("cors");

// Enable CORS
const app = express();
app.use(express.json());
app.use(cors());

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Use a secure, random secret key
    resave: false,
    saveUninitialized: false, // Changed to false to avoid creating sessions for unauthenticated users
    cookie: { secure: false }, // Set to true in production if using HTTPS
  })
);

app.post("/api/exchange_token", async (req, res) => {
  const { code } = req.body;
  console.log(`Authorization code: ${code}`);
  try {
    const response = await axios.post("https://www.strava.com/oauth/token", {
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
    });

    // Save the token in session
    req.session.accessToken = response.data.access_token;

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error during token exchange:",
      error.response?.data || error.message
    );
    res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
