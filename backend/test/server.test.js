const request = require("supertest");
const app = require("../server"); // Adjust the path as necessary
const axios = require("axios");
const mongoose = require("mongoose");

jest.mock("axios");

let server;

beforeAll((done) => {
  server = app.listen(4000, done); // Use a different port for testing
});

afterAll((done) => {
  server.close(() => {
    mongoose.disconnect().then(done);
  });
});

describe("Server API", () => {
  it("responds with status code 200 for GET requests to /api/strava/activities", async () => {
    axios.get.mockResolvedValue({
      data: [{ id: 1, name: "Test Activity" }], // Mock Strava API response
    });

    const res = await request(app)
      .get("/api/strava/activities")
      .query({ accessToken: "mockAccessToken" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ id: 1, name: "Test Activity" }]); // Adjust expectations based on your implementation
  });

  // Additional tests...
});
