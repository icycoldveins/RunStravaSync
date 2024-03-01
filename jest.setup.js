global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
beforeAll(() => {
  process.env.MONGODB_URI = "mongodb://localhost:27017/StravaDB"; // Example URI, adjust as necessary
});
