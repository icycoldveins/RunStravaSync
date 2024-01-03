const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const axios = require("axios");
const cors = require("cors"); // You'll need to install this package
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Set up MongoDB session store
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "mySessions",
});

// Enable CORS for your React application
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your React app's URL
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: "your secret here",
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);

// Strava OAuth callback endpoint
app.get("/auth/strava/callback", async (req, res) => {
  const code = req.query.code;

  console.log('Authorization code:', code); // Added console.log

  try {
    const tokenResponse = await axios.post(
      "https://www.strava.com/oauth/token",
      {
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        code: code,
        grant_type: "authorization_code",
      }
    );

    console.log('Token response:', tokenResponse.data); // Added console.log

    req.session.accessToken = tokenResponse.data.access_token;
    req.session.refreshToken = tokenResponse.data.refresh_token;
    req.session.expiresAt = tokenResponse.data.expires_at;

    // Redirect to a specific page in your React app
    res.redirect("http://localhost:3000/success"); // Change to your success route
  } catch (error) {
    console.error("Error in Strava OAuth callback:", error);
    res.redirect("http://localhost:3000/error"); // Change to your error route
  }
});

// Endpoint to handle login
app.post("/api/login", async (req, res) => {
  const { code } = req.body;
  try {
    // Exchange code for token if not already done in callback
    // Store user data in session
    // Send necessary user data back to the frontend
    res.json({ user: req.session.user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Check session validity
app.get("/api/session", (req, res) => {
  if (req.session.accessToken) {
    res.json({ valid: true, session: req.session });
  } else {
    res.json({ valid: false });
  }
});
app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: "Logout failed" });
    } else {
      res.status(200).json({ message: "Logout successful" });
    }
  });
});
app.post("/api/exchange_token", async (req, res) => {
  const { code } = req.body;
  try {
    // Exchange code for an access token
    const tokenResponse = await axios.post(
      "https://www.strava.com/oauth/token",
      {
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
      }
    );

    // Retrieve user information using the access token
    const userDataResponse = await axios.get(
      "https://www.strava.com/api/v3/athlete",
      {
        headers: { Authorization: `Bearer ${tokenResponse.data.access_token}` },
      }
    );

    // Set user data in session
    req.session.user = userDataResponse.data;

    res.json(userDataResponse.data); // Send user data back to the frontend
  } catch (error) {
    console.error("Error during token exchange:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(5000, () => console.log("Server is running on port 5000"));
